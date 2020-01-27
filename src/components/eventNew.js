import React from 'react'
import {  Container,
  Segment, Label, Button, List } from 'semantic-ui-react'
//import styled from 'styled-components'

export default function EventSingle() {
  return (
    <Segment secondary>
      <List>
        <List.Item><List.Header><h3>Name of the place</h3></List.Header></List.Item>
        <List.Item>Adress</List.Item>
        <List.Item>Date</List.Item>
        <List.Item><h3 style={{color:'#2185d0'}}>Participants <Label color='blue' circular>18</Label></h3></List.Item>
        <List.Item><Button color='blue'>Participate</Button></List.Item>
      </List>
    </Segment>
  )
}
