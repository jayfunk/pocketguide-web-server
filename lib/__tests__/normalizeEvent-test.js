import normalizeEvent from '../normalizeEvent'

it('normalizeEvent', () => {
  const actual = normalizeEvent({
    id: 'Event-1',
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
    id: 'Event-1',
    latitude: null,
    longitude: null,
    coordinates: null,
    hasCoordinates: false,
    name: 'D20 Adventuring',
    description: 'Come for a silly adventure as our fates are controlled by a giant inflatable D20 as master minded by a Wagon Drunk Christine.',
    shortDescription: 'Come for a silly adventure as our fates are controlled by a giant infl...',
    dateOfEvent: '4/29/2016',
    startTime: '5:11:00 PM',
    endTime: '7:11:00 PM',
    location: 'Margaritaville: D20',
    themeCampName: 'Margaritaville:D20',
    intendedAges: 'All Ages'
  }

  expect(actual).toEqual(expected)
})
