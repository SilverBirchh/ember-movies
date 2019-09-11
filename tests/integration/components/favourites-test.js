import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {set } from '@ember/object'
import sinon from 'sinon';
import Service from '@ember/service';

const likedMovies = [{
    id: 1,
    title: 'Robo Cop',
    release_date: '2019-09-09'
}];

const movieStub = Service.extend({
    dislikeMovie(id) {
        const likedMovie = likedMovies.findBy('id', id)
        likedMovies.removeObject(likedMovie);
    }
});

module('Integration | Component | favourites', function(hooks) {
    setupRenderingTest(hooks);

    test('it renders fav movies', async function(assert) {
        set(this, 'likedMovies', likedMovies);
        await render(hbs `<Favourites @likedMovies={{likedMovies}} />`);
        assert.dom('tbody tr .likes_cell:first-child').hasText('Robo Cop');
        assert.dom('tbody tr .likes_cell:nth-child(2)').hasText('9 / 8 / 2019');
    });

    test('it calls to delete a fav movie', async function(assert) {
        this.owner.register('service:movies', movieStub);

        set(this, 'likedMovies', likedMovies);
        await render(hbs `<Favourites @likedMovies={{likedMovies}} />`);
        await click('.likes_bin');
        assert.dom('.likes_bin').doesNotExist();
    });
});