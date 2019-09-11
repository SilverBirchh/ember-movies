import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MyComponent extends Component {

    @service movies;

    @action
    dislikeMovie(id) {
        this.movies.dislikeMovie(id);        
    }

}
