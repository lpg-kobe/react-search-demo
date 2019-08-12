import request from '@/api/http.js';
// mockData
const recommendationUrl = 'mockData/recomendData.json',
  appListUrl = 'mockData/appListData.json';
export default {
  // get recommendationList
  getRecommendationList() {
    return request({
      url: recommendationUrl
    });
  },
  // get appList
  getAppList() {
    return request({
      url: appListUrl
    });
  }
};
