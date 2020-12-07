import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewRoomPage from "./new-room-page";
import JoinRoomPage from "./join-room-page";

const App = () => (
  <Router>
    <Switch>
      <Route path="/new-room">
        <NewRoomPage />
      </Route>
      <Route path="/room">
        <JoinRoomPage />
      </Route>
      <Route path="">
        <a href="/new-room">Create room</a>
      </Route>
    </Switch>
  </Router>
);

export default App;
