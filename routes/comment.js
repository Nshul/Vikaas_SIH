const express = require('express'),
	Comment = require('../models/comment'),
	User = require('../models/user'),
	Complaint = require('../models/complaint'),
	router = express.Router({ mergeParams: true });

router.post('/comment', (req, res) => {
	console.log(req.body);

	Complaint.findById(req.body.complaintid)
		.then((Complaint) => {
			Comment.create({
				name: req.body.name,
				phone: req.body.phone,
				state: req.body.state,
				city: req.body.city,
				constituency: req.body.constituency
			})
				.then((Comment) => {
					Comment.author.id = req.body.user._id;
					Comment.author.name = req.body.user.name;
					Comment.save();

					Complaint.comments.push(Comment);
					Complaint.save();

					return res.send('comment added successfully');
				})
				.catch((err) => {
					return res.send('error: db create comment');
				});
		})
		.catch((err) => {
			return res.send('error: complaint find');
		});
});

module.exports = router;
