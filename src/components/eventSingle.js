import React from 'react'
import { Segment, Label, Button, List, Image, Transition, Input } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import store from './store';
import ModalToEditEvent from './modalToEditEvent'
//import styled from 'styled-components'


class EventSingleComponent extends React.Component {
  state = { visible: true }

  handleClick = (eventId, user) => {
    if (store.manageUserOnEvent(eventId) === false){
      this.setState((prevState) => ({ visible: !prevState.visible }))
    };
  };

  deleteEventOnClick = (eventId) => {
    store.deleteEvent(eventId);
    store.getEvents();
  };

  render() {
    const { visible } = this.state
    const { item } = this.props;
    const { placeName, placeAdress, eventDate, participants, id, eventCreator } = item;
    const { user } = store;
    const size = 'large';

    return (
      <Segment secondary size={size}>
        {eventCreator === user.id ? <ModalToEditEvent eventID={id}/> : '' }


        <List>
          <List.Item key='eventFieldID_1'><List.Header><h3>{placeName}</h3></List.Header></List.Item>

          <List.Item key='eventFieldID_2'>{placeAdress}</List.Item>
          <List.Item key='eventFieldID_3'>{new Date(eventDate).toLocaleDateString()}</List.Item>
          <List.Item key='eventFieldID_4'><h3 style={{color:'#2185d0'}}>Participants <Label color='blue' circular>{participants.length}</Label></h3></List.Item>
            {participants.length !== 0 ?
              <Segment size={size}>
                <List divided selection verticalAlign='middle' animated>
                  {participants.map((el) => {
                    const {id, ...elProps} = el;
                    return(
                      <List.Item key={id}>
                        <Image avatar src={elProps.userPhoto} />
                        <List.Content>
                          <List.Header>{elProps.name}</List.Header>
                          {elProps.interestedThemes.map((theme)=>` ${theme}`).toString()}
                        </List.Content>
                      </List.Item>
                    )
                  })}
                </List>
              </Segment>
            : ''}
          <List.Item key='eventFieldID_5'>
            <Transition
                animation='jiggle'
                duration={800}
                visible={visible}
            >
            <Button.Group>
            <Button
              icon={store.checkIfUserOnEvent(participants.map(p=>p.id)) ? 'user times' : 'user plus' }
              color={store.checkIfUserOnEvent(participants.map(p=>p.id)) ? 'grey' : 'blue' }
              size='large'
              onClick={() => {
                this.handleClick(id, user)
              }}
              content={store.checkIfUserOnEvent(participants.map(p=>p.id)) ? 'Leave this lunch' : 'Participate' }
            />
            {eventCreator === user.id ?
              <Button.Or /> : ''}
            {eventCreator === user.id ?
              <Button
              icon='trash alternate'
                color='google plus'
                size='large'
                onClick={() => {
                  this.deleteEventOnClick(id)
                }}
                content='Delete this lunch'
              />
            : ''}
             </Button.Group>
             </Transition>
          </List.Item>
        </List>
      </Segment>
    )
  }
}

const EventSingle = observer(EventSingleComponent);
export default EventSingle;
