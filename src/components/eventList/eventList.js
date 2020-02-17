import React from "react";
import { List, Container } from "semantic-ui-react";
import { observer } from "mobx-react";

import EventSingle from "../eventSingle";
import store from "../../store";

class EventListComponent extends React.Component {
  render() {
    const isFuture = this.props.match.path.includes("view");
    const { futureEvents, historyEvents } = store.getEvents;
    const events = isFuture ? futureEvents : historyEvents;
    return (
      <Container>
        <List>
          {events.map(item => {
            const { id } = item;
            return (
              <List.Item key={id}>
                <EventSingle item={item} isFuture={isFuture} />
              </List.Item>
            );
          })}
        </List>
      </Container>
    );
  }
}

const EventList = observer(EventListComponent);
export default EventList;
