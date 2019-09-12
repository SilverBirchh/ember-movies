import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { clearStorage, getItem, setItem } from 'ember-movies/utils/local-storage';

export default class MoviesService extends Service {
    @service fetch;

    movies = null;

    likedMovies = [];

    get likedMovieIds() {
        return this.likedMovies.map((movie) => {
            return movie.id;
        })
    }

    likeMovie(id) {
        if (!this.likedMovieIds.includes(id)) {
            const { title, release_date, poster_path } = this.movies.results.findBy('id', id);
            this.likedMovies.pushObject({ id, title, release_date, poster_path });
            setItem('movies', JSON.stringify(this.likedMovies));
        }
    }

    dislikeMovie(id) {
        const likedMovie = this.likedMovies.findBy('id', id)
        this.likedMovies.removeObject(likedMovie);
        setItem('movies', JSON.stringify(this.likedMovies));
    }

    async getLikedMovies() {
        const likedMovies = await getItem('movies');
        this.likedMovies = JSON.parse(likedMovies) || [];
        return this.likedMovies;
    }

    async getMovies() {
        if (this.movies === null) {
            const params = [
                'language=en-US',
                'sort_by=popularity.desc',
                'include_adult=false', 'include_video=false', 'page=1'
            ]
            const response = await this.fetch.authFetch('discover/movie', params);
            this.movies = response;
        }

        return this.movies;
    }

    async getMovieById(id) {
        if (this.movies !== null) {
            const movie = this.movies.results.findBy('id', parseInt(id));
            return movie;
        }

        const params = [
            'language=en-US',
        ]
        return this.fetch.authFetch(`movie/${id}`, params);
    }
}