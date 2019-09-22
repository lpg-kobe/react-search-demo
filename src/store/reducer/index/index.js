import { combineReducers } from 'redux';
import getList from './getList';
export default combineReducers({ indexReducer: getList });
