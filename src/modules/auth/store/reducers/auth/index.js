import { combineReducers } from 'redux';
import authenticated from './authenticated';
import user from './user';
import token from './token';
import rememberMe from './rememberMe';

const reducer = combineReducers({
    authenticated,
    user,
    token,
    rememberMe,
});

export default reducer;