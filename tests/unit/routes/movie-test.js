import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | movie', function(hooks) {
    setupTest(hooks);

    test('it loads liked and all movies', async function(assert) {
        let route = this.owner.lookup('route:movie').reopen({
            movies: {
                getMoviesById() {
                    return {
                        id: 1,
                        title: 'Robo Cop',
                        release_date: '2019-09-09'
                    }
                },
                getLikedMovies() {
                    return [{
                        id: 1,
                        title: 'Robo Cop',
                        release_date: '2019-09-09'
                    }]
                }
            }
        });
        const model = await route.model(1);
        assert.equal(1, model.likedMovies.value.length);
        assert.equal('Robo Cop', model.movie.value.title);
    });
});