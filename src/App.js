import React, { Component } from "react";
import { MuiThemeProvider, getMuiTheme } from "material-ui/styles";
import { AppBar } from "material-ui";
import Routes from "./routes";
import "./App.css";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#23B684"
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            className="appbar"
            title={
              <a href="/" style={{ color: "#FFF" }}>
                Mumineen Apps
              </a>
            }
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <div className="rootContainer">
            <Routes theme={muiTheme} />
          </div>
          <div className="footerText">Copyright © 2017 Hussain D. Rights reserved</div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
