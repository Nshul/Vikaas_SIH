const express = require('express'),
	router = express.Router({ mergeParams: true }),
	fs = require('fs-extra'),
	Complaint = require('../models/complaint'),
	multer = require('multer'),
	Image = require('../models/image'),
	upload = multer({ limits: { fileSize: 2000000 }, dest: '../uploads/' });

router.get('/', (req, res) => {
	return res.status(200).send('Hello');
});

router.get('/image', (req, res) => {
	return res.render('image');
});

router.post('/uploadpicture', upload.single('picture'), function(req, res) {
	if (req.file == null) {
		// If Submit was accidentally clicked with no file selected...
		res.render('index', { title: 'Please select a picture file to submit!' });
	} else {
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
					res.status(200).send('Thanks for the Picture!');
				});
			})
			.catch((err) => {
				console.log(err);
				res.status(200).send(err);
			});
	}
});

router.get('/images', (req, res) => {
	Complaint.findById('5c7b0570ea88e277188a8b39').then((complaint) => {
		let img = complaint.image;
		res.setHeader('content-type', 'image/jpeg');
		res.status(200).send(img);
	});
});

module.exports = router;
