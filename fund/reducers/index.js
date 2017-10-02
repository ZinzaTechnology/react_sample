// @flow
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    qiitaUsers,
    router: routerReducer,
    app: require('./app').default,
    item: require('./item').default,
});

export default rootReducer;
