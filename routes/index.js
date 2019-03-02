const express = require('express'),
	router = express.Router({ mergeParams: true }),
	MongoClient = require('mongodb').MongoClient,
	ObjectId = require('mongodb').ObjectId,
	fs = require('fs-extra'),
	url = 'mongodb://vikaas:sih2019@ds029106.mlab.com:29106/sih',
	multer = require('multer'),
	Image = require('../models/image'),
	util = require('util'),
	upload = multer({ limits: { fileSize: 2000000 }, dest: '../uploads/' });

router.get('/', (req, res) => {
	return res.send('Hello');
});

router.get('/image', (req, res) => {
	return res.render('image');
});

router.post('/uploadpicture', upload.single('picture'), function(req, res) {
	if (req.file == null) {
		// If Submit was accidentally clicked with no file selected...
		res.render('index', { title: 'Please select a picture file to submit!' });
	} else {
		MongoClient.connect(url, function(err, db) {
			// read the img file from tmp in-memory location
			var newImg = fs.readFileSync(req.file.path);
			// encode the file as a base64 string.
			var encImg = newImg.toString('base64');
			// define your new document
			var newItem = {
				description: req.body.description,
				contentType: req.file.mimetype,
				size: req.file.size,
				img: Buffer(encImg, 'base64')
			};

			console.log(newItem);

			Image.create(newItem)
				.then((err, image) => {
					fs.remove(req.file.path, function(err) {
						if (err) {
							console.log(err);
						}
						res.send('Thanks for the Picture!');
					});
				})
				.catch((err) => {
					console.log(err);
					res.send(err);
				});
		});
	}
});

module.exports = router;
