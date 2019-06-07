const mongoose = require('mongoose');
const assert = require('assert');
const moment = require('moment');
const ObjectId = mongoose.Types.ObjectId;
const decimal = mongoose.Types.Decimal128;
const {
  Congregation
} = require('../src/models/congregation');

const date = moment();

describe('Creating Congregation', () => {
  xit('save a congregation', done => {
    console.log('=========== Congregation ===============');
    const congregation = new Congregation({
      number: '123456',
      name: 'Vitoria English Congregation',
      address: [{
        street: 'Rua Milton',
        complement: 'SM 602',
        neighborhood: 'Jardim',
        city: 'Vitória',
        zipCode: '29090-770'
      }],
      phones: [{
        kind: 'Cell',
        number: '27-981-460-878'
      }],
      email: [{
        kind: 'Private',
        address: 'renatolimaster@gmail.com'
      }],
      coordinatorId: ObjectId('5cdef2126d75723b5f44f8f3'),
      default: false,
      modifiedBy: ObjectId('5cdef2126d75723b5f44f8f3')
    });
    console.log(congregation);

    congregation.save().then(() => {
      // has congregation being saved successfullY? 123
      assert(!congregation.isNew);
      done();
    }).catch(error => {
      console.log('Error:', error);
    });
  });
});