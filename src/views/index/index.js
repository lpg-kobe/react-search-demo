import React from 'react';
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

  render() {
    let { recommendation, appList } = this.props;
    return (
      <main>
        <header>
          <SearchBar />
        </header>
        <section>
          <RecommendationList />
        </section>
        <section>
          <AppList />
        </section>
        <Loading loadingShow={appList.loadingShow} />
      </main>
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
