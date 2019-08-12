/**
 * @desc listen scroll to bottom by distand
 * @author pika
 */
import React from 'react';
class ScrollBottom extends React.Component {
  constructor(props) {
    super(props);
    this.scrollHandler = this.scrollHandler.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }
  render() {
    return <div />;
  }
  scrollHandler(event) {
    let scrollTop =
        (event.srcElement
          ? event.srcElement.documentElement.scrollTop
          : false) ||
        window.pageYOffset ||
        (event.srcElement ? event.srcElement.body.scrollTop : 0),
      clientHeight =
        (event.srcElement && event.srcElement.documentElement.clientHeight) ||
        document.body.clientHeight,
      scrollHeight =
        (event.srcElement && event.srcElement.documentElement.scrollHeight) ||
        document.body.scrollHeight,
      distand = scrollHeight - scrollTop - clientHeight;

    // when scroll to distand of bottom
    if (distand <= (this.props.distand || 0)) {
      this.props.onReachBottom();
    }
  }
}
export default ScrollBottom;
