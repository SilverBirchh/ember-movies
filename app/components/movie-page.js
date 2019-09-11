import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'ember-movies/config/environment'; 

export default class MyComponent extends Component {

    @service movies;

    @computed('posterUrl')
    get posterUrl() {
        return `https://image.tmdb.org/t/p/w500/${this.args.movie.poster_path}?api_key=${ENV.APP.key}`
    }

    @action
    likeMovie(id) {
        this.movies.likeMovie(id);        
    }

    @action
    dislikeMovie(id) {
        this.movies.dislikeMovie(id);        
    }

}
