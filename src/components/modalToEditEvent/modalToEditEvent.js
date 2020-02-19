import React from "react";
import { Modal, Button, Header, Icon, Label, Form } from "semantic-ui-react";
import { observer } from "mobx-react";
import store from "../../store";

class ModalToEditEventComponent extends React.Component {
  state = {
    open: false,
    placeName: store.events.filter(event => event.id === this.props.eventID)[0]
      .placeName,
    eventDate: store.events.filter(event => event.id === this.props.eventID)[0]
      .eventDate,
    placeAddress: store.events.filter(
      event => event.id === this.props.eventID
    )[0].placeAddress,
    placeNameError: false,
    eventDateError: false,
    placeAddressError: false
  };

  handleModalOpen = () => this.setState({ open: true });
  handleModalClose = () => this.setState({ open: false });
  handleInputChange = (e, { name, value, error_name }) =>
    this.setState({ [name]: value, [error_name]: false });
  handleEditEvent = eventID => {
    if (
      this.state.placeName === "" ||
      this.state.eventDate === "" ||
      this.state.placeAddress === ""
    ) {
      if (this.state.placeName === "") {
        this.setState({ placeNameError: "Please enter the name of the place" });
      }
      if (this.state.eventDate === "") {
        this.setState({
          eventDateError: "Please enter the date of this lunch"
        });
      }
      if (this.state.placeAddress === "") {
        this.setState({ placeAddressError: "Please enter the place Address" });
      }
      this.setState(prevState => ({ visible: !prevState.visible }));
    } else {
      store.editEvent(
        eventID,
        this.state.placeName,
        this.state.placeAddress,
        this.state.eventDate
      );
      this.setState({ open: false });
    }
  };

  render() {
    const { eventID } = this.props;
    const {
      placeName,
      eventDate,
      placeAddress,
      placeNameError,
      eventDateError,
      placeAddressError
    } = this.state;

    return (
      <Modal
        trigger={
          <Label
            style={{ left: "-30px" }}
            as="a"
            color="teal"
            ribbon
            onClick={this.handleModalOpen}
            icon="edit"
            content="Edit this lunch"
          />
        }
        open={this.state.open}
        onClose={this.handleModalClose}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        basic
        size="small"
      >
        <Header icon="pencil alternate" content="Edit this lunch event" />
        <Modal.Content>
          <h3>Edit name of the place</h3>
          <Form>
            <Form.Input
              fluid
              placeholder={placeNameError ? placeNameError : ""}
              name="placeName"
              value={placeName}
              error={placeNameError ? true : false}
              error_name="placeNameError"
              onChange={this.handleInputChange}
            />
            <h3>Edit it's Address</h3>
            <Form.Input
              fluid
              placeholder={placeAddressError ? placeAddressError : ""}
              name="placeAddress"
              value={placeAddress}
              error={placeAddressError ? true : false}
              error_name="placeAddressError"
              onChange={this.handleInputChange}
            />
            <h3>Edit date of this lunch</h3>
            <Form.Input
              fluid
              type="date"
              name="eventDate"
              value={eventDate}
              error={eventDateError ? true : false}
              error_name="eventDateError"
              onChange={this.handleInputChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={this.handleModalClose}
            color="red"
            inverted
            animated="fade"
          >
            <Button.Content visible>
              <Icon name="times" />
              Don't save changes
            </Button.Content>
            <Button.Content hidden>
              <Icon name="reply" />
              Leave as it was
            </Button.Content>
          </Button>
          <Button
            color="green"
            onClick={() => this.handleEditEvent(eventID)}
            inverted
            animated
          >
            <Button.Content visible>
              <Icon name="checkmark" /> Save changes
            </Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
              Submit changes
            </Button.Content>
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const ModalToEditEvent = observer(ModalToEditEventComponent);
export default ModalToEditEvent;
