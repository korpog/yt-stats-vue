import axios from 'axios';
const URL = 'https://ytstats5.herokuapp.com';

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