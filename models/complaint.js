var mongoose = require('mongoose');

var ComplaintSchema = new mongoose.Schema({
	title: String,
	upvotes: {
		type: Number,
		default: 0
	},
	downvotes: {
		type: Number,
		default: 0
	},
	constituency: String,
	image: String,
	description: String,
	latitude: Number,
	longitude: Number,
	tags: [
		{
			type: String
		}
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	],
	status: {
		type: String,
		default: 'new'
	},
	upvoters: [
		{
			type: String
		}
	],
	downvoters: [
		{
			type: String
		}
	],
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
