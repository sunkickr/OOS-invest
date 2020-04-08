const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schma
const TestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = Test = mongoose.model('test', TestSchema);