import React, { Component } from 'react';
//import './App.css';
import styled from 'styled-components'
import {  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment, } from 'semantic-ui-react'
import HeaderMenu from './menu'
import EventSingle from './eventSingle'


export default class App extends Component {
  state = {
    data: [
      {id: 1, placeName: 'Ginacvalle', placeAdress: 'Kayum Nasiry st., building 3', date: '08.02.2020', participants: [{id: 1, name:'Sir Artur'},{id: 2, name:'Princess Aurora'},{id: 3, name:'Mr. Smith'}]},
      {id: 2, placeName: 'Ginacvalle', placeAdress: 'Kayum Nasiry st., building 3', date: '08.02.2020', participants: [{id: 1, name:'Sir Artur'},{id: 2, name:'Princess Aurora'}]},
      {id: 3, placeName: 'Ginacvalle', placeAdress: 'Kayum Nasiry st., building 3', date: '08.02.2020', participants: [{id: 1, name:'Princess Aurora'}]},
    ],
  };


  render() {
    return (
      <Container fluid>
        <HeaderMenu />
        <Container>
          <EventSingle/>
        </Container>
      </Container>
    )
  }

}
