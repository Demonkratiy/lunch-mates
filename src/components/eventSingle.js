import React from 'react'
import { Segment, Label, Button, List, Image, Transition } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import store from './store';
//import styled from 'styled-components'


class EventSingleComponent extends React.Component {
  state = { visible: true }

  handleClick = (eventId, user) => {
    if (store.addUserToEventById(eventId, user) === false){
      this.setState((prevState) => ({ visible: !prevState.visible }))
    };

  };

  render() {
    const { visible } = this.state
    const { item } = this.props;
    const { placeName, placeAdress, date, participants, id } = item;
    const { user } = store;
    const size = 'large';
    return (
      <Segment secondary size={size}>
        <List>
          <List.Item key='eventFieldID_1'><List.Header><h3>{placeName}</h3></List.Header></List.Item>
          <List.Item key='eventFieldID_2'>{placeAdress}</List.Item>
          <List.Item key='eventFieldID_3'>{date}</List.Item>
          <List.Item key='eventFieldID_4'><h3 style={{color:'#2185d0'}}>Participants <Label color='blue' circular>{participants.length}</Label></h3></List.Item>
            {participants.length !==0 ?
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
                animation='shake'
                duration={500}
                visible={visible}
            >
            <Button
              color='blue'
              size='large'
              onClick={() => {
                this.handleClick(id, user)
              }}
            >
              Participate
            </Button>
            </Transition>
          </List.Item>
        </List>
      </Segment>
    )
  }
}

const EventSingle = observer(EventSingleComponent);
export default EventSingle;