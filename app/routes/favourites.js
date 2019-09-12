import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class FavouritesRoute extends Route {
    @service movies;

    model() {
        return {
            likedMovies: this.likedTask.perform(),
        };
    }

    @task(function*() {
        const movies = yield this.movies.getLikedMovies();
        return movies.sort(function(movie1, movie2) {
            return new Date(movie1.release_date) - new Date(movie2.release_date);
        });
    }) likedTask;
}