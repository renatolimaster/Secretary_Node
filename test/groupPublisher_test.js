const mongoose = require('mongoose');
const assert = require('assert');
const {
  Group
} = require('../src/models/group');
const {
  Publisher
} = require('../src/models/publisher');

describe('Group x Publisher tests', () => {
  xit('populate group x publishers', async done => {


    let query = {
      _id: '5cfaac667a3a0a259a0227e4'
    };
    let options = {};

    const groups = Group.findOne(query, options)
      .populate('helperId')
      .populate('overseerId')
      .populate('modifiedBy')
      .then(group => {
        if (group) {
          console.log(`Successfully found document: \n${group}.`);
          console.log('pub ====> ', group.helperId.fullName);
        } else {
          console.log('No document matches the provided query.');
        }
        // return congregation;
      })
      .catch(err => console.log(err));

    console.log('========== Publisher x Group ==========');

    query = {
      _id: '5cfaac667a3a0a259a0227e5'
    };
    options = {};

    const publisher = Publisher.findOne(query, options).populate('groupId').then(pub => {
      if (pub) {
        console.log(`Successfully found document: \n${pub}.`);
        console.log('group:', pub.groupId);
      } else {
        console.log('No document matches the provided query.');
      }
    }).catch(error => {
      console.log(error);
    });

    done();

  });
});