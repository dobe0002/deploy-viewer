export default [
  {
    appCode: 'CAP',
    title: 'Cap',
    appGroup: 'STU',
    appGroupTitle: 'Student',
    status: [
      {
        // date: new Date(2019, 11, 1),
        date: new Date('2019-12-01T06:00:00.000Z'),
        dateString: '12/01/2019',
        dateSort: 20191201,
        note: 'Users could not log in',
        row: 10,
        status: 'C',
        statusDescription: 'Deployment with Customer Impact'
      },
      {
        // date: new Date(2019, 11, 1),
        date: new Date('2019-12-01T06:00:00.000Z'),
        dateString: '12/01/2019',
        dateSort: 20191201,
        note: 'Fixed issues from the morning deployment',
        row: 11,
        status: 'G',
        statusDescription: 'Good deployment'
      },
      {
        // date: new Date(2019, 11, 15),
        date: new Date('2019-12-15T06:00:00.000Z'),
        dateString: '12/15/2019',
        dateSort: 20191215,
        note: ':-)',
        row: 9,
        status: 'G',
        statusDescription: 'Good deployment'
      }
    ]
  },

  {
    title: 'Ethos',
    appCode: 'ETHOS',
    appGroup: 'RAS',
    appGroupTitle: 'Research',
    status: [
      {
        row: 8,
        status: 'C',
        statusDescription: 'Deployment with Customer Impact',
        dateString: '11/15/2019',
        // date: new Date(2019, 10, 15),
        date: new Date('2019-11-15T06:00:00.000Z'),
        dateSort: 20191115,
        note: 'Let\'s try some "BOLD" text'
      }
    ]
  },
  {
    title: 'Picker',
    appCode: 'PIC',
    appGroup: 'HR',
    appGroupTitle: 'Human Resources',
    status: [
      {
        row: 3,
        status: 'G',
        statusDescription: 'Good deployment',
        dateString: '11/02/2019',
        // date: new Date(2019, 10, 2),
        date: new Date('2019-11-02T06:00:00.000Z'),
        dateSort: 20191102,
        note: 'Hooray everything went to plan'
      },
      {
        row: 5,
        status: 'O',
        statusDescription: 'Outage',
        dateString: '11/10/2019',
        // date: new Date(2019, 10, 10),
        date: new Date('2019-11-10T06:00:00.000Z'),
        dateSort: 20191110,
        note: 'People are trashing the database'
      },
      {
        row: 6,
        status: 'G',
        statusDescription: 'Good deployment',
        dateString: '12/01/2019',
        // date: new Date(2019, 11, 1),
        date: new Date('2019-12-01T06:00:00.000Z'),
        dateSort: 20191201,
        note: 'This is a note with\n\nLine breaks'
      },
      {
        row: 7,
        status: 'C',
        statusDescription: 'Deployment with Customer Impact',
        dateString: '12/02/2019',
        // date: new Date(2019, 11, 2),
        date: new Date('2019-12-02T06:00:00.000Z'),
        dateSort: 20191202,
        note: ''
      }
    ]
  },
  {
    // the key is the app code
    title: 'Training Hub',
    appCode: 'TH',
    appGroup: 'HR',
    appGroupTitle: 'Human Resources',
    status: [
      {
        row: 2, // this should be a unique id - each status is on a new row
        status: 'B',
        statusDescription: 'Bad Deployment',
        dateString: '11/01/2019',
        // date: new Date(2019, 10, 1),
        date: new Date('2019-11-01T06:00:00.000Z'),
        dateSort: 20191101,
        note: 'Ooopsie!'
      },
      {
        row: 4,
        status: 'G',
        statusDescription: 'Good deployment',
        dateString: '11/10/2019',
        // date: new Date(2019, 10, 10),
        date: new Date('2019-11-10T06:00:00.000Z'),
        dateSort: 20191110,
        note: 'Some stuff happened but it was ALL GOOD'
      }
    ]
  }
];
