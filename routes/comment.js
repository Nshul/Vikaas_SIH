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
				text: req.body.text
			})
				.then((Comment) => {
					Comment.author.id = req.body.userid;
					Comment.author.name = req.body.username;
					Comment.save();

					Complaint.comments.push(Comment);
					Complaint.save();

					return res.status(200).send('success');
				})
				.catch((err) => {
					return res.status(200).send('error');
				});
		})
		.catch((err) => {
			return res.status(200).send('error');
		});
});

module.exports = router;
