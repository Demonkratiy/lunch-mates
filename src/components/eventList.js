import React from 'react'
import EventSingle from './eventSingle'
import { List, Container } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import store from './store';
import { toJS } from 'mobx'

class EventListComponent extends React.Component{
  render() {
    const { events } = this.props;
    return(
      <Container>
        <List>
          {events.map((item) => {
            const { id } = item;
            return(
              <List.Item key={id}>
                <EventSingle item={item}/>
              </List.Item>
            );
          })}
        </List>
      </Container>
    )
  }
}

const EventList = observer(EventListComponent);
export default EventList;
