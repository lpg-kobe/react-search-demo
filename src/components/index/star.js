/**
 * @desc star component default value => 5
 * @description this component can move to common , use temp
 * @author pika
 */
import React from 'react';
class Star extends React.Component {
  render() {
    let count = +this.props.count,
      starDom = [1, 2, 3, 4, 5].map(item => {
        return (
          <label
            key={item}
            className={`star-item ${count === item ? 'checked' : ''}`}
            htmlFor={`star0${item}`}
          >
            {count === item ? (
              <input
                type="radio"
                name="item"
                id={`star0${item}`}
                defaultChecked
              />
            ) : (
              <input type="radio" name="item" id={`star0${item}`} />
            )}
          </label>
        );
      });
    return <div className="comonent-star">{starDom}</div>;
  }
}
export default Star;
