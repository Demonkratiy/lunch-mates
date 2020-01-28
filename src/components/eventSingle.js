import React from 'react'
import { Segment, Label, Button, List } from 'semantic-ui-react'
//import styled from 'styled-components'

export default class EventSingle extends React.Component {

  handleClick = () => console.log(this.props.userData.userName)

  render() {
    const { placeName, placeAdress, date, participants } = this.props;
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
                <List animated bulleted>
                  {participants.map((el) => {
                    const {id, ...elProps} = el;
                    return(
                      <List.Item key={id}>{elProps.name}</List.Item>
                    )
                  })}
                </List>
              </Segment>
            : ''}
          <List.Item key='eventFieldID_5'><Button color='blue' size='large' onClick={this.handleClick}>Participate</Button></List.Item>
        </List>
      </Segment>
    )
  }
}
