import React from 'react'
import EventSingle from './eventSingle'
import { List } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import { toJS } from 'mobx'

const EventListComponent = ({eventData, userData}) => {
  console.log(toJS(eventData))
  return (
    <List>
      <List.Item></List.Item>
      {eventData.map((item) => {
        const { id } = item;

        return(
          <List.Item key={id}>
            <EventSingle item={item} userData={userData}/>
          </List.Item>
        );
      })}
    </List>
  )
}

const EventList = observer(EventListComponent);
export default EventList;
