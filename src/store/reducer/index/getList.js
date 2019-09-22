/**
 * @desc return data from action by  actionType
 * @author pika
 */

const initialState = {
  // part of appList
  appList: {
    list: [],
    pageSize: 10,
    pageIndex: 1,
    totalPage: 1,
    loadingShow: true
  },
  // part of recommendation
  recommendation: {
    list: []
  }
};

//getRecommendationList
export default function(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}
