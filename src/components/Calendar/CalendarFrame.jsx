import React, { Component } from "react";
import HijriCalendar from "./libs/hijri_calendar";
import Calendar from "./Calendar";
import Modal from "./Modal";
import { Divider, FlatButton } from "material-ui";
import HijriDate from "./libs/hijri_date.js";
import List, { ListItem } from "material-ui/List";
import Dialog from "material-ui/Dialog";
import miqaats from "./miqaats.json";
import "./calendar.css";

class CalendarFrame extends Component {
  statics = {
    modalId: "modal",
    miqaatsUrl: "./miqaats.json"
  };

  state = {
    dialogTitle: "",
    currentDayMiqaats: [],
    day: null,
    calendar: new HijriCalendar(this.props.today.getYear(), this.props.today.getMonth()),
    miqaats: [],
    open: false
  };

  getInitialState() {
    return {
      day: null,
      calendar: new HijriCalendar(this.props.today.getYear(), this.props.today.getMonth()),
      miqaats: []
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.setState({
      miqaats
    });
  }
  navigateToToday = () => {
    this.setState({
      calendar: new HijriCalendar(this.props.today.getYear(), this.props.today.getMonth())
    });
  };
  changeMonth = monthChange => {
    this.setState({
      calendar: monthChange < 0 ? this.state.calendar.previousMonth() : this.state.calendar.nextMonth()
    });
  };
  changeYear = yearChange => {
    this.setState({
      calendar: yearChange < 0 ? this.state.calendar.previousYear() : this.state.calendar.nextYear()
    });
  };
  showModal = (day, miqaats) => {
    this.setState({
      day: day,
      dialogTitle: day.hijri.date + " " + HijriDate.getMonthName(day.hijri.month) + " " + day.hijri.year,
      currentDayMiqaats: miqaats
    });

    this.handleClickOpen();
  };
  render() {
    const actions = [<FlatButton onClick={this.handleRequestClose} label="OK" />];
    return (
      <div>
        <div className="calendar-frame">
          <Dialog title="Miqaats" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleRequestClose}>
            {this.state.currentDayMiqaats.length > 0 ? (
              <List style={{ margin: "0px -25px" }}>
                {this.state.currentDayMiqaats[0].miqaats.map((item, index) => {
                  return (
                    <div key={index}>
                      <ListItem primaryText={item.title} style={{ padding: "10px 20px" }} />
                      {index !== this.state.currentDayMiqaats[0].miqaats.length - 1 ? <Divider /> : null}
                    </div>
                  );
                })}
              </List>
            ) : (
              <span>There are no miqaats found on this day. Day having pink border or green dots are having miqaats. Pink border indicates major miqaats and green dots indicates all other miqaats.</span>
            )}
          </Dialog>

          <Calendar calendar={this.state.calendar} today={this.props.today} modalId={CalendarFrame.modalId} onMonthChange={this.changeMonth} navigateToToday={this.navigateToToday} miqaats={this.state.miqaats} onDayClick={this.showModal} />
          <Modal modalId={CalendarFrame.modalId} miqaats={this.state.miqaats} day={this.state.day} />
        </div>
      </div>
    );
  }
}

export default CalendarFrame;
