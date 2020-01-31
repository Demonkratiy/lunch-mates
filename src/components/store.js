import { decorate, observable, action } from 'mobx';
import users from './mock/users';

class LunchEvent {
  constructor(id, placeName, placeAdress, date, participants) {
    this.id = id;
    this.placeName = placeName;
    this.placeAdress = placeAdress;
    this.date = date;
    this.participants = participants;
  }
}

class Store {
  user = {id: 88, name: 'Sir Lancelot', userPhoto: 'https://react.semantic-ui.com/images/avatar/small/matthew.png', interestedThemes: ['History','IT','Books','Scince']};
  events = [
    {id: 1, placeName: 'Genacvale', placeAdress: 'Kayum Nasiry st. 3', date: '08.02.2020', participants: [users[0],users[1],users[2],users[3],users[4],users[5]]},
    {id: 2, placeName: 'Krasty Krabs', placeAdress: 'Krabs st, building 5', date: '09.02.2020', participants: [users[6],users[7],users[1]]},
    {id: 3, placeName: 'Lovely Spoon', placeAdress: 'Moon Garden, building 1', date: '10.02.2020', participants: [users[1],users[5],users[6],users[8]]}
];

  addUserToEventById(eventId, user) {
    const idx = this.events.findIndex(item => item.id === eventId);
    const participantsID = this.events[idx].participants.map(p=>p.id);
    if (participantsID.filter(pID => pID === user.id).length > 0) {
      return false;
    } else {
      this.events[idx].participants.push(user);
      return true;
    }
  };

  getNewId(arr) {
    if (arr.length > 0) {
      return arr.reduce((a,b) => a.id > b.id ? a : b).id + 1
    } else {
      return 1
    }
  }

  addNewEvent(placeName, placeAdress, date) {
    const id = this.getNewId(this.events);
    const newEvent = new LunchEvent(id, placeName, placeAdress, date, new Array(this.user))
    console.log(newEvent)

    this.events.push(newEvent)
    console.log(this.events)
  }
}

decorate(Store, {
  user: observable,
  events: observable,
  addUserToEventById: action,
  addNewEvent: action,
});

const store = new Store();

export default store;