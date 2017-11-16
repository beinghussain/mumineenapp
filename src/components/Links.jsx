import React, { Component } from "react";
import { AppBar, Avatar, Divider, FloatingActionButton, Dialog, TextField, RaisedButton, Subheader, Card } from "material-ui";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import AddIcon from "material-ui-icons/Add";
import "../Links.css";
const styles = {
  title: {
    cursor: "pointer"
  }
};

class Links extends Component {
  state = {
    data: [],
    open: false,
    instaLinks: [
      {
        name: "Mumineen Ads",
        link: "mumineen_ads",
        img: "https://scontent-bom1-1.cdninstagram.com/t51.2885-19/s150x150/11260594_887375914679267_318098925_a.jpg"
      },
      {
        name: "Mumineen Advertise",
        link: "mumineen_addvertise",
        img: "https://scontent-bom1-1.cdninstagram.com/t51.2885-19/s150x150/20759846_135350053735949_6659158870448930816_a.jpg"
      },
      {
        name: "Mumineen Shop",
        link: "mumineenshop",
        img: "https://scontent-bom1-1.cdninstagram.com/t51.2885-19/s150x150/22802553_317148502085479_5666354833263689728_n.jpg"
      },
      {
        name: "Dawoodi Bohras Page",
        link: "dawoodi.bohras.page",
        img: "https://scontent-bom1-1.cdninstagram.com/t51.2885-19/s150x150/13413456_586937564808054_277119868_a.jpg"
      }
    ],
    apps: [
      {
        name: "ITS App",
        purpose: "Jamaat Portal",
        link: "https://play.google.com/store/apps/details?id=com.its52.pushnotifications",
        img: "https://lh5.ggpht.com/Q0rPBe5aDUGUJZY7jcYPgzwL_RGc41aKBkOJwiso6PkHexkKoQLpjijjCc467Ui_Flfw=w300-rw"
      },
      {
        name: "Mumineen Downloads",
        purpose: "Audio player",
        link: "https://play.google.com/store/apps/details?id=com.hdevelopers.mumineendownloads",
        img: "https://lh3.googleusercontent.com/CTDdyBvY-H8mvlqLQeX6d4whAkjds3L_BN8KpDEaqRNAQqCk2TBaPpLRMonkuTgdw8M=w300-rw"
      },
      {
        name: "Mumineen PDF",
        purpose: "PDF File Collection",
        link: "https://play.google.com/store/apps/details?id=com.mumineendownloads.mumineenpdf",
        img: "https://lh3.googleusercontent.com/On7QGLF8E-9BYUUkCnCJVFkJh5xgWJChfDRd1WgW_MmMXKsVRRMLmJXLRThyne8-dQ=w300-rw"
      },
      {
        name: "Tadreeb",
        purpose: "Educational",
        link: "https://play.google.com/store/apps/details?id=com.dohadwala.tadreeb",
        img: "https://lh4.ggpht.com/hzNmhVwSWYooi6fUArSqdbVVCYQmJGcgkzN2UDPrnzm2GqGlU4Ne3NELoJdYVwWkz-My=w300-rw"
      },
      {
        name: "AajNoDin",
        purpose: "Deeni Information and more",
        link: "https://play.google.com/store/apps/details?id=com.aajnodin",
        img: "https://lh4.ggpht.com/Y7XHhmwbgPyjhh7HEYASZ-LDryaz90m6obv3Wd3Rv228Op-rMjvfMGFYVi2crAKehzk=w300-rw"
      },
      {
        name: "Marasiya Of Dawoodi Bohra",
        purpose: "Marasiya and other Audio/PDF Collection",
        link: "https://play.google.com/store/apps/details?id=com.marasiya.dbohra",
        img: "https://lh3.googleusercontent.com/NhubW4DDF-TV0xKz5nQyzhW99OFotK2JlES3kgMS4uBw5ZY55xdjpxPXv3dNSxfsyA=w300-rw"
      },
      {
        name: "Sat ul Imam",
        purpose: "Madeh, Marasi and more",
        link: "https://play.google.com/store/apps/details?id=com.janahaltarannum.sautuliman",
        img: "https://lh3.googleusercontent.com/DBGWyC737qrGfd870uDMoDTpCOKH3wyGPcgt8rRx_wfLssB5UGUc26EICRkuXSkPNsY=w300-rw"
      },
      {
        name: "Mumineen App",
        purpose: "Salaat timings and more",
        link: "https://play.google.com/store/apps/details?id=mumineen.app",
        img: "https://lh3.googleusercontent.com/YMJtJy7bh-_7gB8LHQ-7kWldu0eSLPFQFzjNrZHHgcbbghYv6lq5exEW6Ie0iPCIhw=w300-rw"
      }
    ]
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  close = () => {
    this.setState({ open: false });
  };

  handleClose = () => {
    if ((this.state.name && this.state.link) || (this.state.name !== "" && this.state.link !== "")) {
      this.setState({ open: false });
      this.submitData();
    }
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleLinkChange = e => {
    this.setState({
      link: e.target.value
    });
  };

  submitData = () => {
    let that = this;
    var payload = {
      name: this.state.name,
      link: this.state.link
    };

    var data = new FormData();
    data.append("data", JSON.stringify(payload));

    fetch("http://mumineenapp.com/api/post/add_link.php", {
      method: "post",
      body: data
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.success) {
          that.setState({
            link: "",
            name: ""
          });
        }
      });
  };

  componentDidMount() {
    var that = this;
    var url = "https://mumineenapp.com/api/fetch/fetch_links.php";
    var data = {};

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
  }
  render() {
    const actions = [<RaisedButton label="Cancel" primary={true} onClick={this.handleClose} />, <RaisedButton label="Submit" primary={true} onClick={this.close} />];

    return (
      <div className="rootContainer">
        <Card className="linkCard">
          <FloatingActionButton onClick={this.handleOpen} className="floatingButton">
            <AddIcon />
          </FloatingActionButton>
          <Dialog title="Suggest a link" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose} className="modalHeader">
            <span className="modalDesc">Suggest a link that is missing from this list</span>
            <TextField value={this.state.name} onChange={this.handleNameChange} fullWidth={true} hintText="Name" />
            <br />
            <TextField value={this.state.link} onChange={this.handleLinkChange} fullWidth={true} hintText="Link" />
          </Dialog>
          <List>
            <Subheader>Websites</Subheader>
            {this.state.data.map((item, index) => {
              return (
                <div key={index} className="listItem">
                  <a target="_blank" href={item.link}>
                    <ListItem leftAvatar={<Avatar className="avtar" src={item.img || "chrome.png"} />} primaryText={<span className="itemTitle"> {item.name} </span>} secondaryText={<p> {item.purpose} </p>} secondaryTextLines={1} />
                  </a>
                  <Divider inset={true} />
                </div>
              );
            })}
          </List>
          <List>
            <Subheader>Usefull Android Apps</Subheader>
            {this.state.apps.map((item, index) => {
              return (
                <div key={index} className="listItem">
                  <a target="_blank" href={item.link}>
                    <ListItem leftAvatar={<Avatar className="avtar app" src={item.img || "chrome.png"} />} primaryText={<span className="itemTitle"> {item.name} </span>} secondaryText={<p> {item.purpose} </p>} secondaryTextLines={1} />
                  </a>
                  <Divider inset={true} />
                </div>
              );
            })}
          </List>
          <List>
            <Subheader>Instagram Promotions</Subheader>
            {this.state.instaLinks.map((item, index) => {
              return (
                <div key={index} className="listItem">
                  <a target="_blank" href={"https://instagram.com/" + item.link}>
                    <ListItem leftAvatar={<Avatar className="avtar" src={item.img || "chrome.png"} />} primaryText={<span className="itemTitle"> {item.name} </span>} secondaryText={<p> {"@" + item.link} </p>} secondaryTextLines={1} />
                  </a>
                  <Divider inset={true} />
                </div>
              );
            })}
          </List>
        </Card>
      </div>
    );
  }
}

export default Links;
