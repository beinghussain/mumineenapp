import React, { Component } from "react";
import Lazy from "./libs/lazy.js";
import ArabicNumerals from "./libs/arabic_numerals.js";
import classNames from "classnames";
import Date from "./libs/date.js";

class CalendarDay extends Component {
  isToday = () => {
    return this.props.day.hijri.year === this.props.today.getYear() && this.props.day.hijri.month === this.props.today.getMonth() && this.props.day.hijri.date === this.props.today.getDate();
  };
  dayClassName = () => {
    return classNames({
      day: !this.props.day.filler,
      filler: this.props.day.filler,
      today: this.isToday()
    });
  };
  iconClassName = () => {
    var day = this.props.day,
      firstMiqaat = Lazy(this.props.miqaats)
        .filter({ date: day.hijri.date })
        .pluck("miqaats")
        .flatten()
        .filter(function(miqaat) {
          return miqaat.year ? miqaat.year <= day.hijri.year : true;
        })
        .first();

    if (!firstMiqaat || day.filler) return null;
    // return classNames({
    //   "sun": (firstMiqaat.priority === 1 && firstMiqaat.phase === 'day'),
    //   "moon": (firstMiqaat.priority === 1 && firstMiqaat.phase === 'night'),
    //   "circle": (firstMiqaat.priority > 1)
    // });
    if (firstMiqaat.priority === 1 && firstMiqaat.phase === "day") {
      return "sun";
    } else if (firstMiqaat.priority === 1 && firstMiqaat.phase === "night") {
      return "moon";
    } else {
      return "circle";
    }
  };
  hijriDateString = () => {
    return this.props.arabicNums ? ArabicNumerals.fromInteger(this.props.day.hijri.date) : this.props.day.hijri.date;
  };
  gregorianDateString = () => {
    var day = this.props.day.gregorian,
      dateString = day.date.toString();
    if (!this.props.day.filler) {
      if (this.props.day.hijri.date === 1 || day.date === 1) {
        dateString += " " + Date.getShortMonthName(day.month);
      }
      if (this.props.day.hijri.date === 1 || (day.month === 0 && day.date === 1)) {
        // dateString += " " + day.year.toString();
      }
    }
    return dateString;
  };
  onDayClick = day => {
    let miqaats = Lazy(this.props.miqaats)
      .filter({ date: day.hijri.date })
      .toArray();

    if (!this.props.day.filler) {
      this.props.onDayClick(day, miqaats);
    }
    return false;
  };

  getStyle = () => {
    if (this.props.showGreg) {
      return "withDate";
    } else {
      return "noDate";
    }
  };

  getNumClass = () => {
    return this.props.arabicNums ? "arabicNums" : "englishNums";
  };

  hijriClasses = classNames("hijri " + this.iconClassName());

  render() {
    const GregDate = () => <div className="gregorian">{this.gregorianDateString()}</div>;
    return (
      <td className={this.dayClassName()} onClick={this.onDayClick.bind(null, this.props.day)}>
        <div className="dayContainer">
          <div className={this.iconClassName() + " hijri " + this.getStyle() + " " + this.getNumClass()}>{this.hijriDateString()}</div>
          <span className={this.iconClassName()}>
            <div />
          </span>
          {this.props.showGreg ? <GregDate /> : null}
        </div>
      </td>
    );
  }
}

export default CalendarDay;
