import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import {set } from '@ember/object';
import { clearStorage, getItem, setItem } from 'ember-movies/utils/local-storage';
import sinon from 'sinon';

module('Unit | Service | movies', function(hooks) {
    setupTest(hooks);

    hooks.afterEach(async function() {
        await clearStorage();
    });

    test('can like a movie and save it to storage', async function(assert) {
        let service = this.owner.lookup('service:movies');
        set(service, 'movies', {
            results: [{
                id: 1,
                title: 'Robo Cop',
                release_date: '2019-09-08',
                poster_path: '/path'
            }]
        });

        service.likeMovie(1);
        const likedMovies = JSON.parse(await getItem('movies'));

        assert.equal(service.likedMovies.length, 1);
        assert.equal(service.likedMovies[0].title, 'Robo Cop');
        assert.equal(likedMovies.length, 1);
        assert.equal(likedMovies[0].title, 'Robo Cop');
    });

    test('does not like a movie already liked', function(assert) {
        let service = this.owner.lookup('service:movies');
        set(service, 'movies', {
            results: [{
                id: 1,
                title: 'Robo Cop',
                release_date: '2019-09-08',
                poster_path: '/path'
            }]
        });

        service.likeMovie(1);
        service.likeMovie(1);

        assert.equal(service.likedMovies.length, 1);
        assert.equal(service.likedMovies[0].title, 'Robo Cop');
    });

    test('can dislike a movie', async function(assert) {
        let service = this.owner.lookup('service:movies');
        set(service, 'movies', {
            results: [{
                id: 1,
                title: 'Robo Cop',
                release_date: '2019-09-08',
                poster_path: '/path'
            }]
        });

        service.likeMovie(1);
        assert.equal(service.likedMovies.length, 1);

        service.dislikeMovie(1);
        const likedMovies = JSON.parse(await getItem('movies'));
        assert.equal(service.likedMovies.length, 0);
        assert.equal(likedMovies.length, 0);
    });


    test('can fetch liked movies', async function(assert) {
        let service = this.owner.lookup('service:movies');
        await setItem('movies', JSON.stringify([{
            id: 1,
            title: 'Robo Cop',
            release_date: '2019-09-08',
            poster_path: '/path'
        }]));

        const likedMovies = await service.getLikedMovies();
        assert.equal(likedMovies.length, 1);
        assert.equal(service.likedMovies[0].title, 'Robo Cop');
    });

    test('can fetch cached movies', async function(assert) {
        let service = this.owner.lookup('service:movies');
        set(service, 'movies', {
            results: [{
                id: 1,
                title: 'Robo Cop',
                release_date: '2019-09-08',
                poster_path: '/path'
            }]
        });

        const movies = await service.getMovies();
        assert.equal(movies.results.length, 1);
        assert.equal(movies.results[0].title, 'Robo Cop');
    });

    test('can fetch movies over the network', async function(assert) {
        const authFetch = sinon.stub().resolves({
            results: [{
                id: 1,
                title: 'Robo Cop',
                release_date: '2019-09-08',
                poster_path: '/path'
            }]
        })
        let service = this.owner.lookup('service:movies').reopen({
            fetch: {
                authFetch
            }
        });

        const movies = await service.getMovies();
        assert.equal(movies.results.length, 1);
        assert.equal(movies.results[0].title, 'Robo Cop');
    });

    test('can fetch cached movie by id that is in the cache', async function(assert) {
        let service = this.owner.lookup('service:movies');
        set(service, 'movies', {
            results: [{
                id: 1,
                title: 'Robo Cop',
                release_date: '2019-09-08',
                poster_path: '/path'
            }]
        });

        const movie = await service.getMovieById(1);
        assert.equal(movie.title, 'Robo Cop');
    });

    test('can fetch a movie that is not in the cache', async function(assert) {
        const authFetch = sinon.stub()
        authFetch.resolves({
            id: 2,
            title: 'Back to the Future',
            release_date: '2019-09-08',
            poster_path: '/path'

        });
        let service = this.owner.lookup('service:movies').reopen({
            fetch: {
                authFetch
            }
        });

        const movie = await service.getMovieById(2);
        assert.equal(movie.title, 'Back to the Future');
    });

});