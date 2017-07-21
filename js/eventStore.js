import postal from 'postal/lib/postal.lodash'
import Storage from './storage'

let instance = null;

export default class EventStore {  
    constructor(events) {
        if(!instance){
            instance = this;
        }

        this.events = events;

        return instance;
    }

    add(events, newEvents) {
        let allEvents = events.concat(newEvents);

        Storage.set(allEvents);

        this.events = events.concat(newEvents);

        for(let event in newEvents) {
            if(newEvents.hasOwnProperty(event)) {
                postal.publish(newEvents[event]);
            }
        }
    }
}

module.exports = EventStore;