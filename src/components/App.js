import React, { Component } from 'react';
//import './App.css';
//import styled from 'styled-components'
import {  Container } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import HeaderMenu from './menu'
import EventList from './eventList'
import EventNew from'./eventNew'
import store from './store';


class AppComponent extends Component {
  render() {
    const { user } = store;
    return (
      <Container fluid>
        <HeaderMenu userData={user} />
        <Container>
          <EventList />
        </Container>
        <EventNew />
      </Container>
    )
  }
}

const App = observer(AppComponent);
export default App;
