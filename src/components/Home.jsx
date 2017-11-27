import React, { Component } from "react";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import { Helmet } from "react-helmet";

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
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
    this.fetchApps();
  }

  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Mumineen Apps</title>
          <meta name="description" content="Apps for Mumineen like PDF, Mp3, Calendar, Namaz times, Important links and more" />
        </Helmet>
        <div className="rootContainer">
          <div className="centerBlock">
            <div style={styles.root}>
              <div container>
                {this.state.data.map(tile => (
                  <div className="appCard" item key={tile.title}>
                    <a href={tile.link}>
                      <div className="card">
                        <img alt="tile" src={tile.img} />
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
