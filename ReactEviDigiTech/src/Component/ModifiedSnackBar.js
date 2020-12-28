/** @format */

import { Snackbar } from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";
import React, { Component } from "react";
import ReactDOM from "react-dom";
export default class ModifiedSnackBar extends Component {
  handleonClose = () => {
    ReactDOM.unmountComponentAtNode(this.props.renderElement);
    this.setState({
      handleOpen: false,
      message: "",
    });
  };

  render() {
    const { type, message, handleOpen } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={handleOpen}
        autoHideDuration={3000}
        onClose={this.handleonClose}
      >
        <Alert severity={type.toLowerCase()}>{message}</Alert>
      </Snackbar>
    );
  }
}
