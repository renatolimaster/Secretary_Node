const mongoose = require('mongoose');
var randomize = require('randomatic');

const {
  userSchema
} = require('./schema');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  console.log('userSchema pre save');
  if (!this.isModified('password')) {
    return next();
  }
  const user = this; // this provide access to object being saved
  // to create a random code (letters and numbers) with size 10.
  let bindingCode = randomize('Aa0', 10);
  // verify if bindingCode already exist - must be unique
  await User.findOne({ bindingCode }).then(userResult => {
    if (userResult) {
      // if bindingCode exist, generate another
      bindingCode = randomize('Aa0', 10);
      console.log('bindingCode:', this.bindingCode);
    }
  }).catch(err => res.status(400).send(err));

  user.bindingCode = bindingCode;

  // hash only whether password change
  if (user.isModified('password')) {
    // number 8 means the number of round the hash will works. Its because security and speed are involved
    // 8 is the better option according author
    user.password = await bcrypt.hash(user.password, 8);
  }

  console.log('bindingCode:', user.bindingCode);


  next(); // to finish the function and pass to next operation chained
});

// Delete user relationship when user is removed
// userSchema.pre('remove', async function(next) {
//   const user = this;

//   await Task.deleteMany({ owner: user._id });

//   next();
// });

/* when methods are created using toJSON
it automatic return the object as JSON and omit
the attibute we want - that case password and tokens
*/
userSchema.methods.toJSON = function () {
  /* methods access instances of object, because that I am using this bellow */
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  /* statics methods allow for defining functions that exist directly on your Model,
  because that I am using 'Use' object bellow */
  console.log('=================> findByCredentials <=================');
  
  const user = await User.findOne({
    email,
  }).populate('publishersId');
  
  if (!user) {
    throw new Error('Unable to login 1');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login 2');
  }
  
  return user;
};

userSchema.method.verifyToken = async token => {
  console.log('=================> verifyToken <=================');
  jwt.verify(token, 'trustinJehovahwithallyourheart', (err, decoded) => {
    if (err) {
      throw new Error('Error token');
    } else {
      console.log('token ===========> ', decoded);
    }
  });
};

userSchema.methods.generateAuthToken = async function () {
  /* methods access instances of object, because that I am using this bellow */
  const user = this;
  const token = jwt.sign({
      _id: user._id.toString()
    },
    'trustinJehovahwithallyourheart'
  );
  user.tokens = user.tokens.concat({
    token
  });
  await user.save();
  return token;
};

const User = mongoose.model('users', userSchema); // the name will put on plural by mongo

module.exports = {
  User
};