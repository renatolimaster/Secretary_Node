const mongoose = require("mongoose");
const assert = require("assert");

const {
  Publisher
} = require("../src/models/publisher/");

const {
  CongregationalPrivilege
} = require('../src/models/congregational-privilege');

describe("Test populate publishers congregational privileges", () => {
  it("Find Publisher", done => {
    const publishers = Publisher.findOne({
        _id: "5d0771597fde660761612fd5",
      })
      .populate("congregationalPrivilege")
      .then(publ => {
        console.log("======= publ =========");
        console.log(publ);
        console.log("======= publ =========");
      })
      .catch(error => {
        console.log(error);
      });


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
    })

    done();
  });
});