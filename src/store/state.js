/**
 * @desc init state in redux
 * @author pika
 */
export default {
  // part of searchBar
  searchBar: {
    keyword: ''
  },
  // part of recommendation
  recommendation: {
    list: []
  },
  // part of appList
  appList: {
    list: [],
    pageSize: 10,
    pageIndex: 1,
    totalPage: 1,
    loadingShow: true
  }
};
