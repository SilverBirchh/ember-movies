import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class IndexRoute extends Route {
    @service fetch;



}
