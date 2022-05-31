var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cit301');  // db name cit301 (case sensitive), collection name: students

var studentSchema = new mongoose.Schema({
	sid: {type: String, required: true, unique: true},
	first_name: {type: String, required: true},
	last_name: {type: String, required: true},
	midterm: { type: Number, min: 0, max: 100, required: true },
	final: { type: Number, min: 0, max: 100, required: true },
	major: {type: String, required: true},
});


module.exports = mongoose.model('Student', studentSchema);


