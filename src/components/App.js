import React, { Component } from 'react';
//import './App.css';
//import styled from 'styled-components'
import {  Container } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import store from './store';
import HeaderMenu from './menu'
import EventList from './eventList'
import EventNew from'./eventNew'


class AppComponent extends Component {
  render() {

    return (
      <Router>
        <HeaderMenu />
        <Container fluid style={{paddingBottom:'40px', paddingTop: '65px'}}>
          <Route path='/view/' render={(props) => <EventList events={store.getEvents().futureEvents} />} />
          <Route path='/schedule_new/' component={EventNew} />
          <Route path='/participations_history/' render={(props) => <EventList events={store.getEvents().historyEvents} />} />
        </Container>
      </Router>
    )
  }
}

const App = observer(AppComponent);
export default App;
