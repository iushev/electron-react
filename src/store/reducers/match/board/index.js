import { combineReducers } from 'redux';
import points from './points';
import checkers from './checkers';
import dices from './dices';
import doublingCube from './doublingCube';

const reducer = combineReducers({
    points,
    checkers,
    dices,
    doublingCube,
});

export default reducer;
