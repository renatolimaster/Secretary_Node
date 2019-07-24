const mongoose = require('mongoose');
const assert = require('assert');
var randomize = require('randomatic');
const {
  User
} = require('../src/models/user')
const ObjectId = mongoose.Types.ObjectId;

describe('Create User', () => {
  xit('Save User', done => {
    console.log('=========== User ===============');
    let bindingCode = randomize('Aa0', 10);
    const user = new User({
      username: 'renatolimaster',
      email: 'renatolimaster@gmail.com',
      firstName: 'Renato',
      middleName: 'Teixeira',
      lastName: 'Lima',
      bindingCode: bindingCode,
      role: 'admin',
      publishersId: '5cfe971a8d7c121b060c0614',
      token: [''],
      password: '11223311',
    });

    console.log(user);

    user.save().then(() => {
      assert(!user.isNew);
      done();
    }).catch(error => {
      console.log('Error:', error);
    });

  });


});