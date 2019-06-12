const mongoose = require('mongoose');
const assert = require('assert');

const {
  Publisher
} = require('../src/models/publisher/');

describe('Test populate publishers congregational privileges', () => {
  it('Find Publisher', done => {
    const publishers = Publisher.findOne({
      _id: '5cffb508f73d090920250b25'
    }).populate('congregationalPrivilege').then(publ => {
      console.log('======= publ =========');
      console.log(publ);
    }).catch(error => {
      console.log(error);
    });

    const publByPriv = Publisher.aggregate({ $match: {
          'congregationalPrivilege.name': 'Sound System'
        }
      }
    }).then(pp => {
      console.log('======= pp =========');
      console.log(pp);
    }).catch(error => {
      console.log(error);
    });

    done();
  });
});