import { combineReducers } from 'redux';

import data from './data';
import error from './error';
import loading from './loading';

const reducer = combineReducers({
    data,
    error,
    loading,
});

export default reducer;