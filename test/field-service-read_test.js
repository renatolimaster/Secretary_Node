const mongoose = require('mongoose');
const {
  FieldService
} = require('../src/models/field-service');
const assert = require('assert');
const log = console.log;

describe('Field Service Read Test', () => {
  xit('Read Field Service', done => {
    // you can choose the attributes to filter
    FieldService.find().populate('pioneerId').populate('publisherId', '_id firstName lastName').then(fs => {
      log(fs);
      log(fs[0].totalHoursService);
    });

    done();
  });
});