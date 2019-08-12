/**
 * @desc simple loading for demo
 * @author pika
 */
import React from 'react';
class Loading extends React.Component {
  render() {
    return (
      <div className={this.props.loadingShow ? '' : 'hidden'}>
        <div className="loading-box">加载中...</div>
        <style>
          {`
        .hidden{
            display:none;
          }
        .loading-box{
          position:fixed;
          bottom:0;
          left:0;
          width:100%;
          height:0.4rem;
          text-align:center;
          font-size:0.15rem;
          color:#666;
          line-height:0.4rem;
          background-color:#fff;
        }
        `}
        </style>
      </div>
    );
  }
}
export default Loading;
