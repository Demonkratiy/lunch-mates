import React from 'react';
import store from './store';
import { observer } from 'mobx-react';
import {  Form,
          Segment,
          Button,
          Container,
          Header,
          Grid,
          Transition,
          Icon,
          Message, } from 'semantic-ui-react';


class EventNewComponent extends React.Component {
  state = {
    placeName: 'Test',
    eventDate: '',
    placeAdress: 'test',
    placeNameError: false,
    eventDateError: false,
    placeAdressError: false,
    visible: true,
    success: false,
  }

  handleChange = (e, { name, value, error_name }) => this.setState({ [name]: value, [error_name]: false })

  handleSubmit = (e) => {
    e.preventDefault();//прерывает отправку формы и следовательно не перезагружает страницу
    if (this.state.placeName === '' || this.state.eventDate === '' || this.state.placeAdress === '') {
      if (this.state.placeName === '') {
        this.setState({ placeNameError: 'Please enter the name of the place' })
      }
      if (this.state.eventDate === '') {
        this.setState({ eventDateError: 'Please enter the date of this lunch' })
      }
      if (this.state.placeAdress === '') {
        this.setState({ placeAdressError: 'Please enter the place adress' })
      }
      this.setState((prevState) => ({ visible: !prevState.visible }))
    } else {
      store.addNewEvent(this.state.placeName, this.state.placeAdress, this.state.eventDate);
      this.setState({ placeName: '', eventDate: '', placeAdress: '', success: true});
      setTimeout(() => this.setState({success: false}), 4000);
    }
  }

  render() {
    const { placeName, eventDate, placeAdress, placeNameError, eventDateError, placeAdressError, visible, success } = this.state;
    return(
      <Container>
        <Segment onClick={()=>this.setState({success: false})} secondary>
          <Header style={{paddingTop: '20px', color: '#2185d0'}} as='h3' icon='food' content='Create a new event' subheader='With great lunch mates ;)'/>
          <Container style={{padding: '10px 40px 20px 40px'}}>
          <Form onSubmit={this.handleSubmit} success={success}>
          <Message
    success
    header='Lunch event created successfully!'
    content='Soon great mates will join you there! ;)'
  />
            <Form.Group>
              <Form.Input
                error={placeNameError}
                error_name='placeNameError'
                label='Place'
                placeholder='Name of the place'
                width={10}
                name='placeName'
                value={placeName}
                onChange={this.handleChange} />
              <Form.Input
                /*style={{onFocus:'this.type="date"' onBlur:'this.type="text"'}}*/
                error={eventDateError}
                error_name='eventDateError'
                type='date'
                label='Date'
                placeholder='dd-mm-yyyy'
                width={6}
                name='eventDate'
                value={eventDate}
                onChange={this.handleChange} />
            </Form.Group>
            <Form.Input
              error={placeAdressError}
              error_name='placeAdressError'
              label='Adress'
              placeholder='Adress of the place you want to visit'
              width={16}
              name='placeAdress'
              value={placeAdress}
              onChange={this.handleChange} />
            <Grid>
              <Grid.Column textAlign="center" style={{paddingTop: '40px'}}>
              <Transition
                  animation='shake'
                  duration={500}
                  visible={visible}
              >
                  <Button animated='vertical' type='submit' color='blue' size='large'>
                    <Button.Content visible>Schedule this lunch event</Button.Content>
                    <Button.Content hidden>
                      <Icon name='calendar check' />
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
    )
  }
}


const EventNew = observer(EventNewComponent);
export default EventNew;
