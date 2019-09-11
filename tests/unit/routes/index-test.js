import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | index', function(hooks) {
    setupTest(hooks);

    test('it loads liked and all movies', async function(assert) {
        let route = this.owner.lookup('route:index').reopen({
            movies: {
                getMovies() {
                    return [{
                        id: 1,
                        title: 'Robo Cop',
                        release_date: '2019-09-09'
                    }]
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
        const model = await route.model();
        console.log(model);

        assert.equal(1, model.likedMovies.value.length);
        assert.equal(1, model.movies.value.length);
    });
});