import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import HeaderMenu from "../menu";
import EventList from "../eventList";
import EventNew from "../eventNew";

class AppComponent extends Component {
  render() {
    return (
      <Router>
        <HeaderMenu />
        <Container fluid style={{ paddingBottom: "40px", paddingTop: "65px" }}>
          <Redirect from="/" to="/view" />
          <Route path="/view/" component={EventList} />
          <Route path="/schedule_new/" component={EventNew} />
          <Route path="/participations_history/" component={EventList} />
        </Container>
      </Router>
    );
  }
}

const App = observer(AppComponent);
export default App;
