/**
 * @desc searchBar
 * @author pika
 */
import { connect } from 'react-redux';
import React from 'react';
import style from '@/assets/scss/index.module.scss';
import { search } from '@/store/actions';
class SearchBar extends React.Component {
  handleSearch(e) {
    let { value } = e.target;
    this.props.search({
      value: value
    });
  }
  render() {
    return (
      <div className={`${style['app-search']}`}>
        <input type="text" placeholder="搜寻" onChange={this.handleSearch} />
      </div>
    );
  }
}

export default connect(
  null,
  { search }
)(SearchBar);
