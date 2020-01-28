import React from 'react'
import EventSingle from './eventSingle'
import { List } from 'semantic-ui-react'


const EventList = ({eventData, userData}) => {
  const elements = eventData.map((item) => {

    const {id, ...itemProps} = item;

    return(
      <List.Item key={id}>
        <EventSingle { ...itemProps } userData={userData}/>
      </List.Item>
    );
  });

  return (
    <List>
      <List.Item></List.Item>
      {elements}
    </List>
  )
}

export default EventList;
