const express = require('express'),
	Mp = require('../models/mp'),
	Complaint = require('../models/complaint'),
	router = express.Router({ mergeParams: true });

router.post('/addmp', (req, res) => {
	console.log('req', req.body);

	Mp.find({
		phone: req.body.phone
	})
		.then((mps) => {
			if (mps.length > 0) {
				return res.status(200).send('mp already exists');
			}

			Mp.create({
				name: req.body.name,
				phone: req.body.phone,
				state: req.body.state,
				city: req.body.city,
				address: req.body.address,
				office_address: req.body.officeAddress,
				constituency: req.body.constituency
			})
				.then((Mps) => {
					return res.status(200).send('mp added');
				})
				.catch((err) => {
					return res.status(200).send('error');
				});
		})
		.catch((err) => {
			console.log('ERROR: ', err);
			res.status(200).send('error');
		});
});

router.post('/addtoconsideration', (req, res) => {
	Complaint.findById(req.body.complaintid)
		.then((complaint) => {
			complaint.status = 'inconsideration';
			complaint.save();

			Mp.findById(req.body.mpid)
				.then((mp) => {
					mp.inconsideration.push(complaint);
					mp.save();

					return res.status(200).send('success');
				})
				.catch((err) => res.send('error'));
		})
		.catch((err) => res.status(200).send('error'));
});

router.post('/addtoapprove', (req, res) => {
	Complaint.findById(req.body.complaintid)
		.then((complaint) => {
			complaint.status = 'approved';
			complaint.save();

			Mp.findById(req.body.mpid)
				.then((mp) => {
					mp.approved.push(complaint);
					mp.save();

					return res.status(200).send('success');
				})
				.catch((err) => res.send('error'));
		})
		.catch((err) => res.status(200).send('error'));
});

router.get('/inconsiderationproblems', (req, res) => {
	Mp.findById(req.body.mpid)
		.populate('inconsideration')
		.exec()
		.then((mp) => {
			return mp.inconsideration;
		})
		.catch((err) => res.status(200).send('error'));
});

router.get('/approvedproblems', (req, res) => {
	Mp.findById(req.body.mpid)
		.populate('approved')
		.exec()
		.then((mp) => {
			return mp.approved;
		})
		.catch((err) => res.status(200).send('error'));
});

router.get('/mps', (req, res) => {
	console.log(req.body);

	Mp.find({})
		.populate('inconsideration')
		.populate('approved')
		.exec()
		.then((Mps) => {
			return res.status(200).send(Mps);
		})
		.catch((err) => res.status(200).send('error'));
});

module.exports = router;
