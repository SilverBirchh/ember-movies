import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {set } from '@ember/object'
import Service from '@ember/service';

const movies = [{
    id: 1,
    title: 'Robo Cop',
    release_date: '2019-09-09'
}];

const movieStub = Service.extend({
    dislikeMovie(id) {
        const movie = movies.findBy('id', id);
        movies.removeObject(movie);
    },

    likeMovie(id) {
        movies.pushObject({
            id: 1,
            title: 'Back to the Future',
            release_date: '2019-09-08',
            poster_path: 'path',
            overview: 'overview',
            vote_average: 6
        });
    }
});

module('Integration | Component | movie-page', function(hooks) {
    setupRenderingTest(hooks);

    test('it renders a movie with a full heart when it is liked', async function(assert) {

        set(this, 'movie', {
            id: 1,
            title: 'Robo Cop',
            release_date: '2019-09-08',
            poster_path: 'path',
            overview: 'overview',
            vote_average: 6
        });
        await render(hbs `<MoviePage @movie={{movie}} @isLiked={{true}} />`);
        assert.dom('.title').hasText('Robo Cop');
        assert.dom('.movie-page_overview p:first-child').hasText('overview');
        assert.dom('.movie-page_overview p:nth-of-type(2)').hasText('Rating: 6 / 10');
        assert.dom('.movie-page_overview p:last-of-type').hasText('Released: 8 / 8 / 2019');
        assert.dom('[src="https://image.tmdb.org/t/p/w500/path?api_key=831192756b78779405dfccf88784f07b"]').exists();
        assert.dom('.heart--liked').exists();
    });

    test('it renders an error when it cannot find a movie', async function(assert) {
        await render(hbs `<MoviePage @movie={{null}} />`);
        assert.dom('.title').doesNotExist();
        assert.dom('.movie-page_error').exists();
    });

    test('it renders a movie with a empty heart when it is not liked', async function(assert) {

        set(this, 'movie', {
            id: 1,
            title: 'Robo Cop',
            release_date: '2019-09-08',
            poster_path: '/path',
            overview: 'overview',
            vote_average: 6
        });
        await render(hbs `<MoviePage @movie={{movie}} @isLiked={{false}} />`);
        assert.dom('.heart--liked').doesNotExist();
    });

    test('it can toggle liking a movie', async function(assert) {
        this.owner.register('service:movies', movieStub);
        const movie = {
            id: 1,
            title: 'Robo Cop',
            release_date: '2019-09-08',
            poster_path: '/path',
            overview: 'overview',
            vote_average: 6
        }

        set(this, 'movie', movie);
        set(this, 'movies', movies);
        await render(hbs `<MoviePage
            @movie={{movie}}
            @isLiked={{contains movies movie.id}} />`);
        assert.dom('.heart--liked').exists();
        await click('.heart--liked');
        assert.dom('.heart--liked').doesNotExist();
        await click('.heart');
        assert.dom('.heart--liked').exists();
    });
});