import React, {Component} from 'react';


class TodayButton  extends Component{
  render () {
    return (
      <div className="today-button">
        <button onClick={this.props.onClick}>Today</button>
      </div>
    );
  }
};


export default TodayButton;