const mongoose = require('mongoose');
const assert = require('assert');
const {
  MeetingsAttendance
} = require('../src/models/meetingsattendance');

//
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;

describe('Create Meetings Attendance', async () => {

  it('Save Meetings Attendance', done => {
    console.log('=========== Meetings Attendance ===============');
    console.log('data:', date);

    const meetingsattendance = new MeetingsAttendance({
      serviceYear: year,
      // media publishers
      mediaTotal: 0.0,
      // media foreigner publishers
      mediaOfForeigner: 0.0,
      /*
      used to maintain a one to many relationship with congregations
      publishers (child) belongs to congregations (owner)
      */
      congregationId: '5cf11d569458ef0d0e7ac51a',
      meetingsAttendance: [{
          meeting: 'MidweekMeeting',
          dateMeeting: new Date('2019-01-05'),
          yearOfReference: 2019,
          monthOfReference: 01,
          attendance: 31,
          attendanceOfForeigner: 1
        },
        {
          meeting: 'WeekendMeeting',
          dateMeeting: new Date('2019-01-12'),
          yearOfReference: 2019,
          monthOfReference: 01,
          attendance: 28,
          attendanceOfForeigner: 2
        },
        {
          meeting: 'MidweekMeeting',
          dateMeeting: new Date('2019-01-19'),
          yearOfReference: 2019,
          monthOfReference: 01,
          attendance: 25,
          attendanceOfForeigner: 1
        },
        {
          meeting: 'WeekendMeeting',
          dateMeeting: new Date('2019-01-26'),
          yearOfReference: 2019,
          monthOfReference: 01,
          attendance: 29,
          attendanceOfForeigner: 3
        },





        {
          meeting: 'MidweekMeeting',
          dateMeeting: new Date('2019-01-05'),
          yearOfReference: 2019,
          monthOfReference: 02,
          attendance: 25,
          attendanceOfForeigner: 1
        }, {
          meeting: 'WeekendMeeting',
          dateMeeting: new Date('2019-01-12'),
          yearOfReference: 2019,
          monthOfReference: 02,
          attendance: 28,
          attendanceOfForeigner: 2
        }, {
          meeting: 'MidweekMeeting',
          dateMeeting: new Date('2019-01-19'),
          yearOfReference: 2019,
          monthOfReference: 02,
          attendance: 25,
          attendanceOfForeigner: 1
        }, {
          meeting: 'WeekendMeeting',
          dateMeeting: new Date('2019-01-26'),
          yearOfReference: 2019,
          monthOfReference: 02,
          attendance: 29,
          attendanceOfForeigner: 3
        }
      ],
      modifiedBy: '5cf00e24c65c6d164fcb70e1'
    });

    console.log('======= total =======');
    meetingsattendance.meow('meeeeeoooooooooooiow');
    console.log('=====================');

    meetingsattendance.save().then(() => {
      assert(!meetingsattendance.isNew);
      done();
    });

    console.log(meetingsattendance);

    meetingsattendance.getTotalServiceYear(year, 'MidweekMeeting');


  });

});