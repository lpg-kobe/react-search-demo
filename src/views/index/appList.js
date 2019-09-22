import { connect } from 'react-redux';
import style from '@/assets/scss/index.module.scss';
import {setAppList} from '@store/'
/**
 * @desc app list
 * @author pika
 */
class AppList extends React.Component {
  onReachBottom() {
    let stateData = store.getState();
    if (
      stateData.appListReduce.pageIndex === stateData.appListReduce.totalPage ||
      stateData.appListReduce.loadingShow
    ) {
      return;
    }
    store.dispatch(
      setAppList({
        keyword: stateData.searchBarReduce.keyword,
        pageSize: stateData.appListReduce.pageSize,
        pageIndex: stateData.appListReduce.pageIndex + 1,
        loadingShow: true,
        isAdd: true
      })
    );
  }
  render() {
    let list = this.props.list,
      listDom = list.map((item, index) => {
        let itemId = item['id']['attributes']['im:id'],
          itemImg = item['im:image'][0].label,
          itemCate = item['category']['attributes']['label'],
          itemName = item['im:name']['label'];
        return [
          <li
            key={itemId}
            className={`clearfix ${style['list-item']} ${
              index >= 9 ? style['double'] : ''
            }`}
          >
            <div className={style['sort-num']}>{index + 1}</div>
            <img src={itemImg} alt="app-img" />
            <div>
              <h2>{itemName}</h2>
              <h3>{itemCate}</h3>
              <div className={style['star-line']}>
                {/* 数据没有评分字段||数量，先写死 */}
                <Star count={Math.ceil(Math.random() * 5)} />
                <span className={style['amount']}>（10）</span>
              </div>
            </div>
          </li>,
          <ScrollBottom distand={0} onReachBottom={this.onReachBottom} />
        ];
      });
    return (
      <div className={style['app-list']}>
        <ul>{listDom}</ul>
      </div>
    );
  }
}

export default connect()(AppList);
