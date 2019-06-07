const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const assert = require('assert');
const moment = require('moment');
const { Publisher } = require('../src/models/publisher');

const date = moment();

describe('Creating Publisher.', () => {
  xit('Save Publisher', done => {
    console.log('=========== Publisher ===============');
    let day = new Date(2011, 9, 16);
    const publisher = new Publisher({
      name: 'Renato Lima',
      gender: 'Male',
      baptized: true,
      address: [
        {
          street: 'Rua Milton',
          complement: 'SM 602',
          neighborhood: 'Jardim',
          city: 'Vitoria',
          zipCode: '29090-770'
        }
      ],
      phones: [
        {
          kind: 'Cell',
          number: '27-981-460-878'
        }
      ],
      email: [
        {
          kind: 'Private',
          address: 'renatolimaster@gmail.com'
        }
      ],
      birthDate: date,
      baptismDate: day,
      householder: true,
      elderDate: date,
      servantDate: date,
      inactivityDate: date,
      reactivationDate: date,
      firstFieldService: date,
      notes: 'This is a note',
      startPioneer: date,
      statusService: 'Regular',
      statusAssociation: 'Associated',
      servicePrivilege: 'Elder',
      groupId: ObjectId('5cdef2126d75723b5f44f8f3'),
      pioneerId: ObjectId('5cdef2126d75723b5f44f8f3'),
      pioneerNumber: '123456',
      profile: ObjectId('5cdef2126d75723b5f44f8f3'),
      /*
    used to maintain a one to one relationship with Users
    one publisher has one user
    */
      userId: ObjectId('5cdef2126d75723b5f44f8f3'),
      /*
    used to maintain a one to many relationship with congregations
    publishers (child) belongs to congregations (owner)
    */
      congregationId: ObjectId('5cdef2126d75723b5f44f8f3'),
      modifiedBy: ObjectId('5cdef2126d75723b5f44f8f3')
    });

    console.log(publisher);

    publisher.save().then(() => {
      assert(!publisher.isNew);
      done();
    }).catch(error => {
      console.log('Error:', error);
    });
  });
});
