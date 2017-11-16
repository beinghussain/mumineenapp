import React, { Component } from "react";
import Lazy from "./libs/lazy.js";
import CalendarDay from "./CalendarDay";

class CalendarWeek extends Component {
  days = () => {
    var today = this.props.today,
      miqaats = this.props.miqaats,
      onDayClick = this.props.onDayClick,
      arabicNums = this.props.arabicNums,
      showGreg = this.props.showGreg;
    return Lazy(this.props.week)
      .map(function(day) {
        var key = [day.hijri.year, day.hijri.month, day.hijri.date].join("-");
        return <CalendarDay showGreg={showGreg} key={key} arabicNums={arabicNums} day={day} today={today} miqaats={miqaats} onDayClick={onDayClick} />;
      })
      .toArray();
  };
  render() {
    return <tr>{this.days()}</tr>;
  }
}

export default CalendarWeek;
