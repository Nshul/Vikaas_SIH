var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
	description: String,
	contentType: String,
	size: Number,
	img: Buffer
});

module.exports = mongoose.model('Image', imageSchema);
