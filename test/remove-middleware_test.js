const mongoose = require('mongoose');
const assert = require('assert');

const ObjectId = mongoose.Types.ObjectId;

const { DesignatedFunction } = require('../src/models/designated-functions');
const { PublisherDesignatedFunction } = require('../src/models/publisher-designated-function');
const { User } = require('../src/models/user');
const { Congregation } = require('../src/models/congregation');
const { Pioneer } = require('../src/models/pioneer');
const { Publisher } = require('../src/models/publisher');
const { CongregationalPrivilege } = require('../src/models/congregational-privilege');
const { Group } = require('../src/models/group');

const moment = require('moment');
const randomize = require('randomatic');
const log = console.log;


const date = moment();

describe('remove child', () => {
  let day = new Date(2011, 9, 16);
  let bindingCode = randomize('Aa0', 10);
  let user, congregation, pioneer, publisher, publisherId, congregationalPrivilege, group;
  beforeEach(done => {
    log('=========== Publisher ===============');

    pioneer = new Pioneer({
      description: 'Missionary',
      requirement: 'Required 70 hours',
      congregationId: ObjectId('5cdef2126d75723b5f44f8f3'),
      modifiedBy: ObjectId('5cdef2126d75723b5f44f8f3'),
    });

    user = new User({
      username: 'renatolimaster',
      email: 'renatolimaster@gmail.com',
      firstName: 'Renato',
      middleName: 'Teixeira',
      lastName: 'Lima',
      bindingCode: bindingCode,
      password: '11223311',
    });

    congregation = new Congregation({
      number: '123456',
      name: 'Vitoria English Congregation',
      address: [
        {
          street: 'Rua Milton',
          complement: 'SM 602',
          neighborhood: 'Jardim',
          city: 'Vit?ria',
          zipCode: '29090-770',
        },
      ],
      phones: [
        {
          kind: 'Cell',
          number: '27-981-460-878',
        },
      ],
      email: [
        {
          kind: 'Private',
          address: 'renatolimaster@gmail.com',
        },
      ],
      coordinatorId: ObjectId('5cdef2126d75723b5f44f8f3'),
      default: false,
      modifiedBy: ObjectId('5cdef2126d75723b5f44f8f3'),
    });

    group = new Group({
      local: 'Kingdom Hall',
      address: {
        street: 'Rua Milton',
        complement: 'SM 602',
        neighborhood: 'Jardim',
        city: 'Vitoria',
        zipCode: '29090-770',
      },
    });

    congregationalPrivilege = new CongregationalPrivilege({
      name: 'Sound System',
      notes: 'Organization of Sound System',
      modifiedBy: '5cfe971a8d7c121b060c0614',
      congregationId: '5cfe971a8d7c121b060c060f',
    });

    publisher = new Publisher({
      firstName: 'Renato',
      middleName: 'Teixeira',
      lastName: 'Lima',
      gender: 'Male',
      baptized: true,
      address: [
        {
          street: 'Rua Milton',
          complement: 'SM 602',
          neighborhood: 'Jardim',
          city: 'Vitoria',
          zipCode: '29090-770',
        },
      ],
      phones: [
        {
          kind: 'Cell',
          number: '27-981-460-878',
        },
      ],
      email: [
        {
          kind: 'Private',
          address: 'renatolimaster@gmail.com',
        },
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
      pioneerNumber: '123456',
      profile: ObjectId('5cdef2126d75723b5f44f8f3'),
      groupId: group,
      pioneerId: pioneer,
      userId: publisher,
      congregationId: congregation,
      modifiedBy: publisher,
      congregationalPrivilege: congregationalPrivilege,
    });
    // publisher.groupId = group;
    // publisher.pioneerId = pioneer;
    // publisher.userId = publisher;
    // publisher.congregationId = congregation;
    // publisher.modifiedBy = publisher;
    // publisher.congregationalPrivilege = congregationalPrivilege;

    group.helperId = publisher;
    group.overseerId = publisher;
    group.congregationId = publisher;
    group.modifiedBy = publisher;

    log('=========== DesignatedFunction ===============');

    const functionsRead = new DesignatedFunction({
      description: 'Meeting Assistance Management',
      modifiedBy: '5d14be411e1ce914eceb6a9b',
    });
    const functionsReadWrite = new DesignatedFunction({
      description: 'Publisher Associations Management',
      modifiedBy: '5d14be411e1ce914eceb6a9b',
    });
    const functionsDelete = new DesignatedFunction({
      description: 'Application Management',
      modifiedBy: '5d14be411e1ce914eceb6a9b',
    });

    log('=========== DesignatedFunction Publisher ===============');
    log(publisher._id);

    const publisherDesignatedFunction = new PublisherDesignatedFunction({
      permission: 'Read',
      publisherId: publisher,
      designatedFunctionId: functionsRead,
    });

    Promise.all([
      functionsRead.save(),
      functionsReadWrite.save(),
      functionsDelete.save(),
      publisherDesignatedFunction.save(),
      user.save(),
      congregation.save(),
      publisher.save(),
      congregationalPrivilege.save(),
      group.save(),
      pioneer.save(),
    ]).then(() => done());
  });

  it('remove publisherDesignatedFunction', done => {
    publisher
      .remove()
      .then(() => PublisherDesignatedFunction.countDocuments())
      .then(count => {
        assert(count === 0);
        done();
      });
  });
});
