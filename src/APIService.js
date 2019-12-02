import axios from 'axios';
const URL = 'http://localhost:8000';

export class APIService {

  constructor() {}

  getResults(channelID) {
    const url = `${URL}/results`;
    return axios.get(url, {
        params: {
          id: channelID
        }
      })
      .then(response => response.data)
      .catch(error => alert(error));
  }
}