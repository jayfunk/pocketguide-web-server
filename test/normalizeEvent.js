import test from 'ava'
import normalizeEvent from '../lib/normalizeEvent'

test((t) => {
  const actual = normalizeEvent({
    Timestamp: '4/8/2016 17:28:11',
    'Event Name': 'D20 Adventuring',
    'Event Description': 'Come for a silly adventure as our fates are controlled by a giant inflatable D20 as master minded by a Wagon Drunk Christine. ',
    'Date of Event': '4/29/2016',
    'Start Time': '5:11:00 PM',
    'End Time': '7:11:00 PM',
    'Location?  ': 'Margaritaville: D20',
    'Theme Camp Name (if this is being run by a theme camp)': 'Margaritaville:D20',
    'Intended Ages?': 'All Ages',
    'What type of event is this?': 'Adventure',
    'Location Latitude?': '33°22\'40.8"N',
    'Location Longitude?': '83°20\'24.0"W',
    'Who are you?': 'Wagon Drunk',
    'What\'s your email?': 'redacted@gmail.com'
  })

  const expected = {
    timestamp: '4/8/2016 17:28:11',
    eventName: 'D20 Adventuring',
    eventDescription: 'Come for a silly adventure as our fates are controlled by a giant inflatable D20 as master minded by a Wagon Drunk Christine. ',
    dateOfEvent: '4/29/2016',
    startTime: '5:11:00 PM',
    endTime: '7:11:00 PM',
    location: 'Margaritaville: D20',
    themeCampName: 'Margaritaville:D20',
    intendedAges: 'All Ages',
    whatTypeOfEventIsThis: 'Adventure',
    locationLatitude: '33°22\'40.8"N',
    locationLongitude: '83°20\'24.0"W',
    whoAreYou: 'Wagon Drunk',
    whatsYourEmail: 'redacted@gmail.com'
  }

  t.deepEqual(actual, expected)
})
