import axios from 'axios';

let authHeader = '';

let userStoreJson = localStorage.getItem('userStore');
if (userStoreJson) {
  let userStoreData = JSON.parse(userStoreJson);
  if (userStoreData.authenticated)
    authHeader = `Bearer ${userStoreData.accessToken}`;
}

const req = axios.create({
  headers: {
    Authorization: authHeader,
  },
});

export default req;
