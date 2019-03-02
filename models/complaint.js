var mongoose = require('mongoose');

var ComplaintSchema = new mongoose.Schema({
	title: String,
	upvotes: Number,
	downvotes: Number,
	description: String,
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
