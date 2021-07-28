import axios from 'axios';

let authToken = localStorage.getItem('authToken');
let authHeader = authToken && `Bearer ${authToken}`;

const req = axios.create({
  headers: {
    Authorization: authHeader,
  },
});

export default req;
