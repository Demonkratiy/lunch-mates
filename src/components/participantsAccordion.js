import React from 'react'
import { Accordion, List, Label, Segment, Image, Icon } from 'semantic-ui-react'


export default class ParticipantsAccordion extends React.Component {
  state = { activeIndex: '' }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
    const { item } = this.props
    const { placeName, placeAdress, eventDate, participants, id, eventCreator } = item;

    return (
      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}

        >
          <h3 style={{color:'#2185d0'}}><Icon name='dropdown' />Participants <Label color='blue' circular>{participants.length}</Label></h3>
        </Accordion.Title>
        <Accordion.Content  active={activeIndex === 0}>
          {participants.length !== 0 ?
            <Segment size='large' style={{marginBottom: '15px'}} >
              <List divided selection verticalAlign='middle' animated>
                {participants.map((el) => {
                  const {id, ...elProps} = el;
                  return(
                    <List.Item key={id} onClick={() => alert('Hi '+elProps.name)}>
                      <Image avatar src={elProps.userPhoto} />
                      <List.Content>
                        <List.Header>{elProps.name}</List.Header>
                        {elProps.interestedThemes.map((theme)=>` ${theme}`).toString()}
                      </List.Content>
                    </List.Item>
                  )
                })}
              </List>
            </Segment>
          :
            <Segment size='large' style={{marginBottom: '15px'}} content='There is no any participants yet. Wanna be first? 😉' />}
        </Accordion.Content>
      </Accordion>
    )
  }

}
