const express = require('express'),
  User = require('../models/user'),
  Complaint = require('../models/complaint'),
  multer = require('multer'),
  fs = require('fs-extra'),
  router = express.Router({ mergeParams: true }),
  upload = multer({ limits: { fileSize: 2000000 }, dest: '../uploads/' });

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
    .populate('comments')
    .exec((err, complaints) => {
      if (err) {
        return res.send(err);
      }
      return res.send(
        complaints.filter(complaint => {
          return complaint.constituency === req.body.constituency;
        })
      );
    });
});
router.get('/complaints-ga', (req, res) => {
  Complaint.find({ status: 'new' }).then(complaints => {
    //   console.log(complaints);
    var problems = [];
    var upvotes = [];
    var duration = [];
    var funds = [];
    var points = [];
    for (var i = 0; i < complaints.length; ++i) {
      problems.push(complaints[i].description);
      upvotes.push(complaints[i].upvotes - complaints[i].downvotes);
      duration.push(Math.floor(Math.random() * (30 - 20 + 1)) + 20);
      funds.push(Math.floor(Math.random() * (400 - 100 + 1)) + 100);
      var latlon = [complaints[i].latitude, complaints[i].longitude];
      points.push(latlon);
    }

    //console.log(complaints);
    var myPythonScriptPath = './ga.py';

    // Use python shell
    var { PythonShell } = require('python-shell');

    var options = {
      pythonPath: './venv/bin/python3',
      args: [complaints.length, problems, upvotes, duration, fund],
    };

    PythonShell.run('./ga.py', options, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
      var output = [];
      var index = -1;
      //console.log(data[0].length);
      for (var i = 0; i < data[0].length; i++) {
        if (data[0][i] === '0' || data[0][i] === '1') index++;
        if (data[0][i] === '1') {
          output.push(complaints[index].description);
        }
      }
      console.log(complaints);
      console.log(output);
    });
  });
  return res.send('error: db fetch complaints');
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
      title: req.body.title,
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

router.post('/newcomplaint', (req, res) => {
  // console.log('req', req);
  // console.log(req.body.picture);
  // console.log(req.file);
  // console.log(req.body.picture);

  var newComplaint = {
    description: req.body.description,
    title: req.body.title,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };

  if (req.body.picture != null) {
    // let newImg = fs.readFileSync(req.file.path);
    // let encImg = newImg.toString('base64');
    // console.log(encImg);

    // newComplaint.image = Buffer(req.body.picture, 'base64');
    newComplaint.image = req.body.picture;
  }

  console.log(newComplaint);

  Complaint.create(newComplaint, (err, complaint) => {
    if (err) {
      return res.send(err);
    }

    complaint.author = '5c7ac2a1f6dbda4520d4f1bb';
    console.log(complaint);
    complaint.save();

    // fs.remove(req.file.path, function(err) {
    // 	if (err) {
    // 		return res.send(err);
    // 	}
    // });

    return res.send(complaint);
  });
});

router.post('/upvote', (req, res) => {
  // console.log('yo');
  // console.log(req.body);

  Complaint.findById(req.body.complaintid)
    .then(complaint => {
      if (complaint.upvoters.includes(req.body.user)) {
        // console.log('found');
        let index = complaint.upvoters.indexOf(req.body.user);

        complaint.upvoters.splice(index, 1);
        complaint.upvotes -= 1;
        complaint.save();

        return res.send('removed upvote');
      }

      if (complaint.downvoters.includes(req.body.user)) {
        let index = complaint.downvoters.indexOf(req.body.user);

        complaint.downvotes -= 1;
        complaint.downvoters.splice(index, 1);
      }

      complaint.upvotes += 1;
      complaint.upvoters.push(req.body.user);
      complaint.save();

      return res.send('upvoted');
    })
    .catch(err => {
      return res.send(err);
    });
});

router.post('/downvote', (req, res) => {
  // console.log('yo');
  // console.log(req.body);

  Complaint.findById(req.body.complaintid)
    .then(complaint => {
      if (complaint.downvoters.includes(req.body.user)) {
        // console.log('found');
        let index = complaint.downvoters.indexOf(req.body.user);

        complaint.downvotes -= 1;
        complaint.downvoters.splice(index, 1);
        complaint.save();

        return res.send('removed downvote');
      }

      if (complaint.upvoters.includes(req.body.user)) {
        let index = complaint.upvoters.indexOf(req.body.user);

        complaint.upvotes -= 1;
        complaint.upvoters.splice(index, 1);
      }

      complaint.downvotes += 1;
      complaint.downvoters.push(req.body.user);
      complaint.save();

      return res.send('downvoted');
    })
    .catch(err => {
      return res.send(err);
    });
});

module.exports = router;
