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
  let total = 0;
  let monthOfReference = 1;
  const meetingsAttendance = [];

  let media = 0.0;
  let attendanceOfForeigner = 0;

  let summed = [];
  let average = [];
  let count = [];

  console.log('params:', year + ' ' + meeting);

  await MeetingsAttendance.findOne({
      serviceYear: year
    })
    .then(results => {
      console.log('Results ===========:>', results);
      monthOfReference = results.meetingsAttendance[0].monthOfReference;

      summed = _(results.meetingsAttendance)
        .groupBy('monthOfReference')
        .map((objs, key) => {
          return {
            'monthOfReference': key,
            'totalAttendance': _.sumBy(objs, 'attendance')
          };
        })
        .value();

      average = _(results.meetingsAttendance)
        .groupBy('monthOfReference')
        .map((objs, key) => {
          return {
            'AverageAttendanceEachWeek': _.meanBy(objs, 'attendance')
          };
        })
        .value();

      count = _(results.meetingsAttendance)
        .groupBy('monthOfReference')
        .map((objs, key) => {
          return {
            'numberOfMeetings': _.countBy(objs, 'monthOfReference')
          };
        })
        .value();

      console.log('summed:', summed);
      console.log('average:', average);
      console.log('count:', count);

      console.log('meetingsAttendance total:', meetingsAttendance);
      return {summed, average, count};
    });
});

attendanceSchema.getMediaServiceYear = async function (year) {
  const attendance = this;
  let total = attendance.getTotalServiceYear(year);
  let media = 0.0;

  await attendance.find({
    yearService: year
  }).then(results => {});

  media = this.attendanceTotal;
};

const MeetingsAttendance = mongoose.model(
  'meetingsattendance',
  attendanceSchema
);

module.exports = {
  MeetingsAttendance
};