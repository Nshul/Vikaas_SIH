const express = require('express'),
	User = require('../models/user'),
	Complaint = require('../models/complaint'),
	router = express.Router({ mergeParams: true });

router.get('/testdb', (req, res) => {
	User.create({}, (err, user) => {
		if (err) {
			return res.send(err);
		}

		User.find({}, (err, user) => {
			if (err) {
				return res.send(err);
			}

			res.send(user);
		});
	});
});

router.get('/complaints', (req, res) => {
	Complaint.find({}, (err, complaints) => {
		if (err) {
			return res.send(err);
		}

		res.send(complaints);
	});
});

router.get('/addcomplaint', (req, res) => {
	res.render('complaint');
});

router.post('/addcomplaint', (req, res) => {
	Complaint.create(
		{
			upvotes: req.body.upvotes,
			downvotes: req.body.downvotes,
			description: req.body.description,
			title: req.body.title
		},
		(err, complaint) => {
			if (err) {
				return res.send(err);
			}

			res.redirect('complaints');
		}
	);
});

module.exports = router;
