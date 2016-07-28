var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();

/*
 * GET Artifacts of project.
 */
router.get('/getCurriculum', function(req, res) {
	var obj = [{
		month: "Month 1",
		active: true,
		curriculum: [{
			"time" : "week1",
			"topic": "Orientation, Timelines (estimation), UI/UX progressions, Survival tips for the program, Grading rules, Rules of program -- working hours etc., Design Brief.",
			"remarks": "No Extensions Do a sample project end to end."
	    },{
			"time" : "week2",
			"topic": "Flowcharts, User scenarios",
			"remarks": "HW: 3-4 flow chart exersizes. Web standards, Intro to UI framwwork, Latest Trends."
	    },{
			"time" : "week3",
			"topic": "Flowcharts and Workflows with scenarios.",
			"remarks": "HW: Convert Irctc / Pan / Amazon into a Flowcharts and Workflow.."
	    },{
			"time" : "week4",
			"topic": "Flowchart, Workflows, & Paper Wireframes,User scenarios & Information Architecture.",
			"remarks": "HW: Improve on IRCTC/PAN and deliver Flowcharts, Workflows and Paper Wireframes."
	    }]
	}, {
		month: "Month 2",
		curriculum: [{
			"time" : "week1",
			"topic": "Orientation, Timelines (estimation), UI/UX progressions, Survival tips for the program, Grading rules, Rules of program -- working hours etc., Design Brief.",
			"remarks": "No Extensions Do a sample project end to end."
	    },{
			"time" : "week2",
			"topic": "Flowcharts, User scenarios",
			"remarks": "HW: 3-4 flow chart exersizes. Web standards, Intro to UI framwwork, Latest Trends."
	    },{
			"time" : "week3",
			"topic": "Flowcharts and Workflows with scenarios.",
			"remarks": "HW: Convert Irctc / Pan / Amazon into a Flowcharts and Workflow.."
	    },{
			"time" : "week4",
			"topic": "Flowchart, Workflows, & Paper Wireframes,User scenarios & Information Architecture.",
			"remarks": "HW: Improve on IRCTC/PAN and deliver Flowcharts, Workflows and Paper Wireframes."
	    }]
	}, {
		month: "Month 3",
		curriculum: [{
			"time" : "week1",
			"topic": "Orientation, Timelines (estimation), UI/UX progressions, Survival tips for the program, Grading rules, Rules of program -- working hours etc., Design Brief.",
			"remarks": "No Extensions Do a sample project end to end."
	    },{
			"time" : "week2",
			"topic": "Flowcharts, User scenarios",
			"remarks": "HW: 3-4 flow chart exersizes. Web standards, Intro to UI framwwork, Latest Trends."
	    },{
			"time" : "week3",
			"topic": "Flowcharts and Workflows with scenarios.",
			"remarks": "HW: Convert Irctc / Pan / Amazon into a Flowcharts and Workflow.."
	    },{
			"time" : "week4",
			"topic": "Flowchart, Workflows, & Paper Wireframes,User scenarios & Information Architecture.",
			"remarks": "HW: Improve on IRCTC/PAN and deliver Flowcharts, Workflows and Paper Wireframes."
	    }]
	}, {
		month: "Month 4",
		curriculum: [{
			"time" : "week 1",
			"topic": "Orientation, Timelines (estimation), UI/UX progressions, Survival tips for the program, Grading rules, Rules of program -- working hours etc., Design Brief.",
			"remarks": "No Extensions Do a sample project end to end."
	    },{
			"time" : "week 2",
			"topic": "Flowcharts, User scenarios",
			"remarks": "HW: 3-4 flow chart exersizes. Web standards, Intro to UI framwwork, Latest Trends."
	    },{
			"time" : "week 3",
			"topic": "Flowcharts and Workflows with scenarios.",
			"remarks": "HW: Convert Irctc / Pan / Amazon into a Flowcharts and Workflow.."
	    },{
			"time" : "week 4",
			"topic": "Flowchart, Workflows, & Paper Wireframes,User scenarios & Information Architecture.",
			"remarks": "HW: Improve on IRCTC/PAN and deliver Flowcharts, Workflows and Paper Wireframes."
	    }]
	}];
	
	res.json(obj);
});

module.exports = router;
