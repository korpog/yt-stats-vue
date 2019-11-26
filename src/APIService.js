import axios from 'axios';
const URL = 'http://localhost:8000';

export class APIService {

    constructor() {}
  
    getResults(ytUrl) {
      const url = `${URL}/results/${ytUrl}`;
      return axios.get(url)
        .then(response => alert(response.data))
        .catch(error => alert(error));
    }
}