const mongoose = require('mongoose');
const moment = require('moment');
//
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const decimal = Schema.Types.Decimal128;
//
const date = moment();
const year = moment('YYYY');
const month = moment('MM');

const attendanceSchema = new Schema(
  {
    serviceYear: { type: year, required: true },
    mediaTotal: { type: decimal, default: 0.0 }, // media publicadores
    mediaOfForeigner: { type: decimal, default: 0.0 }, // media estrangeiros
    /*
    used to matain a one to many relationship with congregations
    publishers (child) belongs to congregations (owner)
    */
    congregationId: {
      type: ObjectId,
      ref: 'congregations' // must to be the same name in model object
    },
    meetingAttendance: [
      {
        meeting: {
          type: String,
          enum: ['Midweek Meeting', 'Weekend Meeting']
        },
        dateMeeting: date,
        yearOfReference: { type: Number, default: year },
        monthOfReference: { type: Number, default: month },
        attendance: Number,
        attendanceOfForeigner: Number
      }
    ],
    modifiedBy: {
      type: ObjectId,
      ref: 'publishers',
      required: true
    }
  },
  { timestamps: true }
);

module.export = { attendanceSchema };
