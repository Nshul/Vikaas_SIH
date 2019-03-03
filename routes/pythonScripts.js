const express = require('express'),
  router = express.Router({ mergeParams: true }),
  { PythonShell } = require('python-shell'),
  Complaint = require('../models/complaint');

let complaints = [];
let fetchedComplaints = false;

router.post('/predictiveSearch', (req, res) => {
  const { complaints } = req.body;
  if (!fetchedComplaints) {
    // Complaint.find({}).then(complaint => {
    //   complaints.push(complaint);
    // });
    console.log(req.body);
    console.log('fetchedComplaints was false');
    // complaints = [
    //   { index: 1, description: 'There is water shortage in our region' },
    //   { index: 2, description: 'Parking Issue in area' },
    //   { index: 3, description: 'Water is limited so save water' },
    // ];
    const options = {
      pythonPath: __dirname + '/../pythonSRC/bin/python3',
      args: [req.body.sentence, JSON.stringify(complaints)],
    };
    fetchedComplaints = true;
    setTimeout(function() {
      fetchedComplaints = false;
    }, 20000);
    PythonShell.run(
      __dirname + '/../src/Python/Search.py',
      options,
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(JSON.stringify(data));
          res.json(data);
        }
      }
    );
  } else {
    console.log('fetchedComplaints was true');
    // complaints = [
    //   { index: 1, description: 'There is water shortage in our region' },
    //   { index: 2, description: 'Parking Issue in area' },
    //   { index: 3, description: 'Water is limited so save water' },
    // ];
    const options = {
      pythonPath: __dirname + '/../pythonSRC/bin/python3',
      args: [req.body.sentence, JSON.stringify(complaints)],
    };
    PythonShell.run(
      __dirname + '/../src/Python/Search.py',
      options,
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
          res.json(data);
        }
      }
    );
  }
});

router.post('/summarizetext', (req, res) => {
  const { description } = req.body;
  const options = {
    pythonPath: __dirname + '/../pythonSRC/bin/python3',
    args: [description],
  };
  PythonShell.run(
    __dirname + '/../src/Python/summarizer.py',
    options,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(JSON.stringify(data));
        res.json(data);
      }
    }
  );
});

router.post('/sentimentAnalysis', (req, res) => {
  const { comments } = req.body;
  const options = {
    pythonPath: __dirname + '/../pythonSRC/bin/python3',
    args: [JSON.stringify(comments)],
  };
  PythonShell.run(
    __dirname + '/../src/Python/Sentiment Analysis.py',
    options,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(JSON.stringify(data));
        res.json(data);
      }
    }
  );
});

module.exports = router;
