import React, {Component} from 'react';
import classNames from'classnames';
import'./trafficLights.css'
const GREEN= 0;
const RED= 1;
const YELLOW= 2;
class TrafficLights extends Component {
  render() {
    let {color} = this.props;
    return (
      <div className="TrafficLights">
        <div className={classNames('buld','green',{'active' : color === GREEN})}></div>
        <div className={classNames('buld','red',{'active' : color === RED})}></div>
        <div className={classNames('buld','yellow',{'active' : color === YELLOW})}></div>
      </div>
    );
  }
}

export default TrafficLights