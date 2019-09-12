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
                            id: 2,
                            title: 'Transformers',
                            release_date: '2020-09-09'
                        },
                        {
                            id: 3,
                            title: 'Back to the Future',
                            release_date: '1995-09-09'
                        },
                        {
                            id: 3,
                            title: 'It',
                            release_date: '2016-09-09'
                        }
                    ]
                }
            }
        });
        const model = await route.model();
        assert.equal('Back to the Future', model.likedMovies.value[0].title);
        assert.equal('It', model.likedMovies.value[1].title);
        assert.equal('Robo Cop', model.likedMovies.value[2].title);
        assert.equal('Transformers', model.likedMovies.value[3].title);
    });
});