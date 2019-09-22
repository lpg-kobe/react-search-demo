// applyMiddleware => redux use this function to make a middleWare
import { applyMiddleware, createStore } from 'redux';
// without actionObj when dispatch an action
import thunk from 'redux-thunk';
import reducers from './reducer/index';

// create store
let store = createStore(reducers, applyMiddleware(thunk));
export default store;
