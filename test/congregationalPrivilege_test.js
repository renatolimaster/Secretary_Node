const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const assert = require('assert');
const {
  CongregationalPrivilege
} = require('../src/models/congregational-privilege/');
const {
  Publisher
} = require('../src/models/publisher/');

const {
  Congregation
} = require('../src/models/congregation/');

describe('Congregational Privilege tests', () => {
  xit('congregational privilege save', done => {
    const congregationalPrivilege = new CongregationalPrivilege({
      name: 'Sound System',
      notes: 'Organization of Sound System',
      modifiedBy: '5cfe971a8d7c121b060c0614',
      congregationId: '5cfe971a8d7c121b060c060f'
    });

    console.log('===========  Congregational Privilege ==============');
    console.log(congregationalPrivilege);

    congregationalPrivilege.save().then(() => {
      assert(!congregationalPrivilege.isNew);
      // done();
    }).catch(error => {
      console.log(error);
    });

    done();

  });

});