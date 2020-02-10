import React from 'react';
import { Accordion, List, Label, Segment, Image, Icon, Transition, Modal, Button, Header } from 'semantic-ui-react';
import store from './store';

export default class ParticipantsAccordion extends React.Component {
  state = { activeIndex: '',
            showFollowModal: false,
            clickedParticipant: ''
          }

  handleClickAccordion = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  handleClickParticipate = (eventID) => {
    store.manageUserOnEvent(eventID);
  }

  handleFollowModalOpen = (el) => this.setState({ showFollowModal: true, clickedParticipant: el });
  handleFollowModalClose = () => this.setState({ showFollowModal: false });
  handleFollowModalFollow = (toFollowID) => {
    store.addFollower(toFollowID);
    this.setState({ showFollowModal: false });
  };

  render() {
    const { activeIndex, showFollowModal, clickedParticipant } = this.state
    const { item } = this.props
    const { participants, id } = item;

    return (
      <Accordion>

      <Modal
        open={showFollowModal}
        onClose={this.handleFollowModalClose}
      >
        <Header icon='group' content={clickedParticipant.name} />
          <Modal.Content>
            <h3>Do you want to follow</h3>
          </Modal.Content>
        <Modal.Actions>
            <Button onClick={this.handleFollowModalClose} color='red' inverted animated='fade'>
              <Button.Content visible><Icon name='times' />No</Button.Content>
              <Button.Content hidden><Icon name='reply' />No</Button.Content>
            </Button>
            <Button color='green' onClick={() => this.handleFollowModalFollow(clickedParticipant.id)} inverted animated>
              <Button.Content visible><Icon name='checkmark' />Yes</Button.Content>
              <Button.Content hidden><Icon name='arrow right' />Yes</Button.Content>
            </Button>
        </Modal.Actions>
      </Modal>

        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClickAccordion}
        >
          <h3 style={{color:'#2185d0'}}><Icon name='dropdown' />Participants <Label color='blue' circular>{participants.length}</Label></h3>
        </Accordion.Title>
        <Accordion.Content  active={activeIndex === 0}>
            <Segment size='large' style={{marginBottom: '15px'}} >
              <Transition.Group as={List} animation='scale' duration={400} divided selection verticalAlign='middle' animated>
                {participants.length !== 0 ?
                  participants.map((el) => {
                  const {id, ...elProps} = el;

                  return(
                    <List.Item key={id} onClick={() => this.handleFollowModalOpen(el)}>

                      <Image avatar src={elProps.userPhoto} />
                      <List.Content>
                        <List.Header>{elProps.name}</List.Header>
                        {elProps.interestedThemes.map((theme)=>` ${theme}`).toString()}
                      </List.Content>
                    </List.Item>
                  )})
                  :
                    <List.Item onClick={() => this.handleClickParticipate(id)} header='There is no any participants yet. Wanna be first? 😉' />
                }
              </Transition.Group>
            </Segment>

        </Accordion.Content>
      </Accordion>
    )
  }

};
