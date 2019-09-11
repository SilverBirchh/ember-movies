import Service from '@ember/service';
import fetch from 'fetch';
import ENV from 'ember-movies/config/environment'; 
import { readOnly } from '@ember/object/computed';

const API_KEY = '831192756b78779405dfccf88784f07b'

export default class FetchService extends Service {

    @readOnly('ENV.APP.key')
    API_KEY;

    async authFetch(url, params = []) {
        let fullUrl = `https://api.themoviedb.org/3/${url}?api_key=${API_KEY}`
        params.forEach(param => {
            fullUrl += `&${param}`
        });
        const response = await fetch(fullUrl);
        return response.json();
    }
}
