/**
 * @desc recommendation list
 * @author pika
 */
import { connect } from 'react-redux';
import React from 'react';
import style from '@/assets/scss/index.module.scss';
class RecommendationList extends React.Component {
  componentDidMount(){
    
  }
  render() {
    let {
        indexReducer: {
          recommendation: { list }
        }
      } = this.props,
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
export default connect(({ indexReducer }) => ({ indexReducer }))(
  RecommendationList
);
