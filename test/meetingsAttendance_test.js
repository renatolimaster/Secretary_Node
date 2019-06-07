const mongoose = require('mongoose');
const assert = require('assert');
const {
  MeetingsAttendance
} = require('../src/models/meetingsattendance');

describe('Create Meetings Attendance', async () => {

  xit('Save Meetings Attendance', done => {
    console.log('=========== Meetings Attendance ===============');

    const meetingsattendance = new MeetingsAttendance({
      serviceYear: 2019,
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
          dateMeeting: new Date('2019-01-02'),
          yearOfReference: 2019,
          monthOfReference: 1,
          attendance: 31,
          attendanceOfForeigner: 3
        },
        {
          meeting: 'MidweekMeeting',
          dateMeeting: new Date('2019-01-09'),
          yearOfReference: 2019,
          monthOfReference: 1,
          attendance: 28,
          attendanceOfForeigner: 2
        },
        {
          meeting: 'MidweekMeeting',
          dateMeeting: new Date('2019-01-16'),
          yearOfReference: 2019,
          monthOfReference: 1,
          attendance: 25,
          attendanceOfForeigner: 3
        },
        {
          meeting: 'MidweekMeeting',
          dateMeeting: new Date('2019-01-23'),
          yearOfReference: 2019,
          monthOfReference: 1,
          attendance: 29,
          attendanceOfForeigner: 3
        },
        {
          meeting: 'MidweekMeeting',
          dateMeeting: new Date('2019-01-30'),
          yearOfReference: 2019,
          monthOfReference: 1,
          attendance: 29,
          attendanceOfForeigner: 3
        },
        //
        {
          meeting: 'WeekendMeeting',
          dateMeeting: new Date('2019-01-05'),
          yearOfReference: 2019,
          monthOfReference: 1,
          attendance: 28,
          attendanceOfForeigner: 1
        }, {
          meeting: 'WeekendMeeting',
          dateMeeting: new Date('2019-01-12'),
          yearOfReference: 2019,
          monthOfReference: 1,
          attendance: 28,
          attendanceOfForeigner: 2
        }, {
          meeting: 'WeekendMeeting',
          dateMeeting: new Date('2019-01-19'),
          yearOfReference: 2019,
          monthOfReference: 1,
          attendance: 25,
          attendanceOfForeigner: 1
        }, {
          meeting: 'WeekendMeeting',
          dateMeeting: new Date('2019-01-26'),
          yearOfReference: 2019,
          monthOfReference: 1,
          attendance: 29,
          attendanceOfForeigner: 3
        },
        // february
        {
          meeting: 'MidweekMeeting',
          dateMeeting: new Date('2019-02-06'),
          yearOfReference: 2019,
          monthOfReference: 2,
          attendance: 30,
          attendanceOfForeigner: 2
        },
        {
          meeting: 'MidweekMeeting',
          dateMeeting: new Date('2019-02-13'),
          yearOfReference: 2019,
          monthOfReference: 2,
          attendance: 29,
          attendanceOfForeigner: 3
        },
        {
          meeting: 'MidweekMeeting',
          dateMeeting: new Date('2019-02-20'),
          yearOfReference: 2019,
          monthOfReference: 2,
          attendance: 27,
          attendanceOfForeigner: 3
        },
        {
          meeting: 'MidweekMeeting',
          dateMeeting: new Date('2019-02-27'),
          yearOfReference: 2019,
          monthOfReference: 2,
          attendance: 28,
          attendanceOfForeigner: 2
        }, {
          meeting: 'WeekendMeeting',
          dateMeeting: new Date('2019-02-02'),
          yearOfReference: 2019,
          monthOfReference: 2,
          attendance: 28,
          attendanceOfForeigner: 2
        }, {
          meeting: 'WeekendMeeting',
          dateMeeting: new Date('2019-02-09'),
          yearOfReference: 2019,
          monthOfReference: 2,
          attendance: 29,
          attendanceOfForeigner: 2
        }, {
          meeting: 'WeekendMeeting',
          dateMeeting: new Date('2019-02-16'),
          yearOfReference: 2019,
          monthOfReference: 2,
          attendance: 25,
          attendanceOfForeigner: 1
        }, {
          meeting: 'WeekendMeeting',
          dateMeeting: new Date('2019-02-23'),
          yearOfReference: 2019,
          monthOfReference: 2,
          attendance: 28,
          attendanceOfForeigner: 3
        }
      ],
      modifiedBy: '5cf00e24c65c6d164fcb70e1'
    });

    meetingsattendance.save().then(() => {
      assert(!meetingsattendance.isNew);
      done();
    }).catch(error => {
      console.log('Error:', error);
    });

    console.log(meetingsattendance.getTotalServiceYear(2019, 'MidweekMeeting'));


  });

});