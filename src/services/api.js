import axios from 'axios';

const api = axios.create({
    baseURL: 'https://adotepet-api.herokuapp.com/'
});

//'http://10.10.10.33:3173'

export default api; 