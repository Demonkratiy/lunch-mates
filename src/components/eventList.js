import React from 'react'
import EventSingle from './eventSingle'
import { List } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import store from './store';
import { toJS } from 'mobx'

class EventListComponent extends React.Component{
  render() {
    const { events } = store;
    return(
      <List style={{paddingTop: '65px'}}>
        {events.map((item) => {
          const { id } = item;
          return(
            <List.Item key={id}>
              <EventSingle item={item}/>
            </List.Item>
          );
        })}
      </List>
    )
  }
}

const EventList = observer(EventListComponent);
export default EventList;
