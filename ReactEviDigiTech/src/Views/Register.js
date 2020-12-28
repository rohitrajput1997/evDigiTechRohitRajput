/** @format */

import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { FaceOutlined, FingerprintOutlined } from "@material-ui/icons";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { addLoader, popUp, removeLoader } from "../Utils/Utils";

const useStyles = (theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    display: "block",
    backgroundColor: "Darkblue",
    width: "100px",
    height: "40px",
    boxShadow: "1px 2px 12px gray",
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#0f2862",
    boxShadow: "1px 2px 12px gray",
  },
  form: {
    marginTop: theme.spacing(2),
    color: "#0f2862",
  },
});

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      emailerror: "",
      passworderror: "",
      phoneerror: "",
    };
  }

  handleChangeFields = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.validation(e);
  };

  validation = (e) => {
    const { name } = e.target;
    switch (name) {
      case "email":
        if (!e.target.value.includes("@") || !e.target.value.includes(".com")) {
          this.setState({ emailerror: "Please Fill valid Email" });
        } else {
          this.setState({ emailerror: "" });
        }
        break;
      case "password":
        if (e.target.value.length < 6) {
          this.setState({ passworderror: "Password is short" });
        } else {
          this.setState({ passworderror: "" });
        }
        break;
      case "phone":
        var phone = e.target.value;
        if (!Number(phone)) {
          this.setState({ phoneerror: "Please Fill valid Phone Number" });
        } else {
          this.setState({ phoneerror: "" });
        }
        break;

      default:
    }
  };

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.RegisterApi();
    }
  };

  RegisterApi = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      phoneerror,
      emailerror,
      passworderror,
    } = this.state;
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== "" &&
      phone !== "" &&
      phoneerror === "" &&
      passworderror === "" &&
      emailerror === ""
    ) {
      let fullName = firstName.concat(" ", lastName);
      const registerData = {
        fullName,
        email,
        password,
        phone,
      };
      addLoader();
      Axios.post("register", registerData)
        .then((response) => {
          removeLoader();
          if (response.data.email !== email) {
            this.setState({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              password: "",
            });
            popUp(
              "Thank for Register, Redirect to Login with in seconds",
              "success",
              true
            );
            setTimeout(() => this.redirect(), 4000);
          } else {
            popUp(response.data.message, "error", true);
          }
        })
        .catch((err) => {
          removeLoader();
          popUp(err.message, "error", true);
        });
    } else {
      popUp("Registration are not Valid", "error", true);
    }
  };

  redirect = () => {
    this.props.history.push("/");
  };

  render() {
    const { classes } = this.props;
    const { firstName, lastName, email, password, phone } = this.state;

    return (
      <div className={classes.back}>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <HowToRegIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className={classes.paper}>
              Register Yourself
            </Typography>

            <div className={classes.form}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={2}>
                  <FaceOutlined />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    type="text"
                    label="First Name"
                    required
                    name="firstName"
                    fullWidth
                    value={firstName}
                    onChange={this.handleChangeFields.bind(this)}
                  />
                </Grid>

                <Grid item xs={5}>
                  <TextField
                    type="text"
                    label="Last Name"
                    required
                    name="lastName"
                    fullWidth
                    value={lastName}
                    onChange={this.handleChangeFields.bind(this)}
                  />
                </Grid>

                <Grid item xs={2}>
                  <EmailOutlinedIcon />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    required
                    label="Email Address"
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChangeFields.bind(this)}
                  />
                  <small style={{ color: "red" }}>
                    {this.state.emailerror}
                  </small>
                </Grid>
                <Grid item xs={2}>
                  <CallOutlinedIcon />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    required
                    label="Phone Number"
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={this.handleChangeFields.bind(this)}
                  />
                  <small style={{ color: "red" }}>
                    {this.state.phoneerror}
                  </small>
                </Grid>
                <Grid item xs={2}>
                  <FingerprintOutlined />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    required
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChangeFields.bind(this)}
                    onKeyDown={this.handleKeyDown}
                  />
                  <small style={{ color: "red" }}>
                    {this.state.passworderror}
                  </small>
                </Grid>
              </Grid>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.RegisterApi.bind(this)}
            >
              Sign-Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/" variant="body2">
                  Back to Login
                </Link>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    );
  }
}
export default withStyles(useStyles)(Register);
