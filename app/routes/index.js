import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class IndexRoute extends Route {
    @service movies;

    model() {
        return {
            movies: this.movieTask.perform(),
            likedMovies: this.likedTask.perform(),
        };
    }

    @task(function*() {
        const movies = yield this.movies.getMovies();
        return movies;
    }) movieTask;

    @task(function*() {
        const movies = yield this.movies.getLikedMovies();
        return movies;
    }) likedTask;
}