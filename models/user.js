var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: 'String',
	phone: 'String',
	state: 'String',
	city: 'String',
	address: 'String',
	constituency: 'String',
	complaints: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Complaint'
		}
	],
	activities: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Activity'
		}
	]
});

module.exports = mongoose.model('User', UserSchema);
