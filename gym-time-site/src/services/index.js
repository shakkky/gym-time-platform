import axios from 'axios';

const API_URL = `${process.env.REACT_APP_REST_SERVICE}`;

const signup = (data) => {
  return axios({
    method: 'post',
    url: `${API_URL}/accounts`,
    data: data
  });
}

export { signup };