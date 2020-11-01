import React from "react";
import { Switch, Route } from "react-router-dom";
import Join from "../chatComponents/Chat/Chat";
import Chat from "../chatComponents/Join/Join";
import Auth from "../DashComponents/Auth/Auth";
import Dash from "../DashComponents/Dash/Dash";
import AddTask from "./AddTask/AddTask";
import Profile from "../DashComponents/Profile/Profile";

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/dash" component={Dash} />
    <Route path="/addtask" component={AddTask} />
    <Route path="/profile" component={Profile} />
    <Route path="/join" component={Join} />
    <Route path="/chat" component={Chat} />
  </Switch>
);
