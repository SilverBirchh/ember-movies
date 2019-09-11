import Service from '@ember/service';
import fetch from 'fetch';
import ENV from 'ember-movies/config/environment'; 

export default class FetchService extends Service {

    async authFetch(url, params = []) {
        let fullUrl = `https://api.themoviedb.org/3/${url}?api_key=${ENV.APP.key}`
        params.forEach(param => {
            fullUrl += `&${param}`
        });
        const response = await fetch(fullUrl);
        return response.json();
    }
}
