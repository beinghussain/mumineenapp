import React, { Component } from "react";
import HijriDate from "./libs//hijri_date.js";
import MiqaatList from "./MiqaatList";

class Modal extends Component {
  hijriDateString = () => {
    if (this.props.day && this.props.day.hijri) {
      var day = this.props.day.hijri;
      return day.date.toString() + " " + HijriDate.getMonthName(day.month) + " " + day.year.toString() + "H";
    }
  };
  gregorianDateString = () => {
    if (this.props.day && this.props.day.gregorian) {
      var day = this.props.day.gregorian;
      return day.date.toString() + " " + Date.getMonthName(day.month) + " " + day.year.toString() + "AD";
    }
  };
  render() {
    return (
      <div className="modal" id={this.props.modalId}>
        <input className="modal-state" id="modal-checkbox" type="checkbox" />
        <div className="modal-window">
          <div className="modal-inner">
            <label className="modal-close" htmlFor="modal-checkbox" />
            <h3>{this.hijriDateString()}</h3>
            <h4>{this.gregorianDateString()}</h4>
            <MiqaatList {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
