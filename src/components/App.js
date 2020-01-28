import React, { Component } from 'react';
//import './App.css';
//import styled from 'styled-components'
import {  Container } from 'semantic-ui-react'
import HeaderMenu from './menu'
import EventList from './eventList'


export default class App extends Component {
  state = {
    userData: {userName: 'Sir Lancelot', userPhoto: 'https://react.semantic-ui.com/images/avatar/small/matthew.png'},
    eventData: [
      {id: 1, placeName: 'Genacvale', placeAdress: 'Kayum Nasiry st. 3', date: '08.02.2020', participants: [{id: 1, name:'Sir Artur'},{id: 2, name:'Princess Aurora'},{id: 3, name:'Mr. Smith'}]},
      {id: 2, placeName: 'Krasty Krabs', placeAdress: 'Krabs st, building 5', date: '09.02.2020', participants: []},
      {id: 3, placeName: 'Lovely Spoon', placeAdress: 'Moon Garden, building 1', date: '10.02.2020', participants: [{id: 1, name:'Princess Aurora'}]},
    ],
  };

  render() {
    const { userData, eventData } = this.state;

    return (
      <Container fluid>
        <HeaderMenu userData={userData} />
        <Container>
          <EventList eventData={eventData} userData={userData}/>
        </Container>
      </Container>
    )
  }

}
