const mongoose = require('mongoose');
var randomize = require('randomatic');
const { Publisher } = require('../../models/publisher');

const { userSchema } = require('./schema');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Hash the plain text password before saving
userSchema.pre('save', async function(next) {
  console.log('================== userSchema pre save ===================');
  let bindingCode;
  var modified_paths = this.modifiedPaths();
  console.log('modified_paths:', modified_paths);
  if (this.isModified('password')) {
    // do something
    console.log('isModified');
  }
  if (!this.isModified('password')) {
    return next();
  }
  const user = this; // this provide access to object being saved

  // hash only whether password change
  if (this.isModified('password')) {
    // if (user.isModified('password')) {
    // if some data is modified so isModified is true: for example if there is a timestamp isModified always is true
    // number 8 means the number of round the hash will works. Its because security and speed are involved
    // 8 is the better option according author
    user.password = await bcrypt.hash(user.password, 8);
  }

  // to create a random code (letters and numbers) with size 10.
  if (!user.bindingCode) {
    bindingCode = randomize('Aa0', 10);
    // verify if bindingCode already exist - must be unique
    await User.findOne({ bindingCode })
      .then(userResult => {
        if (userResult) {
          // if bindingCode exist, generate another
          bindingCode = randomize('Aa0', 10);
        }
      })
      .catch(err => res.status(400).send(err));

    user.bindingCode = bindingCode;
  }

  next(); // to finish the function and pass to next operation chained
});

// Delete user relationship when user is removed
userSchema.pre('remove', async function(next) {
  const user = this;

  try {
    const publisher = await Publisher.findById(user.publishersId);
    publisher.userId = null;
    publisher.save();
  } catch (error) {
    console.log(error);
  }

  console.log('pre remove:', user._id);

  next();
});

/* when methods are created using toJSON
it automatic return the object as JSON and omit
the attribute we want - that case password and tokens
*/
userSchema.methods.toJSON = function() {
  /* methods access instances of object, because that I am using this bellow */
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// must be set to populate to be filled
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

userSchema.statics.findByUsername = async username => {
  console.log('=================> User findByUsername <=================');
  const user = await User.findOne({
    username,
  });
  // console.log('user findByCredentials:', user);
  if (user) {
    return true;
  }

  return false;
};

userSchema.statics.findByEmail = async email => {
  console.log('=================> User findByUsername <=================');
  const user = await User.findOne({
    email,
  });
  // console.log('user findByCredentials:', user);
  if (user) {
    return true;
  }

  return false;
};

userSchema.statics.findByIdAndUsername = async (_id, username) => {
  console.log('=================> User findByIdAndUsername <=================');
  console.log('_id:', _id);
  console.log('username:', username);
  const user = await User.findOne({
    _id: { $ne: _id },
    username,
  });
  console.log('user findByIdAndUsername:', user);
  if (user) {
    return true;
  }

  return false;
};

userSchema.statics.findByIdAndEmail = async (_id, email) => {
  console.log('=================> User findByIdAndEmail <=================');
  console.log('_id:', _id);
  console.log('email:', email);
  const user = await User.findOne({
    _id: { $ne: _id },
    email,
  });
  console.log('user findByIdAndEmail:', user);
  if (user) {
    return true;
  }

  return false;
};

userSchema.statics.findByCredentials = async (email, password) => {
  /* statics methods allow for defining functions that exist directly on your Model,
  because that I am using 'Use' object bellow */
  console.log('=================> User findByCredentials <=================');

  const user = await User.findOne({
    email,
  })
    .populate('publishersId')
    .populate('roleId');
  // console.log('user findByCredentials:', user);
  if (!user) {
    throw new Error('Unable to login 1');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login 2');
  }

  return user;
};

userSchema.statics.findByBindingCode = async bindingCode => {
  console.log('=================> User findByBindingCode <=================');
  const query = { bindingCode };
  const user = await User.findOne(query);
  console.log('User:', user);
  if (!user) {
    return false;
  }
  /* Checks if there is publisher linked with that user */
  if (user.publishersId) {
    return user;
  }
  return user;
};

userSchema.statics.findByNotIdAndBindingCode = async (_id, bindingCode) => {
  console.log('=================> User findByNotIdAndBindingCode <=================');
  const query = { _id: { $ne: _id }, bindingCode };
  console.log('query:', query);
  const user = await User.findOne(query);
  console.log('User:', user);
  if (!user) {
    return false;
  }
  /* Checks if there is publisher linked with that user */
  if (user.publishersId) {
    return user;
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

userSchema.methods.generateAuthToken = async function() {
  /* methods access instances of object, because that I am using this bellow */
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id.toString(),
    },
    'trustinJehovahwithallyourheart',
  );
  user.tokens = user.tokens.concat({
    token,
  });
  await user.save();
  return token;
};

const User = mongoose.model('users', userSchema); // the name will put on plural by mongo

module.exports = {
  User,
};
