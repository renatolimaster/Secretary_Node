const mongoose = require('mongoose');
// to use ES6 implementation for promise
mongoose.Promise = global.Promise;

// to garantee that any code will execute if connection succeed
before(done => {
  mongoose.connect('mongodb://localhost/secretary_test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
  mongoose.connection
    .once('open', () => {
      console.log('Good to go!');
      done();
    })
    .on('error', error => {
      console.warn('Warning', error);
    });
});

// beforeEach(done => {
//   const { congregations, publishers } = mongoose.connection.collections;

//   // mongoose.connection.db.collections((err, collections) => {
//   //   if (err) {
//   //     console.log(err);
//   //   } else {
//   //     console.log(collections);
//   //   }
//   // });

//   // congregations.deleteOne({});
//   // publishers.deleteOne({});
//   congregations.deleteMany();
//   publishers.deleteMany();
//   done();
//   // congregations.drop(() => {
//   //   publishers.drop(() => {
//   //     done();
//   //   });
//   // });
// });

afterEach(done => {
  const { congregations, publishers } = mongoose.connection.collections;
  congregations.deleteMany();
  publishers.deleteMany();
  done();
});
