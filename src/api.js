import BackgammonAPI from './utils/backgammon-api';
import store from './store';

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const api = new BackgammonAPI(config.apiEndpoint, () => {
    const state = store.getState();
    return state.auth.auth.token;
});

export default api;