import React, { Component } from "react";
import { MuiThemeProvider, getMuiTheme } from "material-ui/styles";
import { AppBar } from "material-ui";
import Routes from "./routes";

import "./App.css";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#1ABC9C"
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={muiTheme}>
        <div>
          <AppBar
            title={
              <a href="/" style={{ color: "#FFF" }}>
                Mumineen Apps
              </a>
            }
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <div className="rootContainer">
            <Routes />
          </div>
          <div className="footerText">
            Copyright © 2017 Hussain D. Rights reserved<br />Found anything
            unapproptiate ?{" "}
            <a href="/" style={{ textDecoration: "underline" }}>
              Report
            </a>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
