import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class MovieRoute extends Route {
    @service movies;

    model({ id }) {
        return {
            movie: this.movieTask.perform(id),
            likedMovies: this.likedTask.perform(),
        }
    }

    @task(function* (id) {
        const movie = yield this.movies.getMoviesById(id);
        return movie;
    }) movieTask;

    @task(function* () {
        const movies = yield this.movies.getLikedMovies();
        return movies;
    }) likedTask;
}
