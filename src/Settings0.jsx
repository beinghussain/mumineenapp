import React, { Component } from "react";
import { Card, TextField, RaisedButton, Checkbox, Snackbar, CircularProgress } from "material-ui";
import $ from "jquery";
import ajax from "../ajax.js";
import { checkmark } from "react-icons-kit/icomoon";
import Icon from "react-icons-kit";
class Settings extends Component {
  state = {
    name: "",
    email: "",
    open: false,
    imageRemoved: false,
    snackMessage: "",
    sendVerification: false,
    saveLabel: "SAVE",
    password: "",
    newpassword: "",
    newpassword2: ""
  };
  componentDidMount() {
    this.state = this.props;
    this.setState({
      name: this.props.user.name,
      email: this.props.user.email,
      emailPref: this.props.user.emailPref === 0 ? false : true
    });
    this.imageSelected();
    this.renderProfile();
  }
  constructor(props) {
    super(props);
    this.handleNameUpdate = this.handleNameUpdate.bind(this);
    this.handleEmailUpdate = this.handleEmailUpdate.bind(this);
    this.handleOldPassword = this.handleOldPassword.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.handleNewPassword2 = this.handleNewPassword2.bind(this);
  }
  handleTouchTap = message => {
    this.setState({
      open: true,
      snackMessage: message
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };
  handleNameUpdate = e => {
    this.setState({
      name: e.target.value
    });
  };
  handleEmailUpdate = e => {
    this.setState({
      email: e.target.value,
      emailError: ""
    });
  };
  handleOldPassword = e => {
    this.setState({
      password: e.target.value,
      oldpasswordError: ""
    });
  };
  handleNewPassword = e => {
    this.setState({
      newpassword: e.target.value,
      newPasswordError: "",
      passwordMismatch: ""
    });
  };
  handleNewPassword2 = e => {
    this.setState({
      newpassword2: e.target.value,
      passwordMismatch: ""
    });
  };
  openFileSelector = () => {
    $("#profile").trigger("click");
  };

  readUrl = input => {
    var reader = new FileReader();
    reader.onload = function(e) {
      $(".imageContainer").css("background-image", "url(" + e.target.result + ")");
    };
    reader.readAsDataURL(input.files[0]);
    this.setState({
      file: $("#profile")[0].files[0]
    });
  };

  imageSelected = () => {
    let that = this;
    $("#profile").change(function() {
      that.readUrl(this);
    });
  };

  checkNameChanged = user => {
    return user.name !== this.state.name;
  };

  checkEmailChanged = user => {
    return user.email !== this.state.email;
  };

  checkImgChanged = () => {
    return this.state.file !== undefined || this.state.imageRemoved;
  };

  checkEmailPrefChanged = user => {
    let e = user.emailPref === 0 ? false : true;
    return this.state.emailPref !== e;
  };

  checkChanges = () => {
    const { user } = this.props;
    let nameChanged = this.checkNameChanged(user);
    let emailChanged = this.checkEmailChanged(user);
    let imageChanged = this.checkImgChanged();
    let emailPrefChanged = this.checkEmailPrefChanged(user);

    return nameChanged || emailChanged || imageChanged || emailPrefChanged;
  };

  saveOptions = () => {
    let changes = this.checkChanges();
    if (!changes) {
      this.handleTouchTap("No changes to save");
    } else {
      const { email, name, file, emailPref, imageRemoved } = this.state;
      let emailValid = this.emailValidation(email);
      if (!emailValid) {
        this.setState({
          emailError: "Invalid email"
        });
      } else {
        const { id, username } = this.props.user;
        let usermail = this.props.user.email;

        let f = "";
        if (file) {
          if (imageRemoved) {
            f = "no-file";
          } else {
            f = "file_changed";
          }
        } else if (imageRemoved) {
          f = "no-file";
        }
        var that = this;
        var data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("file", file);
        data.append("file_changed", f);
        data.append("emailPref", emailPref);
        data.append("userid", id);
        data.append("usermail", usermail);
        data.append("username", username);

        this.setState({
          saving: true,
          saveLabel: "Saving.."
        });

        $.ajax({
          url: "http://ratenow.me/api/save_options.php",
          type: "POST",
          data: data,
          async: true,
          cache: false,
          success: response => {
            if (response === "email_exists") {
              this.setState({
                emailError: "Email already exists",
                saving: false
              });
            } else {
              setTimeout(() => {
                that.setState({
                  saveLabel: "saved",
                  saving: false,
                  file: undefined
                });
                setTimeout(() => {
                  that.props.reloadUser();
                  that.setState({
                    saveLabel: "save"
                  });
                }, 3000);
              }, 2000);
            }
          },
          contentType: false,
          processData: false
        });
      }
    }
  };

  updateCheck() {
    this.setState(oldState => {
      return {
        emailPref: !oldState.emailPref
      };
    });
  }

  emailValidation = mail => {
    if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  renderProfile = () => {
    const { user } = this.props;
    this.setState({
      profile: user.img || "/avtar.png"
    });
  };

  fileRemoved = () => {
    this.setState({
      imageRemoved: true,
      profile: "/avtar.png"
    });
  };

  sendVerification = () => {
    const { user } = this.props;
    ajax("send_email_verification", { user }, response => {
      if (response === "success") {
        this.setState({
          verificationSend: true
        });
      }
    });
  };

  isPass = user => {
    return !user.password.length > 0;
  };

  updatePassword = user => {
    const { password, newpassword, newpassword2 } = this.state;
    if (!this.isPass(user)) {
      if (newpassword !== newpassword2) {
        this.setState({
          passwordMismatch: "Password do not match"
        });
      } else {
        ajax("set_password", { password, newpassword, id: user.id }, res => {
          console.log(password);
        });
      }
    } else {
      if (newpassword !== "") {
        if (password === "") {
          this.setState({
            oldpasswordError: "Enter your current password"
          });
        }

        if (newpassword !== newpassword2) {
          this.setState({
            passwordMismatch: "Password do not match"
          });
        }

        if (newpassword === newpassword2 && password !== "") {
          const { id } = this.props.user;
          ajax("change_pass", { newpassword, newpassword2, password, id }, res => {
            if (res === "samepass") {
              this.setState({
                responseError: "Password cannot be same"
              });
            } else if (res === "shortlen") {
              this.setState({
                responseError: "Password too short. Must be atlease 8 characters"
              });
            } else if (res === "oldpasswrong") {
              this.setState({
                responseError: "Current password is wrong"
              });
            } else if (res === "success") {
              this.setState({
                responseError: "",
                successMessage: "Password changed successfuly",
                password: "",
                newpassword: "",
                newpassword2: ""
              });
            }
          });
        }
      } else {
        this.setState({
          newPasswordError: "Please enter new password",
          passwordMismatch: "Please enter new password"
        });

        if (password === "") {
          this.setState({
            oldpasswordError: "Enter your current password"
          });
        }
      }
    }
  };
  render() {
    const { profile } = this.state;
    const { user } = this.props;
    return (
      <div>
        <Snackbar open={this.state.open} message={this.state.snackMessage} autoHideDuration={4000} onRequestClose={this.handleRequestClose} />
        <Card className="settingsCard">
          <div className="tabContainer">
            <div className="imageChangeContainer">
              <div className="imageContainer" style={{ backgroundImage: "url(" + profile + ")" }} />
              <div>
                <input className="imageInput" id="profile" type="file" accept="image/*" />
                <RaisedButton onClick={this.openFileSelector} secondary={true} label={profile === "/avtar.png" ? "Upload" : "Change"} />
                {this.state.file || user.img !== "" ? <RaisedButton style={{ marginLeft: 15 }} onClick={this.fileRemoved} secondary={true} label="Remove" /> : null}
              </div>
            </div>
            <TextField floatingLabelText="Full Name" onChange={this.handleNameUpdate} value={this.state.name} fullWidth hintText="Hint Text" />
            <br />
            <TextField errorText={this.state.emailError} floatingLabelText="Your Email" onChange={this.handleEmailUpdate} fullWidth value={this.state.email} />
            {!this.state.verificationSend ? (
              <div>
                {user.emailHash.length > 0 ? (
                  <span className="alreadySent">
                    Email not verified. Verification email has been sent. <a onClick={this.sendVerification}>Click</a> here to send again
                  </span>
                ) : (
                  <div>
                    {user.email.length > 0 && user.emailVerified === 1 ? null : (
                      <div>
                        <span className="EmailNotVerified">
                          Email not verified. <a onClick={this.sendVerification}>Verify now</a>
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <span className="emailSent">Verification email has been sent to you.</span>
            )}
            <TextField disabled floatingLabelText="Username" spellCheck={false} fullWidth value={user.username} />
            <br />
            <TextField disabled floatingLabelText="Your URL" fullWidth value={"http://ratenow.me/" + user.username} />
            <br />
            <Checkbox style={{ marginTop: 20 }} checked={this.state.emailPref} onCheck={this.updateCheck.bind(this)} label="Recieve Email notification" />
            <RaisedButton onClick={this.saveOptions} style={{ marginTop: 30 }} primary={true} label="save" />
            {this.state.saving ? <CircularProgress className="loading" size={20} thickness={2} /> : null}
            {this.state.saveLabel === "saved" ? <Icon style={{ color: "rgb(0, 188, 212)" }} className="loading" size={20} icon={checkmark} /> : null}
          </div>
        </Card>
        <Card className="settingsCard">
          <div className="tabContainer">
            <h2>{!this.isPass(user) ? "Change password" : "Set password"}</h2>
            <span className="repsonseError">{this.state.responseError}</span>
            <span className="successMessage">{this.state.successMessage}</span>
            {!this.isPass(user) ? <TextField errorText={this.state.oldpasswordError} type="password" floatingLabelText="Current password" onChange={this.handleOldPassword} value={this.state.password} fullWidth /> : null}
            <TextField errorText={this.state.newPasswordError} type="password" floatingLabelText="New password" onChange={this.handleNewPassword} fullWidth value={this.state.newpassword} />
            <TextField errorText={this.state.passwordMismatch} type="password" floatingLabelText="Retype password" onChange={this.handleNewPassword2} fullWidth value={this.state.newpassword2} />
            <RaisedButton
              onClick={e => {
                this.updatePassword(user);
              }}
              style={{ marginTop: 30 }}
              primary={true}
              label={!this.isPass(user) ? "update password" : "set password"}
            />
          </div>
        </Card>
      </div>
    );
  }
}

export default Settings;
