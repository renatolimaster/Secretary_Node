const mongoose = require("mongoose");
const assert = require("assert");
const moment = require('moment');

const {
  Publisher
} = require("../src/models/publisher/");

const {
  CongregationalPrivilege
} = require('../src/models/congregational-privilege');

describe("Test populate publishers congregational privileges", () => {
  xit("Find Publisher", done => {
    let firstDay = moment().startOf('month');
    console.log("======= first day =========");
    console.log(firstDay.toDate());
    console.log("======= end first day =========");
    const publishers = Publisher.findOne({
        _id: "5d0771597fde660761612fd5",
      })
      .populate("congregationalPrivilege")
      .populate('fieldServices')
      .then(publ => {
        console.log("======= publ =========");
        console.log(publ);
        console.log("======= end publ =========");
        console.log(publ.fullName);
        console.log("======= end full name =========");
        console.log(publ.fieldServices);
        // total hours
        console.log(publ.fieldServices[0].totalHoursService);
        console.log(publ.fieldServices[1].totalHoursService);
        console.log("======= end field services =========");
      })
      .catch(error => {
        console.log(error);
      });

    /* 
        const lerPrivPub = Publisher.findOne({
          'congregationalPrivilege.name': 'Publications Desk'
        }).populate('congregationalPrivilege').then(result => {
          console.log(result);
        }).catch(error => {
          console.log(error);
        });

        CongregationalPrivilege.findOne({
          name: 'Publications Desk'
        }).populate('publishers').then(privl => {
          console.log('=========== Publishers x Privileges ==========');
          console.log(privl.name, privl.publishers); // privl.publishers is an array
          console.log('=========== Publishers x Privileges ==========');
        }).catch(error => {
          console.log(error);
        });
     */


    done();
  });
});