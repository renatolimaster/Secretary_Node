const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const assert = require('assert');
const {
    Pioneer
} = require('../src/models/pioneer');


describe('Pioneer tests', () => {
    xit('Save pioneer', done => {
        console.log('=========== Pioneer ===============');
        const pioneer = new Pioneer({
            description: 'Missionary',
            requirement: 'Required 70 hours',
            congregationId: ObjectId('5cdef2126d75723b5f44f8f3'),
            modifiedBy: ObjectId('5cdef2126d75723b5f44f8f3')
        });

        console.log(pioneer);

        pioneer.save().then(() => {
            assert(!pioneer.isNew);
            done();
        }).catch(error => {
            console.log('Error:', error);
        });
    });
});