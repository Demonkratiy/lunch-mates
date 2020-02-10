import { decorate, observable, action, computed, toJS } from 'mobx';
import users from './mock/users';

class LunchEvent {
  constructor(id, placeName, placeAdress, eventDate, participants) {
    this.id = id;
    this.placeName = placeName;
    this.placeAdress = placeAdress;
    this.eventDate = eventDate;
    this.participants = participants;
  }
}

class Store {
  user = {id: 88, name: 'Sir Lancelot', userPhoto: 'https://react.semantic-ui.com/images/avatar/small/matthew.png', interestedThemes: ['History','IT','Books','Scince']};
  users = users;
  events = [
    {id: 1, eventCreator: this.users[0].id, placeName: 'Genacvale', placeAdress: 'Kayum Nasiry st. 3', eventDate: '2020-02-28', participants: [this.users[0],this.users[1],this.users[2],this.users[3],this.users[4],this.users[5]]},
    {id: 2, eventCreator: this.users[6].id, placeName: 'Krasty Krabs', placeAdress: 'Krabs st, building 5', eventDate: '2020-01-24', participants: [this.users[6],this.users[7],this.users[1]]},
    {id: 3, eventCreator: this.users[1].id, placeName: 'Lovely Spoon', placeAdress: 'Moon Garden, building 1', eventDate: '2020-02-24', participants: [this.users[1],this.users[5],this.users[6],this.users[8]]},
    {id: 4, eventCreator: this.users[9].id, placeName: 'Krasty Krabs', placeAdress: 'Krabs st, building 5', eventDate: '2020-04-01', participants: [this.users[9],this.users[1],this.users[5],this.users[6]]},
    {id: 5, eventCreator: this.users[9].id, placeName: 'Michelin star - Created by Me', placeAdress: 'Krabs st, building 5', eventDate: '2020-02-01', participants: [this.users[9],this.users[1],this.users[5],this.users[6]]},
    {id: 6, eventCreator: this.users[5].id, placeName: 'Michelin star - Created by Someone else', placeAdress: 'Krabs st, building 5', eventDate: '2020-02-01', participants: [this.users[9],this.users[1],this.users[5],this.users[6]]},
    {id: 7, eventCreator: this.users[9].id, placeName: 'Michelin Red Star', placeAdress: 'Krabs st, building 5', eventDate: '2020-02-11', participants: []},
  ];

  menuState = {
    activeItem: 'view',
  };

  setMenuStateActiveItem(name) {
    this.menuState.activeItem = name
  }

  addFollower(toFollowID) {
    const idx = this.users.findIndex(user => user.id === toFollowID);

    this.users[idx].followers.push(this.user);
    console.log(this.users[idx].followers)
  }

  get getEvents(){
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth()+1;
    const d = now.getDate();
    const nowString = y+'-'+m+'-'+d;
    const sortedByDate = this.events.slice().sort((a,b) => {
      if (new Date(a.eventDate) > new Date(b.eventDate)) {
        return 1;
      }
      if (new Date(a.eventDate) < new Date(b.eventDate)) {
        return -1;
      }
      return 0;
    })
    const futureEvents = sortedByDate.filter(event => new Date(event.eventDate).getTime() >= new Date(nowString).getTime());
    const historyEvents = sortedByDate.filter(event => new Date(event.eventDate).getTime() < new Date(nowString).getTime() && event.participants.find(p => p.id === this.user.id));
    return {
        futureEvents: futureEvents,
        historyEvents: historyEvents,
    }

  }

  getNewId(arr) {
    if (arr.length > 0) {
      return arr.reduce((a,b) => a.id > b.id ? a : b).id + 1
    } else {
      return 1
    }
  };

  checkIfUserOnEvent(participantsID){
    return participantsID.find(pID => pID === this.user.id);
  };

  manageUserOnEvent(eventId) {
    const idx = this.events.findIndex(item => item.id === eventId);
    const participantsID = this.events[idx].participants.map(p=>p.id);
    if (this.checkIfUserOnEvent(participantsID)) {
      this.events[idx].participants = this.events[idx].participants.filter(p => p.id !== this.user.id);
      //this.events[idx].participants.pop();
      return false;
    } else {
      //this.events[idx].participants = [this.events[idx].participants, this.user];
      this.events[idx].participants.push(this.user);
      return true;
    }
  };

  addNewEvent(placeName, placeAdress, eventDate) {
    const id = this.getNewId(this.events);
    this.events.push({id: id, eventCreator: this.user.id, placeName: placeName, placeAdress: placeAdress, eventDate: eventDate, participants: [this.user]})

    // const id = this.getNewId(this.events);
    // const newEvent = new LunchEvent(id, placeName, placeAdress, eventDate, [this.user])
    // console.log(newEvent)
    //
    // this.events.push(newEvent)
    // console.log(this.events)
  };

  editEvent(eventID, placeName, placeAdress, eventDate) {
    const idx = this.events.findIndex(event => event.id === eventID);
    this.events[idx].placeName = placeName;
    this.events[idx].placeAdress = placeAdress;
    this.events[idx].eventDate = eventDate;
  }

  deleteEvent(eventId) {
    const idForFiltering = eventId//no idea why I can't assign "eventId" directly inside of the filter
    this.events = this.events.filter(event => event.id !== idForFiltering);
  };

}

decorate(Store, {
  user: observable,
  events: observable,
  menuState: observable,
  manageUserOnEvent: action,
  addNewEvent: action,
  editEvent: action,
  deleteEvent: action,
  getEvents: computed,
  setMenuActiveTab: action,
  addFollower: action
});

const store = new Store();

export default store;
