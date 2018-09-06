import { combineReducers } from 'redux';

import points from './points';
import resign from './resign';
import winner from './winner';

const reducer = combineReducers({
    points,
    resign,
    winner,
});

export default reducer;
