import React, { Component } from "react";
import Lazy from "./libs/lazy.js";
import CalendarWeek from "./CalendarWeek";
import { Subheader, Paper, IconButton, RaisedButton, Card, Divider, Avatar } from "material-ui";
import HijriDate from "./libs/hijri_date.js";
import HijriCalendar from "./libs/hijri_calendar.js";
import ArrowBackIcon from "material-ui-icons/ArrowBack";
import ArrowForwardIcon from "material-ui-icons/ArrowForward";
import ArabicNumerals from "./libs/arabic_numerals.js";
import Toggle from "material-ui/Toggle";
import { ListItem, List } from "material-ui/List";

class Calendar extends Component {
  state = {
    day: null,
    calendar: new HijriCalendar(this.props.today.getYear(), this.props.today.getMonth()),
    miqaats: [],
    showGreg: false,
    arabicNums: true
  };

  miqaats = () => {
    return Lazy(this.props.miqaats)
      .filter({ month: this.props.calendar.getMonth() })
      .toArray();
  };

  allMiqaats = () => {
    var miqaats = Lazy(this.props.miqaats)
      .filter({ month: this.props.calendar.getMonth() })
      .toArray();

    var array = [];

    for (var i = 0; i < miqaats.length; i++) {
      var obj = {};
      for (var j = 0; j < miqaats[i].miqaats.length; j++) {
        obj = miqaats[i].miqaats[j];
        obj.date = miqaats[i].date;
        obj.year = miqaats[i].year;
        obj.miqaats = miqaats[i];
        array.push(obj);
      }
    }

    return array;
  };

  weeks = () => {
    var key = -1,
      today = this.props.today,
      miqaats = this.miqaats(),
      onDayClick = this.props.onDayClick,
      showGreg = this.state.showGreg,
      arabicNums = this.state.arabicNums;
    return Lazy(this.props.calendar.weeks())
      .map(function(week) {
        key += 1;
        return <CalendarWeek key={key} week={week} today={today} miqaats={miqaats} onDayClick={onDayClick} showGreg={showGreg} arabicNums={arabicNums} />;
      })
      .toArray();
  };

  render() {
    const arrowStyle = {
      color: "#000"
    };
    const button = {
      marginTop: "15px",
      backgroundColor: "#fff",
      color: "#FF007A",
      width: "100%"
    };

    return (
      <div className="calendar">
        <Paper className="PaperShadow">
          <div className="calendarHeader">
            <h3>
              <IconButton style={arrowStyle} className="prev" onClick={this.props.onMonthChange.bind(null, -1)} color="contrast" aria-label="Menu">
                <ArrowBackIcon />
              </IconButton>
              {HijriDate.getMonthName(this.props.calendar.getMonth())}

              <IconButton style={arrowStyle} className="next" onClick={this.props.onMonthChange.bind(null, +1)} color="contrast" aria-label="Menu">
                <ArrowForwardIcon />
              </IconButton>
            </h3>
            <span>{this.props.calendar.getYear() + " H "}</span>
          </div>
          <div className="calendarBody">
            <table>
              <thead>
                <tr>
                  <th>Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                </tr>
              </thead>
              <tbody>{this.weeks()}</tbody>
            </table>
          </div>
        </Paper>
        <RaisedButton primary={true} label="Reset / Today" onClick={this.props.navigateToToday} style={button} fullWidth={true} />

        <Card className={"listItems"} style={{ marginTop: 10 }}>
          <List>
            <ListItem primaryText="English/Greg Dates" rightToggle={<Toggle onToggle={(event, checked) => this.setState({ showGreg: checked })} />} />
            <ListItem primaryText="Arabic Numbers" rightToggle={<Toggle defaultToggled={this.state.arabicNums} onToggle={(event, checked) => this.setState({ arabicNums: checked })} />} />
          </List>
        </Card>
        <Card style={{ marginTop: 10, marginBottom: 10 }}>
          <List
            className="list"
            subheader={
              <div className="subheader">
                <Subheader>
                  Miqaats this month ({HijriDate.getMonthName(this.props.calendar.getMonth())})<span style={{ float: "right" }}>{this.allMiqaats().length}</span>
                </Subheader>
                <Divider />
              </div>
            }
          >
            {this.allMiqaats().map((item, index) => {
              return (
                <div key={index}>
                  <ListItem leftAvatar={<Avatar style={{ backgroundColor: "#f39c12", marginRight: 0 }}>{ArabicNumerals.fromInteger(item.date)}</Avatar>} primaryText={item.title} />
                  {index !== this.allMiqaats().length - 1 ? <Divider /> : null}
                </div>
              );
            })}
          </List>
        </Card>
      </div>
    );
  }
}

export default Calendar;
