var mongoose = require('mongoose');

var MpSchema = new mongoose.Schema({
	name: 'String',
	phone: 'String',
	state: 'String',
	city: 'String',
	address: 'String',
	office_address: 'String',
	constituency: 'String',
	inconsideration: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Complaint'
		}
	],
	approved: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Complaint'
		}
	]
});

module.exports = mongoose.model('Mp', MpSchema);
