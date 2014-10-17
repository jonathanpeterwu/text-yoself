var express = require('express');
var router = express.Router();
var Keen = require('keen.io');

var keen = Keen.configure({
    projectId: "<project_id>",
    writeKey: "<write_key>",
    readKey: "<read_key>",
    masterKey: "<master_key>"
});


/* GET home page. */
router.get('/', function(req, res) {
	// send back response
  res.render('index', { title: 'Express' });
});

router.get('/expenses', function(req, res) {

	var count = new Keen.Query("count", {
  event_collection: "expenses",
  group_by: "expense",
  timeframe: "this_7_days"
	});

	var total = count || 300;
  res.render('expenses', { total: total });
	// send back esponse for last 7 days using keen
});

router.post('/expenses/new', function(req, res) {
	var expense = req.body.total

	// send single event to Keen IO
	keen.addEvent("expenses", {"expense": expense}, function(err, res) {
	    if (err) {
	        console.log("Oh no, an error!");
	    } else {
	        console.log("Hooray, it worked!");
	    }
	});

});
module.exports = router;
