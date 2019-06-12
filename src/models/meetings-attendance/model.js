const mongoose = require('mongoose');
const {
  attendanceSchema
} = require('./schema');

const _ = require('lodash');

attendanceSchema.methods.toJSON = function () {
  /* methods access instances of object, because that I am using this bellow */
  const attendance = this;
  const attendanceObject = attendance.toObject();

  // delete userObject.id;

  return attendanceObject;
};

attendanceSchema.pre('save', function () {
  console.log('attendanceSchema pre save meetings attendance');
  return true;
});

attendanceSchema.method('meow', function (meow) {
  console.log(meow);
});

attendanceSchema.method('getTotalServiceYear', async function (year, meeting) {
  let weekendMeeting = [];
  let weekendResult = [];
  let midweekMeeting = [];
  let midweekResult = [];

  console.log('params:', year + ' ' + meeting);

  await MeetingsAttendance.findOne({
      serviceYear: year
    })
    .then(results => {
      // filter weekend meetings
      weekendMeeting = _.filter(results.meetingsAttendance, {
        meeting: 'WeekendMeeting'
      });
      // get values of weekend meetings
      weekendResult = _(weekendMeeting)
        .groupBy('monthOfReference')
        .map((objs, key) => {
          return {
            'yearOfReference': objs[0].yearOfReference,
            'meeting': objs[0].meeting,
            'monthOfReference': objs[0].monthOfReference,
            'totalAttendance': _.sumBy(objs, function (o) {
              return o.attendance;
            }),
            'averageAttendanceEachWeek': _.meanBy(objs, 'attendance'),
            'numberOfMeetings': _.countBy(objs, function (o) {
              return o.monthOfReference;
            }),
          };
        })
        .value();

      console.log('=========== weekendResult ===========');
      console.log(weekendResult);
      // filter midweek meetings
      midweekMeeting = _.filter(results.meetingsAttendance, {
        meeting: 'MidweekMeeting'
      });
      // get values of midweek meetings
      midweekResult = _(midweekMeeting)
        .groupBy('monthOfReference')
        .map((objs, key) => {
          return {
            'yearOfReference': objs[0].yearOfReference,
            'Meeting': objs[0].meeting,
            'monthOfReference': objs[0].monthOfReference,
            'totalAttendance': _.sumBy(objs, function (o) {
              return o.attendance;
            }),
            'AverageAttendanceEachWeek': _.meanBy(objs, 'attendance'),
            'numberOfMeetings': _.countBy(objs, function (o) {
              return o.monthOfReference;
            }),
          };
        })
        .value();

      console.log('=========== midweekResult ===========');
      console.log(midweekResult);
      return {
        weekendResult,
        midweekResult
      };
    }).catch(error => {
      console.log('Error:', error);
    });
});

attendanceSchema.getMediaServiceYear = async function (year) {
  const attendance = this;

  await attendance.find({
    yearService: year
  }).then(() => {}).catch(error => {
    console.log('Error:', error);
  });

};

const MeetingsAttendance = mongoose.model(
  'meetingsattendance',
  attendanceSchema
);

module.exports = {
  MeetingsAttendance
};