import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | favourites', function(hooks) {
    setupTest(hooks);

    test('it fetches movies sorted in chronological order', async function(assert) {
        let route = this.owner.lookup('route:favourites').reopen({
            movies: {
                getLikedMovies() {
                    return [{
                            id: 1,
                            title: 'Robo Cop',
                            release_date: '2019-09-09'
                        },
                        {
                            id: 1,
                            title: 'Back to the Future',
                            release_date: '2020-09-09'
                        }
                    ]
                }
            }
        });
        const model = await route.model();
        assert.equal('Back to the Future', model.likedMovies.value[0].title)
    });
});