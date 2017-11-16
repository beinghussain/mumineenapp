import React, { Component } from "react";
import { AppBar, Dialog, FlatButton, Paper, AutoComplete, RaisedButton, Subheader, IconButton, GridList } from "material-ui";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  }
};

const style = {
  container: {
    position: "relative"
  }
};

class Home extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  componentWillMount() {
    const { cookies } = this.props;

    this.state = {
      currentCity: cookies.get("city") || "Mumbai",
      data: [],
      open: false,
      dataSource: [],
      cities: []
    };
  }

  fetchApps = () => {
    var url = "apps.json";
    var that = this;
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

  componentDidMount() {
    var that = this;
    this.fetchApps();
  }

  render() {
    return (
      <div>
        <div className="rootContainer">
          <div className="centerBlock">
            <div style={styles.root}>
              <div container>
                {this.state.data.map(tile => (
                  <div className="appCard" item key={tile.title}>
                    <a href={tile.link}>
                      <div className="card">
                        <img src={tile.img} />
                        <span className="cardTitle">{tile.title}</span>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(Home);
