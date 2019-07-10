const mongoose = require('mongoose');
//
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const decimal = Schema.Types.Decimal128;
//
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();

const attendanceSchema = new Schema(
  {
    serviceYear: {
      type: Number,
      default: year,
      unique: true,
      required: true,
    },
    // media publishers
    mediaTotal: {
      type: decimal,
      default: 0.0,
    },
    // media foreigner publishers
    mediaOfForeigner: {
      type: decimal,
      default: 0.0,
    },
    /*
  used to maintain a one to many relationship with congregations
  publishers (child) belongs to congregations (owner)
  */
    congregationId: {
      type: ObjectId,
      ref: 'congregations', // must to be the same name in model object
    },
    meetingsAttendance: [
      {
        meeting: {
          type: String,
          enum: ['MidweekMeeting', 'WeekendMeeting'],
        },
        dateMeeting: {
          type: Date,
          required: true,
          default: date,
        },
        yearOfReference: {
          type: Number,
          default: year,
        },
        monthOfReference: {
          type: Number,
          default: month,
        },
        attendance: Number,
        attendanceOfForeigner: Number,
      },
    ],
    modifiedBy: {
      type: ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = {
  attendanceSchema
};