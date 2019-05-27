const mongoose = require('mongoose');
const { attendanceSchema } = require('./schema');

attendanceSchema.pre('save', function() {
  console.log('attendanceSchema pre save meeting attendance');
  return true;
});

attendanceSchema.method.getTotalServiceYear = async function(year) {
  const meetingAttendance = [
    {
      meeting: {
        type: String
      },
      yearOfReference: { type: Number, default: year },
      monthOfReference: { type: Number, default: month },
      attendance: Number,
      media: Number,
      attendanceOfForeigner: Number
    }
  ];
  const attendance = this;
  let totalMidweek = 0;
  let totalWeekend = 0;
  let monthOfReference = 1;

  await attendance
    .find({
      serviceYear: year
    })
    .sort({'attendance.meetingAttendance.meeting': 'asc', 'attendance.meetingAttendance.dateMeeting': 'asc'})
    .then(results => {
      results.array.forEach(result => {
        if ((result.meetingAttendance.monthOfReference = monthOfReference)) {
          if (result.meetingAttendance.meeting === 'Midweek Meeting') {
            totalMidweek = totalMidweek + result.meetingAttendance.attendance;
            meetingAttendance[monthOfReference - 1].meeting =
              result.meetingAttendance.meeting;
            meetingAttendance[monthOfReference - 1].yearOfReference = year;
            meetingAttendance[
              monthOfReference - 1
            ].monthOfReference = monthOfReference;
            meetingAttendance[monthOfReference - 1].attendance = totalMidweek;
            meetingAttendance[monthOfReference - 1].attendanceOfForeigner = 0;
            meetingAttendance[monthOfReference - 1].media =
              totalMidweek / monthOfReference;
          } else if (result.meetingAttendance.meeting === 'Weekend Meeting') {
            totalWeekend =
              totalWeekend + attendance.meetingAttendance.attendance;
            meetingAttendance[monthOfReference - 1].meeting =
              result.meetingAttendance.meeting;
            meetingAttendance[monthOfReference - 1].yearOfReference = year;
            meetingAttendance[
              monthOfReference - 1
            ].monthOfReference = monthOfReference;
            meetingAttendance[monthOfReference - 1].attendance = totalMidweek;
            meetingAttendance[monthOfReference - 1].attendanceOfForeigner = 0;
            meetingAttendance[monthOfReference - 1].media =
              totalWeekend / monthOfReference;
          }
        } else {
          monthOfReference = result.meetingAttendance.monthOfReference;
          totalMidweek = 0;
          totalWeekend = 0;
        }
      });
      return meetingAttendance;
    });
};

attendanceSchema.getMediaServiceYear = async function(year) {
  const attendance = this;
  let total = attendance.getTotalServiceYear(year);
  let media = 0.0;

  await attendance.find({ yearService: year }).then(results => {});

  media = this.attendanceTotal;
};

const meetingAttendance = mongoose.model(
  'AssistenciaReuniao',
  attendanceSchema
);

module.exports = { meetingAttendance };
