/** @format */

import { CircularProgress, Dialog } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import SnackBar from "../Component/ModifiedSnackBar";

export function popUp(message, type, handleOpen) {
  ReactDOM.render(
    <SnackBar
      message={message}
      type={type}
      handleOpen={handleOpen}
      renderElement={document.getElementById("popUp")}
    />,
    document.getElementById("popUp")
  );
}
export function addLoader() {
  ReactDOM.render(
    <Dialog
      open={true}
      fullWidth
      fullScreen
      PaperComponent="div"
      PaperProps={{
        style: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <CircularProgress
        style={{ color: "#0f2862" }}
        size={100}
        thickness={1.5}
      />
    </Dialog>,
    document.getElementById("loader")
  );
}

export function removeLoader() {
  ReactDOM.unmountComponentAtNode(document.getElementById("loader"));
}
