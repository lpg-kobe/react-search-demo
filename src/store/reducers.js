/**
 * @desc return data from action by  actionType
 * @author pika
 */

import { combineReducers } from 'redux';
import defaultState from './state.js';

// getKeyword

function searchBarReduce(state = defaultState.searchBar, action) {
  switch (action.type) {
    case 'SET_SEARCHBAR':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

//getRecommendationList
function recommendationReduce(state = defaultState.recommendation, action) {
  switch (action.type) {
    case 'SET_RECOMMENDATION_LIST':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

//getAppList
function appListReduce(state = defaultState.appList, action) {
  switch (action.type) {
    case 'SET_APP_LIST':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

export default combineReducers({
  searchBarReduce,
  recommendationReduce,
  appListReduce
});
