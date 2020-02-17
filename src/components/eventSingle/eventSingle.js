import React from "react";
import {
  Segment,
  Button,
  List,
  Transition,
  Responsive
} from "semantic-ui-react";
import { observer } from "mobx-react";

import store from "../../store";
import ModalToEditEvent from "../modalToEditEvent";
import ParticipantsAccordion from "../participantsAccordion";

class EventSingleComponent extends React.Component {
  state = { visible: true };

  handleOnWidthUpdate = (e, { width }) => this.setState({ width });

  handleClick = (eventId, user) => {
    if (store.manageUserOnEvent(eventId) === false) {
      this.setState(prevState => ({ visible: !prevState.visible }));
    }
  };

  deleteEventOnClick = eventId => {
    store.deleteEvent(eventId);
  };

  render() {
    const { visible, width } = this.state;
    const { item, isFuture } = this.props;
    const {
      placeName,
      placeAddress,
      eventDate,
      participants,
      id,
      eventCreator
    } = item;
    const { user } = store;
    const size = "large";
    const vertical = width < 478;

    return (
      <Segment secondary size={size}>
        {eventCreator !== user.id ? (
          ""
        ) : isFuture ? (
          <ModalToEditEvent eventID={id} />
        ) : (
          ""
        )}

        <List>
          <List.Item key="eventFieldID_1">
            <List.Header>
              <h3>{placeName}</h3>
            </List.Header>
          </List.Item>
          <List.Item key="eventFieldID_2">{placeAddress}</List.Item>
          <List.Item key="eventFieldID_3">
            {new Date(eventDate).toLocaleDateString()}
          </List.Item>
          <List.Item key="eventFieldID_4">
            <ParticipantsAccordion item={item} />
          </List.Item>

          <List.Item key="eventFieldID_5">
            <Transition animation="jiggle" duration={800} visible={visible}>
              <Responsive
                as={Button.Group}
                fireOnMount
                onUpdate={this.handleOnWidthUpdate}
                vertical={vertical}
              >
                {!isFuture ? (
                  ""
                ) : (
                  <Button
                    icon={
                      store.checkIfUserOnEvent(participants.map(p => p.id))
                        ? "user times"
                        : "user plus"
                    }
                    color={
                      store.checkIfUserOnEvent(participants.map(p => p.id))
                        ? "grey"
                        : "blue"
                    }
                    size="large"
                    onClick={() => {
                      this.handleClick(id, user);
                    }}
                    content={
                      store.checkIfUserOnEvent(participants.map(p => p.id))
                        ? "Leave this lunch"
                        : "Participate"
                    }
                  />
                )}
                {eventCreator !== user.id ? "" : isFuture ? <Button.Or /> : ""}
                {eventCreator === user.id ? (
                  <Button
                    icon="trash alternate"
                    style={{ backgroundColor: "#d55555", color: "white" }}
                    size="large"
                    onClick={() => {
                      this.deleteEventOnClick(id);
                    }}
                    content="Delete this lunch"
                  />
                ) : (
                  ""
                )}
              </Responsive>
            </Transition>
          </List.Item>
        </List>
      </Segment>
    );
  }
}

const EventSingle = observer(EventSingleComponent);
export default EventSingle;
