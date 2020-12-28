/** @format */

import { IconButton, InputAdornment } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {
  FingerprintOutlined,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import EmailIcon from "@material-ui/icons/Email";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import LocalStorage from "../Common/LocalStorage";
import { employeeList } from "../Redux/Action/Action";
import { addLoader, popUp, removeLoader } from "../Utils/Utils";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // marginTop:'112px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#0f2862",
    boxShadow: "1px 2px 12px gray",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: "#0f2862",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    display: "block",
    backgroundColor: "#0f2862",
    width: "100px",
    height: "40px",
    boxShadow: "1px 2px 12px gray",
  },
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      login: [],
      showPassword: false,
      emailerror: "",
      passworderror: "",
    };
  }
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleChangeFields = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.validation(e);
  };

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.loginApi();
    }
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

      default:
    }
  };

  loginApi = () => {
    const { email, password, emailerror, passworderror } = this.state;
    if (
      email !== "" &&
      password !== "" &&
      emailerror === "" &&
      passworderror === ""
    ) {
      addLoader();
      const loginCreditinals = {
        email,
        password,
      };
      Axios.post("login", loginCreditinals)
        .then((response) => {
          removeLoader();
          if (response.status === 200 && response.data.length > 0) {
            let User = response.data;
            this.setState({
              loginData: User,
              email: "",
              password: "",
            });
            this.props.dispatch(employeeList());
            LocalStorage.setUser(User);
            if (User[0]._id !== null) {
              this.props.history.push("/add-employee");
            }
          } else {
            popUp("invaild Creditinals", "error", true);
            LocalStorage.removeUser();
          }
        })
        .catch((err) => {
          popUp(err.message, "error", true);
          removeLoader();
        });
    } else {
      popUp("Login are not Valid", "error", true);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <div className={classes.form} noValidate>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={2}>
                  <EmailIcon />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    required
                    label="Email Address"
                    type="email"
                    name="email"
                    onChange={this.handleChangeFields}
                    value={this.state.email}
                  />
                  <small style={{ color: "red" }}>
                    {this.state.emailerror}
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
                    name="password"
                    onChange={this.handleChangeFields}
                    value={this.state.password}
                    InputProps={{
                      onKeyDown: this.handleKeyDown,
                      type: this.state.showPassword ? "text" : "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            style={{ outline: "none" }}
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            size="small"
                          >
                            {this.state.showPassword ? (
                              <Visibility fontSize="inherit" />
                            ) : (
                              <VisibilityOff fontSize="inherit" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <small style={{ color: "red" }}>
                    {this.state.passworderror}
                  </small>
                </Grid>
              </Grid>

              <center>
                {" "}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.loginApi}
                  style={{ outline: "none" }}
                >
                  Sign-In{" "}
                </Button>
              </center>

              <Grid container>
                <Grid item>
                  <Link to="/register" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

const finalStyle = withStyles(useStyles)(Login);
const showwithrouter = withRouter(finalStyle);
export default connect()(showwithrouter);
