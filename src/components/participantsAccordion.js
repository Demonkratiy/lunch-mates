import React from 'react'
import { Accordion, List, Label, Segment, Image, Icon, Transition } from 'semantic-ui-react'
import store from './store';

export default class ParticipantsAccordion extends React.Component {
  state = { activeIndex: '' }

  handleClickAccordion = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  handleClickParticipate = (eventID) => {
    store.manageUserOnEvent(eventID)
  }

  render() {
    const { activeIndex } = this.state
    const { item } = this.props
    const { participants, id } = item;

    return (
      <Accordion>
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
                    <List.Item key={id} onClick={() => alert('Hi '+elProps.name)}>
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

}
