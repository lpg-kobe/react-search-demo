/**
 * @desc commit action for reducer
 * @author pika
 */

// request for index
import xhr from '@/api/index/index.js';

/**
 * @desc change search keyword
 * @author pika
 */
export function setSearchBar(data) {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_SEARCHBAR',
      data: data
    });
  };
}

/**
 * @desc commit action setRecommendationList to reducer
 * @param data type => Obect
 * @author pika
 */
export function setRecommendationList(data) {
  return (dispatch, getState) => {
    // localSearch when enter keyword
    let initList = getState().recommendationReduce.list || [],
      filterList = [];
    if (data && data.keyword && initList.length) {
      filterList = initList.filter(item => {
        return (
          item['im:name']['label'].indexOf(data.keyword) > -1 ||
          item['category']['attributes']['label'].indexOf(data.keyword) > -1
        );
      });
      dispatch({
        type: 'SET_RECOMMENDATION_LIST',
        data: {
          list: filterList
        }
      });
      return;
    }
    // get initData from api
    xhr.getRecommendationList().then(res => {
      let resData = res.data,
        list = resData.feed.entry;
      dispatch({
        type: 'SET_RECOMMENDATION_LIST',
        data: {
          list: list
        }
      });
    });
  };
}

/**
 * @desc commit action setAppList to reducer
 * @param data type => Obect
 * @author pika
 */
export function setAppList(data) {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_APP_LIST',
      data: {
        loadingShow: data.loadingShow
      }
    });
    xhr.getAppList(data).then(res => {
      data.loadingShow = false;
      let resData = res.data,
        prevList = getState().appListReduce.list,
        allList = data.keyword
          ? resData.feed.entry.filter(item => {
              return (
                item['category']['attributes']['label'].indexOf(data.keyword) >
                  -1 || item['im:name']['label'].indexOf(data.keyword) > -1
              );
            })
          : resData.feed.entry,
        curList = data.isAdd
          ? prevList.concat(
              allList.slice(
                data.pageSize * (data.pageIndex - 1),
                data.pageSize * (data.pageIndex - 1) + 10
              )
            )
          : allList.slice(
              data.pageSize * (data.pageIndex - 1),
              data.pageSize * (data.pageIndex - 1) + 10
            );
      dispatch({
        type: 'SET_APP_LIST',
        data: {
          totalPage: Math.ceil(allList.length / data.pageSize),
          pageSize: data.pageSize,
          pageIndex: data.pageIndex,
          loadingShow: data.loadingShow,
          list: curList
        }
      });
    });
  };
}
