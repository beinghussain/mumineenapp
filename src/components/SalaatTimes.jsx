import React, { Component } from "react";
import { Dialog, FlatButton, Paper, AutoComplete, RaisedButton } from "material-ui";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import { instanceOf } from "prop-types";
import HijriDate from "hijri-date";
import { withCookies, Cookies } from "react-cookie";

class SalaatTimes extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = this.props;

    this.state = {
      currentCity: cookies.get("city") || "Mumbai",
      data: [],
      open: false,
      dataSource: [],
      cities: []
    };
  }

  hijriMonths = ["Moharram", "Sawwaal", "Rabi-ul-Awwal", "Rabi-ul-Aakhar", "Jumadil-ul-Awwal", "Jumadil-ul-Aakhar", "Rajab", "Shaaban", "Ramazan-al-Moazam", "Saffar", "ZilQaad", "ZilHajj"];

  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  nth = d => {
    if (d > 3 && d < 21) return "th"; // thanks kennebec
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  hijriDate = () => {
    const today = new HijriDate();
    return today.getDate() + this.nth(today.getDate()) + ", " + this.hijriMonths[today.getMonth()] + " 1439";
  };

  gregDate = () => {
    const today = new Date();
    return today.getDate() + this.nth(today.getDate()) + ", " + this.monthNames[today.getMonth()] + " 2017";
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  isSelected = index => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleUpdateInput = searchText => {
    this.setState({
      cityInput: searchText
    });
  };

  handleSave = () => {
    if (this.state.cities.indexOf(this.state.cityInput) !== -1) {
      this.setState({
        fieldError: null
      });

      this.setState({
        currentCity: this.state.cityInput
      });
      const { cookies } = this.props;
      cookies.set("city", this.state.cityInput, { path: "/" });
      this.handleClose();
      this.fetchTime();
    } else {
      this.setState({
        fieldError: "Select valid city"
      });
    }
  };

  fetchTime = () => {
    var that = this;
    var date = new Date();
    var url = "https://mumineenapp.com/api/fetch/fetch_time.php?address=" + this.state.currentCity + "&time=" + date;
    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        that.setState({ data: data });
      });
  };

  getTime = () => {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    return ("0" + h).slice(-2) + ":" + ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2);
  };

  componentDidMount() {
    var that = this;
    setInterval(() => {
      this.setState({
        time: this.getTime()
      });
    }, 1000);
    var urlCities = "https://mumineenapp.com/api/fetch/fetch_cities.php";

    fetch(urlCities)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        that.setState({ cities: data });
      });

    this.fetchTime();
  }

  render() {
    const actions = [<FlatButton label="Cancel" primary={true} onClick={this.handleClose} />, <FlatButton label="Update" primary={true} onClick={this.handleSave} />];
    return (
      <div className="rootContainer">
        <div className="bodyContainer">
          <div className="centerBlock">
            <Paper>
              <span className="cityName">
                <div>
                  <span className="time">{this.state.time}</span>
                  <br />
                  <span className="cityText">{this.state.currentCity}</span>
                  <br />
                  <span className="hijriDate">{this.hijriDate()}</span>
                  <br />
                  <span className="gregDate">{this.gregDate()}</span>
                </div>
              </span>
              <Dialog
                actions={actions}
                style={{
                  paddingTop: 0
                }}
                className="modalSelectCity"
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
              >
                <div className="autoComplete" expandable={true} expanded={false}>
                  <span className="currentCityLabel">
                    Current city:<br />
                  </span>{" "}
                  <span className="modalCityName">
                    {this.state.currentCity}
                    <br />
                  </span>
                  <AutoComplete errorText={this.state.fieldError} hintText="Type city name" onUpdateInput={this.handleUpdateInput} dataSource={this.state.cities} filter={AutoComplete.fuzzyFilter} floatingLabelText="Select your city" fullWidth={true} maxSearchResults={5} spellChecking={false} />
                </div>
              </Dialog>
              <Table className="salaatTimes">
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Namaz</TableHeaderColumn>
                    <TableHeaderColumn style={{ textAlign: "right" }}>Timings</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {Object.keys(this.state.data).map(item => {
                    return (
                      <TableRow key={this.state.data[item].time}>
                        <TableRowColumn>{this.state.data[item].name}</TableRowColumn>
                        <TableRowColumn style={{ textAlign: "right" }}>{this.state.data[item].value}</TableRowColumn>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="buttonContainer">
                <RaisedButton primary={true} fullWidth={true} onClick={this.handleOpen} label="Change City" />
              </div>
            </Paper>
            <span style={{ padding: "15px", display: "block", textAlign: "center" }}>
              Didn't find accurate timings? <a href="/">Report now</a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(SalaatTimes);
