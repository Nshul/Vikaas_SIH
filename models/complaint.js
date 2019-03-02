var mongoose = require('mongoose');

var ComplaintSchema = new mongoose.Schema({
	title: String,
	upvotes: Number,
	downvotes: Number,
	description: String,
	tags: {
		type: Array,
		default: [ 'lol', 'xD' ]
	},
	comments: {
		type: Array,
		default: [ 'lol', 'xD' ]
	},
	status: {
		type: String,
		default: 'lol'
	}
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
