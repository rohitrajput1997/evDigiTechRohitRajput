/** @format */

import React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import LocalStorage from "./Common/LocalStorage";
import Dashboard from "./Views/Dashboard";
import Login from "./Views/Login";
import Register from "./Views/Register";

const verify = () => {
  const user = LocalStorage.getUser();
  if (user !== null) {
    return <Dashboard />;
  } else {
    return <Redirect to="/" />;
  }
};

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/add-employee" exact render={() => verify()} />
        <Route path="/view-employee" exact render={() => verify()} />
      </Switch>
    </HashRouter>
  );
}

export default App;
