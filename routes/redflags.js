var express = require('express');

var router = express.Router();

/*
 *getRedFlags
 */

/*
 * GET minimum redflags.
 */
router.get('/getRedFlags', function(req, res) {
	var db = req.db;
	var collection = db.get('redflags');
	collection.find({},{},function(e,docs){
		res.json(docs);
	});
});


/*
 * GET all redflags.
 */
router.get('/getAllRedflags', function(req, res) {
	var db = req.db;
	var collection = db.get('redflags');
	collection.find({},{},function(e,docs){
		res.json(docs);
	});
});

module.exports = router;
