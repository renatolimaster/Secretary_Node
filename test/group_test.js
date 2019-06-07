const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const assert = require('assert');

const {
  Group
} = require('../src/models/group');

describe('Group tests', () => {
  xit('save group', done => {

    const group = new Group({
      local: 'Kingdom Hall',
      address: {
        street: 'Rua Milton',
        complement: 'SM 602',
        neighborhood: 'Jardim',
        city: 'Vitória',
        zipCode: '29090-770'
      },
      helperId: ObjectId('5cfa9c21aca4d722adc94c0a'),
      overseerId: ObjectId('5cfa9c21aca4d722adc94c0a'),
      congregationId: ObjectId('5cdef2126d75723b5f44f8f3'),
      modifiedBy: ObjectId('5cdef2126d75723b5f44f8f3')
    });

    console.log(group);

    group.save().then(() => {
      assert(!group.isNew);
      done();
    }).catch(error => {
      console.log(error);
    });

  });
});