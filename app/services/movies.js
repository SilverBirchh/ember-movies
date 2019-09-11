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
            this.likedMovies.pushObject({id});
        }
    }

    dislikeMovie(id) { 
        const likedMovie = this.likedMovies.findBy('id', id)
        this.likedMovies.removeObject(likedMovie);
    } 

    async getLikedMovies() {
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
}