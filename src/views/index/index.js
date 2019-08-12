import React from 'react';
import style from '@/assets/scss/index.module.scss';
// send other props to component
import { connect } from 'react-redux';
import {
  setSearchBar,
  setRecommendationList,
  setAppList
} from '@/store/actions.js';
// component
import Star from '@/components/index/star.js';
// redux
import store from '@/store';
// scroll
import ScrollBottom from '@/components/common/scrollBottom.js';
// loading
import Loading from '@/components/common/loading.js';

// why to use redux for store ???
// 个人见解 =>单个组件只能管理自己的state并触发自身视图更新，若涉及到组件交互就要将所有组件的state保存在最顶级的父组件的构造函数中，并通过组件内部将数据逐级回调至state数据所在的组件中并出发state更新视图，而redux恰恰解决了这一回调的麻烦，方便组件间通信 ps:才用了一周的react，代码写的不好之处请见谅

/**
 * @desc index container
 * @author pika
 */
class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let { setRecommendationList, setAppList, appList } = this.props;
    setRecommendationList();
    setAppList({
      pageSize: appList.pageSize,
      pageIndex: appList.pageIndex
    });
  }

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
    let { recommendation, appList } = this.props;
    return (
      <main>
        <header>
          <SearchBar />
        </header>
        <section>
          <RecommendationList list={recommendation.list} />
        </section>
        <section>
          <AppList list={appList.list} />
        </section>
        <ScrollBottom distand={0} onReachBottom={this.onReachBottom} />
        <Loading loadingShow={appList.loadingShow} />
      </main>
    );
  }
}

/**
 * @desc searchBar
 * @author pika
 */
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(e) {
    let stateData = store.getState(),
      value = e.target.value;
    store.dispatch(setSearchBar({ keyword: value }));
    store.dispatch(setRecommendationList({ keyword: value }));
    store.dispatch(
      setAppList({
        keyword: value,
        pageSize: stateData.appListReduce.pageSize,
        pageIndex: 1,
        loadingShow: true,
        isAdd: false
      })
    );
  }
  render() {
    return (
      <div className={`${style['app-search']}`}>
        <input type="text" placeholder="搜寻" onChange={this.handleSearch} />
      </div>
    );
  }
}

/**
 * @desc recommendation list
 * @author pika
 */
class RecommendationList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let list = this.props.list,
      listDom = list.map(item => {
        let itemImg = item['im:image'][item['im:image'].length - 1].label,
          itemCate = item['category']['attributes']['label'],
          itemId = item['id']['attributes']['im:id'],
          itemName = item['im:name']['label'];
        return (
          <li key={itemId} className={style['list-item']}>
            <img src={itemImg} alt="app-img" />
            <h3 className={style['name']}>{itemName}</h3>
            <h3>{itemCate}</h3>
          </li>
        );
      });
    return (
      <div className={style['app-recommendation']}>
        <h1>推介</h1>
        <div className={style['recommendation-list']}>
          <ul>{listDom}</ul>
        </div>
      </div>
    );
  }
}

/**
 * @desc app list
 * @author pika
 */
class AppList extends React.Component {
  render() {
    let list = this.props.list,
      listDom = list.map((item, index) => {
        let itemId = item['id']['attributes']['im:id'],
          itemImg = item['im:image'][0].label,
          itemCate = item['category']['attributes']['label'],
          itemName = item['im:name']['label'];
        return (
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
          </li>
        );
      });
    return (
      <div className={style['app-list']}>
        <ul>{listDom}</ul>
      </div>
    );
  }
}

// mapStateToProps：render state to props of comonent => only props for Index
let mapStateToProps = state => {
  return {
    searchBar: state.searchBar,
    recommendation: state.recommendationReduce,
    appList: state.appListReduce
  };
};

// mapDispatchToProps：render dispatch to props of comonent => only props for Index
let mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setRecommendationList(data) {
      dispatch(setRecommendationList(data));
    },
    setSearchBar(data) {
      dispatch(setSearchBar(data));
    },
    setAppList(data) {
      dispatch(setAppList(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
