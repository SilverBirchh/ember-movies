import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

const API_KEY = '831192756b78779405dfccf88784f07b';

export default class MyComponent extends Component {

    @service movies;

    @computed('posterUrl')
    get posterUrl() {
        return `https://image.tmdb.org/t/p/w500/${this.args.posterUrl}?api_key=${API_KEY}`
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
