import React, {Component} from 'react';
import HijriDate from '../Libs/hijri_date';

class MonthControls extends Component{
  render () {
    return (
      <div className="month-controls">
        <a href="#" className="prev" onClick={this.props.onMonthChange.bind(null, -1)}>
          <i className="icon-chevron-sign-left"></i>
        </a>
        <h3>{HijriDate.getMonthName(this.props.month)}</h3>
        <a href="#" className="next" onClick={this.props.onMonthChange.bind(null, +1)}>
          <i className="icon-chevron-sign-right"></i>
        </a>
      </div>
    );
  }
};


export default MonthControls;