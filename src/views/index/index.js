import React from 'react';
// send other props to component
import { connect } from 'react-redux';
import { setRecommendationList, setAppList } from '@/store/actions.js';
// loading
import Loading from '@/components/common/loading.js';
// SearchBar
import SearchBar from '@/views/index/searchBar';
// RecommendationList
import RecommendationList from '@/views/index/recommendation';
// AppList
import AppList from '@/views/index/appList';

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
        <Loading />
      </main>
    );
  }
}
export default connect()(Index);
