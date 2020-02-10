import React from 'react';
import { Modal,
          Button,
          Header,
          Icon, Label, Input } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import store from'./store'


class ModalToEditEventComponent extends React.Component {
  state =
    { open: false,
      placeName: store.events.filter(event => event.id === this.props.eventID)[0].placeName,
      eventDate: store.events.filter(event => event.id === this.props.eventID)[0].eventDate,
      placeAdress: store.events.filter(event => event.id === this.props.eventID)[0].placeAdress,
      placeNameError: false,
      eventDateError: false,
      placeAdressError: false,
    }

  handleModalOpen = () => this.setState({ open: true });
  handleModalClose = () => this.setState({ open: false });
  handleInputChange = (e, { name, value, error_name }) => this.setState({ [name]: value, [error_name]: false })
  handleEditEvent = (eventID) => {
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
      store.editEvent(eventID, this.state.placeName, this.state.placeAdress, this.state.eventDate )
      this.setState({ open: false })
    }
  }

  render() {
    const { eventID } = this.props;
    const { placeName, eventDate, placeAdress, placeNameError, eventDateError, placeAdressError } = this.state;

    return (
      <Modal
        trigger={<Label as='a' color='teal' ribbon onClick={this.handleModalOpen} icon='edit' content='Edit this lunch' />}
        open={this.state.open}
        onClose={this.handleModalClose}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        basic
        size='small'
      >
        <Header icon='pencil alternate' content='Edit this lunch event' />
          <Modal.Content>
            <h3>Edit name of the place</h3>
            <Input
              fluid
              placeholder={placeNameError ? placeNameError : ''}
              name='placeName'
              value={placeName}
              error={placeNameError ? true : false }
              error_name='placeNameError'
              onChange={this.handleInputChange}
            />
            <h3>Edit it's adress</h3>
            <Input
              fluid
              placeholder={placeAdressError ? placeAdressError : ''}
              name='placeAdress'
              value={placeAdress}
              error={placeAdressError ? true : false }
              error_name='placeAdressError'
              onChange={this.handleInputChange}
            />
            <h3>Edit date of this lunch</h3>
            <Input
              fluid
              type='date'
              name='eventDate'
              value={eventDate}
              error={eventDateError ? true : false }
              error_name='eventDateError'
              onChange={this.handleInputChange}
            />
          </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleModalClose} color='red' inverted animated='fade'>
            <Button.Content visible><Icon name='times' />Don't save changes</Button.Content>
            <Button.Content hidden><Icon name='reply' />Leave as it was</Button.Content>
          </Button>
          <Button color='green' onClick={() => this.handleEditEvent(eventID)} inverted animated>
            <Button.Content visible><Icon name='checkmark' /> Save changes</Button.Content>
            <Button.Content hidden><Icon name='arrow right' />Submit changes</Button.Content>
          </Button>

        </Modal.Actions>
      </Modal>
    )
  }
}

const ModalToEditEvent = observer(ModalToEditEventComponent);
export default ModalToEditEvent;
