import React from "react";
import store from "../../store";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import {
  Form,
  Segment,
  Button,
  Container,
  Header,
  Grid,
  Transition,
  Icon,
  Message
} from "semantic-ui-react";

class EventNewComponent extends React.Component {
  state = {
    placeName: "",
    eventDate: "",
    placeAddress: "",
    placeNameError: false,
    eventDateError: false,
    placeAddressError: false,
    visible: true,
    success: false,
    newEventCreated: false,
    dateInputState: "text"
  };

  handleChange = (e, { name, value, error_name }) =>
    this.setState({ [name]: value, [error_name]: false });

  handleSubmit = e => {
    e.preventDefault(); //прерывает отправку формы и следовательно не перезагружает страницу
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
      store.addNewEvent(
        this.state.placeName,
        this.state.placeAddress,
        this.state.eventDate
      );
      this.setState({
        placeName: "",
        eventDate: "",
        placeAddress: "",
        success: true,
        newEventCreated: true
      });
      this.notificationTimeout = setTimeout(
        () => this.setState({ success: false }),
        4000
      );
    }
  };

  componentWillUnmount() {
    clearTimeout(this.notificationTimeout);
  }

  render() {
    const {
      placeName,
      eventDate,
      placeAddress,
      placeNameError,
      eventDateError,
      placeAddressError,
      visible,
      success,
      newEventCreated,
      dateInputState
    } = this.state;

    return (
      <Container>
        <Segment onClick={() => this.setState({ success: false })} secondary>
          <Header
            style={{ paddingTop: "20px", color: "#2185d0" }}
            as="h3"
            icon="food"
            content="Create a new event"
            subheader="With great lunch mates ;)"
          />
          <Container style={{ padding: "10px 40px 20px 40px" }}>
            <Form onSubmit={this.handleSubmit} success={success}>
              <Message
                success
                header="Lunch event created successfully!"
                content="Soon great mates will join you there! ;)"
              />
              <Form.Group>
                <Form.Input
                  error={placeNameError}
                  error_name="placeNameError"
                  label="Place"
                  placeholder="Name of the place"
                  width={12}
                  name="placeName"
                  value={placeName}
                  onChange={this.handleChange}
                />
                <Form.Input
                  error={eventDateError}
                  error_name="eventDateError"
                  type={dateInputState}
                  onFocus={() => this.setState({ dateInputState: "date" })}
                  onBlur={() => this.setState({ dateInputState: "text" })}
                  label="Date"
                  placeholder="Desired lunch date"
                  width={4}
                  name="eventDate"
                  value={eventDate}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Input
                error={placeAddressError}
                error_name="placeAddressError"
                label="Address"
                placeholder="Address of the place you want to visit"
                width={16}
                name="placeAddress"
                value={placeAddress}
                onChange={this.handleChange}
              />
              <Grid>
                <Grid.Column textAlign="center" style={{ paddingTop: "40px" }}>
                  {newEventCreated ? (
                    <Button
                      as={Link}
                      to="/view"
                      onClick={() => store.setMenuStateActiveItem("view")}
                      animated
                      color="teal"
                      size="large"
                    >
                      <Button.Content visible>
                        Go to lunch events view
                      </Button.Content>
                      <Button.Content hidden>
                        <Icon name="eye" />
                        View events
                      </Button.Content>
                    </Button>
                  ) : (
                    ""
                  )}
                  <Transition
                    animation="shake"
                    duration={500}
                    visible={visible}
                  >
                    <Button
                      animated="vertical"
                      type="submit"
                      color="blue"
                      size="large"
                    >
                      <Button.Content visible>
                        Schedule new lunch event
                      </Button.Content>
                      <Button.Content hidden>
                        <Icon name="calendar check" />
                        Submit
                      </Button.Content>
                    </Button>
                  </Transition>
                </Grid.Column>
              </Grid>
            </Form>
          </Container>
        </Segment>
      </Container>
    );
  }
}

const EventNew = observer(EventNewComponent);
export default EventNew;
