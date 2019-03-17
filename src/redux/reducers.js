import {combineReducers} from 'redux'
//Constants
import {
    USER_CONSTANT,
} from 'Redux/constants/User'

import {mapConfig} from 'Components/Map/dciMapReducer'

const initialState = {};
//Action Creators
const createReducer = (initialState, reducerMap) => {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];
        return reducer ? reducer(state, action.payload) : state;
    };
};

const buildUpReducer = createReducer(initialState, {
    [USER_CONSTANT]: (state, payload) => {
        return Object.assign({}, state, {payload});
    }
});

const AppReducers = combineReducers({
    mapConfig,
    buildUpReducer
});
export default AppReducers;