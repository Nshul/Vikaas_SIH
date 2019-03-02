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
	Complaint.find({})
		.then((complaints) => {
			return res.send(complaints);
		})
		.catch((err) => {
			return res.send('error: db fetch complaints');
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

			complaint.author = req.body.user.id;
			complaint.save();
			res.redirect('complaints');
		}
	);
});

router.post('/upvote', (req, res) => {
	console.log('yo');
	console.log(req.body);

	Complaint.findById(req.body.complaintid)
		.then((complaint) => {
			if (complaint.upvoters.includes(req.body.user)) {
				console.log('found');
				let index = complaint.upvoters.indexOf(req.body.user);

				complaint.upvoters.splice(index, 1);
				complaint.save();

				return res.send('removed upvote');
			}

			if (complaint.downvoters.includes(req.body.user)) {
				let index = complaint.downvoters.indexOf(req.body.user);

				complaint.downvoters.splice(index, 1);
			}

			complaint.upvoters.push(req.body.user);
			complaint.save();

			return res.send('upvoted');
		})
		.catch((err) => {
			return res.send(err);
		});
});

router.post('/downvote', (req, res) => {
	console.log('yo');
	console.log(req.body);

	Complaint.findById(req.body.complaintid)
		.then((complaint) => {
			if (complaint.downvoters.includes(req.body.user)) {
				console.log('found');
				let index = complaint.downvoters.indexOf(req.body.user);

				complaint.downvoters.splice(index, 1);
				complaint.save();

				return res.send('removed downvote');
			}

			if (complaint.upvoters.includes(req.body.user)) {
				let index = complaint.upvoters.indexOf(req.body.user);

				complaint.upvoters.splice(index, 1);
			}

			complaint.downvoters.push(req.body.user);
			complaint.save();

			return res.send('downvoted');
		})
		.catch((err) => {
			return res.send(err);
		});
});

module.exports = router;
