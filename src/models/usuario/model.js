const mongoose = require('mongoose');
const { userSchema } = require('./schema');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// var schema = new mongoose.Schema({ name: 'string', size: 'string' });

// schema.pre('save', function() {
//   console.log('schema pre save congregacao');
//   return true;
// });

//Hash the plain text password before saving
userSchema.pre('save', async function(next) {
  const user = this; // this provide access to object being saved

  // hash only wheather password change
  if (user.isModified('password')) {
    // number 8 means the number of round the hash will works. Its because security and speed are involved
    // 8 is the better option according author
    user.password = await bcrypt.hash(user.password, 8);
  }

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
userSchema.methods.toJSON = function() {
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
  console.log('user 1', email);

  const user = await User.findOne({ email });
  console.log('user 2', user);
  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Erro('Unable to login');
  }
  console.log('user 3', user);
  return user;
};

userSchema.method.verifyToken = async token => {
  console.log('=================> verifyToken <=================');
  jwt.verify(token, 'trustinJehovahwithallyourheart', (err, decoded) => {
    if (err) {
      throw new Erro('Erro token');
    } else {
      console.log('token ===========> ', decoded);
    }
  });
};

userSchema.methods.generateAuthToken = async function() {
  /* methods access instances of object, because that I am using this bellow */
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    'trustinJehovahwithallyourheart'
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

const User = mongoose.model('users', userSchema); // the name will put on plural by mongo

module.exports = { User };
