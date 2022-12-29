import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './app/reducers';

 const rootReducer = combineReducers({userReducer: userReducer});

 export const Store = createStore(rootReducer, applyMiddleware(thunk));