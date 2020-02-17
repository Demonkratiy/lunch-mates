import React from "react";
import {
  Accordion,
  List,
  Label,
  Segment,
  Image,
  Icon,
  Transition,
  Modal,
  Button,
  Header,
  Card
} from "semantic-ui-react";
import store from "../../store";

export default class ParticipantsAccordion extends React.Component {
  state = {
    activeIndex: "",
    showFollowModal: false,
    clickedParticipant: ""
  };

  handleClickAccordion = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handleClickParticipate = eventID => {
    store.manageUserOnEvent(eventID);
  };

  handleFollowModalOpen = el =>
    this.setState({ showFollowModal: true, clickedParticipant: el });
  handleFollowModalClose = toFollowID =>
    this.setState({ showFollowModal: false });
  handleFollowModalUnfollow = toFollowID => {
    store.removeFollower(toFollowID);
    this.setState({ showFollowModal: false });
  };
  handleFollowModalFollow = toFollowID => {
    store.addFollower(toFollowID);
    this.setState({ showFollowModal: false });
  };

  render() {
    const { activeIndex, showFollowModal, clickedParticipant } = this.state;
    const { item } = this.props;
    const { participants, id } = item;

    return (
      <Accordion>
        <Modal
          open={showFollowModal}
          onClose={this.handleFollowModalClose}
          basic
          size="mini"
          dimmer="blurring"
        >
          <Header
            icon="group"
            content={
              store.user.id === clickedParticipant.id
                ? "Isn't this mate is awesome? ;)"
                : "Do you want to follow this mate?"
            }
          />
          <Modal.Content>
            <Card centered>
              <Image src={clickedParticipant.userPhotoLarge} />
              <Card.Content>
                <Card.Header>{clickedParticipant.name}</Card.Header>
                <Card.Meta>
                  <span>
                    Joined in{" "}
                    {clickedParticipant ? clickedParticipant.bio.joined : ""}
                  </span>
                </Card.Meta>
                <Card.Description>
                  <span>
                    {clickedParticipant ? clickedParticipant.bio.story : ""}
                  </span>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Icon name="user" />
                <span>
                  {clickedParticipant
                    ? clickedParticipant.followers.length
                    : "?"}{" "}
                  Followers
                </span>
              </Card.Content>
            </Card>
          </Modal.Content>
          {store.user.id === clickedParticipant.id ? (
            ""
          ) : (
            <Modal.Actions>
              <Button
                onClick={() =>
                  this.handleFollowModalUnfollow(clickedParticipant.id)
                }
                color="red"
                inverted
                icon="times"
                content="No"
              />
              <Button
                color="green"
                onClick={() =>
                  this.handleFollowModalFollow(clickedParticipant.id)
                }
                inverted
                icon="checkmark"
                content="Yes"
              />
            </Modal.Actions>
          )}
        </Modal>

        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClickAccordion}
        >
          <h3 style={{ color: "#2185d0" }}>
            <Icon name="dropdown" />
            Participants{" "}
            <Label color="blue" circular>
              {participants.length}
            </Label>
          </h3>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Segment size="large" style={{ marginBottom: "15px" }}>
            <Transition.Group
              as={List}
              animation="scale"
              duration={400}
              divided
              selection
              verticalAlign="middle"
              animated
            >
              {participants.length !== 0 ? (
                participants.map(el => {
                  const { id, ...elProps } = el;
                  return (
                    <List.Item
                      key={id}
                      onClick={() => this.handleFollowModalOpen(el)}
                    >
                      <Image avatar src={elProps.userPhoto} />
                      <List.Content>
                        <List.Header>{elProps.name}</List.Header>
                        {elProps.interestedThemes
                          .map(theme => ` ${theme}`)
                          .toString()}
                      </List.Content>
                    </List.Item>
                  );
                })
              ) : (
                <List.Item
                  onClick={() => this.handleClickParticipate(id)}
                  header="There is no any participants yet. Wanna be first? 😉"
                />
              )}
            </Transition.Group>
          </Segment>
        </Accordion.Content>
      </Accordion>
    );
  }
}
