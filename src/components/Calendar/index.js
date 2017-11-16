import React, { Component } from "react";
import HijriDate from "./libs//hijri_date";
import CalendarFrame from "./CalendarFrame";

class App extends Component {
  render() {
    return <CalendarFrame today={HijriDate.fromGregorian(new Date())} />;
  }
}

export default App;
