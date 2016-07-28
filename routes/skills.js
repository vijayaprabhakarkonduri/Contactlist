var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();

/*
 * GET Artifacts of project.
 */
router.get('/getSkills', function(req, res) {
	var obj = [{
			skill : "Design Brief",
			type : "technical"
		},{
			skill : "Workflow",
			type : "technical"
		},{
			skill : "Alignments",
			type : "technical"
		},{
			skill : "Consistency",
			type : "technical"
		},{
			skill : "Flowcharts",
			type : "technical"
		},{
			skill : "Prototypes",
			type : "technical"
		},{
			skill : "Interactions",
			type : "technical"
		},{
			skill : "Variations",
			type : "technical"
		},{
			skill : "Presentaion",
			type : "soft"
		},{
			skill : "Patience",
			type : "soft"
		},{
			skill : "Navigation",
			type : "technical"
	}]
	res.json(obj);
});

module.exports = router;
