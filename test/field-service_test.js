const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const assert = require('assert');

const {
  Publisher
} = require('../src/models/publisher');
const {
  Pioneer
} = require('../src/models/pioneer');

const {
  FieldService
} = require('../src/models/field-service');
const log = console.log;

describe('Field Service Tests', () => {
  xit('Save', done => {
    let dta = new Date('2019-05-01');
    const fieldService = new FieldService({

      referenceDate: dta,
      referenceYear: dta.getFullYear(),
      referenceMonth: dta.getMonth(),
      deliveryDate: dta,
      studies: 1,
      brochures: 0,
      hours: 18,
      hoursBetel: 30,
      creditHours: 10,
      books: 0,
      minutes: 0,
      notes: 'Regular delivery',
      returnVisits: 3,
      magazines: 0,
      collocations: 4,
      videos: 1,
      pioneerId: '5d07ce838c8a4d2f8953ef9f',
      publisherId: '5d0771597fde660761612fd5',

    });

    fieldService.save().then(fs => {
      assert(!fs.isNew);
    }).catch(error => {
      log(error);
    });

    done();
  });
});