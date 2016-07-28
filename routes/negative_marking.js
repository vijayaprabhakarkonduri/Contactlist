var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();


/*
 *getNegativeMarkingSheet
 */

/*
 * GET nagative marking sheet for the artifact.
 */
router.get('/getNegativeMarkingSheet', function(req, res) {
	var db = req.db;
	var collection = db.get('negativemarkingsheet');
	collection.find({"artifact_name": req.query.name},{},function(e,docs){
		res.json(docs[0]);
	});
});

/*
 * GET all artifact names.
 */
router.get('/getAllArtifactNames', function(req, res) {
	var db = req.db;
	var collection = db.get('negativemarkingsheet');
	collection.find({},{},function(e,docs){
		var artifacts = [];
		for (var i = 0; i < docs.length; i++) {
			artifacts.push({
				"artifact" : docs[i].artifact_name
			});
		};
		res.json(artifacts);
	});
});

module.exports = router;
