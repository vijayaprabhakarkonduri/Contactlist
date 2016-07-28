var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();

/*
 *getMyProjects
 *getSkills
 *getStrengthsAndWeakness
 *createNewProject
 *saveTimelines
 *getArtifacts
 *addArtifact
 *getReportCard
 *getTimelinesView
 *getCurrentProject
 *getArchivedProjects
 *sendGrade
 *getNotes
 *getMenteeProgress
 *getSuggestions
 *addNotes
 */


/*
 * GET Current project of the user.
 */
router.get('/getCurrentProject', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	collection.find({},{},function(e,docs){
		res.json(docs);
	});
});


/*
 * GET Archived project of the user.
 */
router.get('/getArchivedProjects', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	collection.find({},{},function(e,docs){
		res.json(docs);
	});
});


/*
 * GET Notes for project.
 */
router.get('/getNotes', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	collection.find({},{},function(e,docs){
		res.json(docs);
	});
});


/*
 * GET Progress of all mentees.
 */
router.get('/getMenteeProgress', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	collection.find({},{},function(e,docs){
		res.json(docs);
	});
});


/*
 * GET Suggestions of all mentees.
 */
router.get('/getSuggestions', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	collection.find({},{},function(e,docs){
		res.json(docs);
	});
});


/*
 * GET Get projects.
 */
router.get('/getMyProjects/:id', function(req, res) {
	var db = req.db;
	var status = req.params.status;
	var collection = db.get('projects');
	collection.find({mentee_id : req.params.id},{},function(e,docs){
		var project = [];
		for (var i = 0; i < docs.length; i++) {
			if (docs[i].project_status == "ongoing") {
				var artifacts = [];
				count = 0;
				for (var j = 0; j < docs[i].artifacts.length; j++) {
					artifacts.push({
						"artifact" : docs[i].artifacts[j].deliverable,
						"status" : docs[i].artifacts[j].review_status == 'completed' ? "done" : "incomplete"
					});
					if (docs[i].artifacts[j].review_status == "completed") {
						count++;
					}
				}
				project.splice(0,0,{
					"project_id" :  docs[i]._id,
					"task_id" : docs[i].task_id,
					"name" : docs[i].name,
					"last_update" : docs[i].last_update,
					"deadline" : docs[i].deadline,
					"artifacts" : artifacts,
					"doneartifacts" : count,
					"mentor" : docs[i].mentor,
					"status" : "ongoing"
				});
			} else if (docs[i].project_status == "recent") {
				var artifacts = [];
				var rating = 0;
				for (var j = 0; j < docs[i].artifacts.length; j++) {
					artifacts.push({
						"artifact" : docs[i].artifacts[j].deliverable,
						"grade" : docs[i].artifacts[j].mentor_grade.grade
					});
					rating = rating + parseFloat(docs[i].artifacts[j].mentor_grade.grade);
				}
				project.splice(0,0,{
					"project_id" :  docs[i]._id,
					"name" : docs[i].name,
					"task_id" : docs[i].task_id,
					"last_update" : docs[i].last_update,
					"mentor" : docs[i].mentor,
					"deadline" : docs[i].deadline,
					"marks" : artifacts,
					"rating" :  (rating/docs[i].artifacts.length).toFixed(1),
					"status" : "recent",
					"skills" : docs[i].final_grading.project_grading
				});
			}else  {
					//(docs[i].project_status == "archived") {
					var artifacts = [];
					var rating = 0;
					for (var j = 0; j < docs[i].artifacts.length; j++) {
						rating = rating + parseFloat(docs[i].artifacts[j].mentor_grade.grade);
					}
					project.splice(0,0,{
						"project_id" :  docs[i]._id,
						"name" : docs[i].name,
						"task_id" : docs[i].task_id,
						"last_update" : docs[i].last_update,
						"mentor" : docs[i].mentor,
						"rating" :  (rating/docs[i].artifacts.length).toFixed(1),
						"status" : "archived",
						"skills" : docs[i].final_grading.project_grading
					});
			}
		}
		
		res.json(project);
	});
});


/*
 * GET Skills of the user.
 */
router.get('/getSkills', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	collection.find({},{},function(e,docs){
		res.json(docs);
	});
});


/*
 * GET Strengths and weakness of tje user
 */
router.get('/getStrengthsAndWeakness', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	collection.find({},{},function(e,docs){
		res.json(docs);
	});
});


/*
 * GET Artifacts of project.
 */
router.get('/getArtifacts/:project_id', function(req, res) {
	var db = req.db;
	var project_id = req.params.project_id;
	var collection = db.get('projects');
	collection.find({_id:project_id},{},function(e,docs){
        res.json(docs[0]);
	});
});


/*
 * GET Artifacts of project.
 */
router.get('/getArtifactLink/:project_id/:artifact', function(req, res) {
	var db = req.db;
	var project_id = req.params.project_id;
	var collection = db.get('projects');
	collection.find({_id:req.params.project_id},{},function(e,docs){
        for (var i = 0; i < docs[0].artifacts.length; i++) {
        	if (docs[0].artifacts[i].deliverable ==  req.params.artifact) {
        		docs[0].artifacts[i].mentee_id = docs[0].mentee_id
        		res.json(docs[0].artifacts[i]);
        	}
        }
	});
});


/*
 * GET Artifacts of project.
 */
router.get('/getComments/:project_id/:artifact', function(req, res) {
	var db = req.db;
	var project_id = req.params.project_id;
	var collection = db.get('projects');
	collection.find({_id:req.params.project_id},{},function(e,docs){
        for (var i = 0; i < docs[0].artifacts.length; i++) {
        	if (docs[0].artifacts[i].deliverable ==  req.params.artifact) {
        		res.json(docs[0].artifacts[i].comments);
        	}
        }
	});
});


/*
 * GET link of the latest artifact.

router.get('/getArtifactLink', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	collection.find({_id: req.query.project_id, "artifacts.deliverable":req.query.artifact},{},function(e,docs){
		res.json(docs[0]);
	});
}); */


/*
 * GET Artifacts of project.
 */
router.get('/getTaskIdByProjectId/:project_id', function(req, res) {
	var db = req.db;
	var project_id = req.params.project_id;
	var collection = db.get('projects');
	collection.find({_id:project_id},{},function(e,docs){
        res.json(docs[0].task_id);
	});
});


/*
 * GET Report card for project.
 */
router.get('/getReportCard', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	collection.find({},{},function(e,docs){
		res.json(docs);
	});
});


/*
 * GET Timelines for the project.
 */
router.get('/getTimelinesView', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	collection.find({},{},function(e,docs){
		res.json(docs);
	});
});


/*
 * POST to projects.
 */
router.post('/saveTimelines', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	collection.insert(req.body, function(err,docsInserted){
		if (err) return;
   // Object inserted successfully.
		res.send(docsInserted._id);
	});
});




/*
 * POST to projects.
 */
router.post('/setTimelines', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');

	collection.insert(req.body, function(err, docsInserted){
		console.log(docsInserted._id);
		res.send(docsInserted._id);
	});

	collection.update(
		{project_status:"recent"},
		{
			$set: {
				project_status:  "archived"
			}			
		}
	);
});


/*
 * POST to projects.
 */
router.post('/addArtifact', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	collection.update(
		{_id:req.body.project_id, "artifacts.deliverable":req.body.artifact},
		{
			$set: {
				"artifacts.$.last_update":  req.body.last_update, "last_update" : req.body.last_update , "artifacts.$.review_status" : "request"
			},
			$push: {
				"artifacts.$.versions":{"version" : req.body.version } 
			}
			
		}
	);
});


/*
 * changeReviewStatus.
 */
router.post('/changeReviewStatus', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	collection.update(
		{_id:req.body.project_id, "artifacts.deliverable":req.body.artifact},
		{
			$set: {
				"artifacts.$.review_status":  req.body.status
			}			
		}
	);
});

/*
 * POSTS review marks.
 */
router.post('/saveGrade/:project_id/:artifact', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	
	collection.update(
		{_id:req.params.project_id, "artifacts.deliverable":req.params.artifact},
		{
			$set: {
				"artifacts.$.mentee_grade":  req.body, "artifacts.$.review_status":  "completed"
			}
			
		}
	);

	/*collection.find({_id:req.params.project_id},{},function(e,document){
		var status = count= 0;
		for (var i = 0; i < document[0].artifacts.length; i++) {
			if(document[0].artifacts[i].review_status == "completed"){
				count++;
			}
		};
		status = document[0].artifacts.length;
		console.log('*********************************************');
		console.log(status);
		console.log(count);	
		collection.update(
			{_id:req.params.project_id},
			{
				$set: {
					"review_status":  (count == status) ? "recent" : "ongoing"
				}
				
			}
		);
		status = document[0].artifacts.length;
	});*/
	

});


/*
 * POSTS review marks.
 */
router.post('/saveMentorGrade/:project_id/:artifact', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	
	collection.update(
		{_id:req.params.project_id, "artifacts.deliverable":req.params.artifact},
		{
			$set: {
				"artifacts.$.mentor_grade":  req.body, "artifacts.$.review_status":  "completed"
			}
			
		}
	);
});



/*
 * POSTS review marks.
 */
router.post('/postComment/:project_id/:artifact', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	collection.update(
		{_id:req.params.project_id, "artifacts.deliverable":req.params.artifact},
		{
			$push: {
				"artifacts.$.comments":  req.body
			}
			
		}
	);
});

/*
 * POSTS review marks.
 */
router.post('/postReply/:index/:project_id/:artifact', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	console.log('********************************************');
	console.log(req.body);
	var index = req.params.index;
	var setModifier = { $push: {} };
    setModifier.$push['artifacts.$.comments.' + index + '.replies'] = req.body;
	collection.update(
		{_id:req.params.project_id, "artifacts.deliverable":req.params.artifact},setModifier
	);
});


/*
 * POST to projects.
 */
router.post('/sendGrade', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	collection.insert(req.body, function(err, result){
		res.send(
			(err === null) ? { msg: '' } : { msg: err }
		);
	});
});



/*
 * POST to projects.
 */
router.post('/addNotes', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	collection.insert(req.body, function(err, result){
		res.send(
			(err === null) ? { msg: '' } : { msg: err }
		);
	});
});


/*
 * GET Artifacts of project.
 */
router.get('/getArtifactReviewStatus/:project_id/:artifact', function(req, res) {
	var db = req.db;
	var project_id = req.params.project_id;
	var artifact = req.params.artifact;
	var collection = db.get('projects');
	collection.find({_id:project_id},{},function(e,document){
		for (var i = 0; i < document[0].artifacts.length; i++) {
			if(document[0].artifacts[i].deliverable === artifact){
				var status = (document[0].artifacts[i].review_status);
				var deliverable = (document[0].artifacts[i].deliverable);
				res.json(status +","+ deliverable);
			}
		};

	});
});


/*
 * GET Artifacts of project.
 */
router.get('/getPeerScore/:project_id/:artifact', function(req, res) {
	var db = req.db;
	var project_id = req.params.project_id;
	var artifact = req.params.artifact;
	var collection = db.get('projects');
	collection.find({_id:project_id},{},function(e,document){
		for (var i = 0; i < document[0].artifacts.length; i++) {
			if(document[0].artifacts[i].deliverable === artifact){
				var peerScore = (document[0].artifacts[i].mentee_grade.grade);
				res.json(peerScore);
				console.log(peerScore);
			}
		};

	});
});


/*
 * Get mentor id by project id
 */
router.get('/getMenteeIdByProjectId/:project_id', function(req, res) {
	var db = req.db;
	var project_id = req.params.project_id;
	var collection = db.get('projects');
	collection.find({_id:project_id},{},function(e,docs){
        res.json(docs[0].mentee_id);
	});
});


/*
 * Get mentor id by project id
 */
router.get('/getMentorId/:project_id', function(req, res) {
	var db = req.db;
	var project_id = req.params.project_id;
	var collection = db.get('projects');
	collection.find({_id:project_id},{},function(e,docs){
        res.json(docs[0].mentor_id);
	});
});


router.post('/saveProjectGrading/:project_id', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	collection.update(
		{_id:req.params.project_id},
		{
			$set: {
				"final_grading":  req.body, "project_status":"recent"
			}
		}
	);
});

/*
 * POSTS review marks.
 */
router.post('/redflagmentee', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	var project_id = req.body.project_id;
	 collection.update(
		{_id: project_id},
		{
			$set: {
				"redflag": "Yes",
				"redflag_reason": req.body.Reason
			}
			
		}
	);
});


router.get('/getRedFlagsList/:id', function(req, res) {
	var db = req.db;
	var redflagprojects = []
	var collection = db.get('projects');
	collection.find({"redflag" : "Yes"},{},function(e,docs){
		
		for(i=0; i<docs.length; i++){
			redflagprojects.push({
				"mentee_id": docs[i].mentee_id,
				"mentor_id": docs[i].mentor_id,
				"project_id": docs[i]._id,
	            "project": docs[i].name,
	            "time": docs[i].last_update,
	            "mentor": docs[i].mentor,
	            "reason":docs[i].redflag_reason
			})
		}
		res.json(redflagprojects);
	});
});

/*
 * changeReviewStatus.
 */
router.post('/canclePeerreview/:project_id/:artifact_name', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	collection.update(
		{_id:req.body.project_id, "artifacts.deliverable":artifact_name},
		{
			$set: {
				"artifacts.$.review_status":  "request"
			}			
		}
	);
});



/*
 * GET Artifacts of project.
 */
router.get('/sharedProfileDetails/:id', function(req, res) {
	var db = req.db;
	var mentor_id = req.params.id;
	console.log(mentor_id);
	/*var notifications_collection = db.get('notifications');
	var projects_collection = db.get('projects');
	var users_collection = db.get('users');
	notifications_collection.find({_id:project_id},{},function(e,docs){
        res.json(docs[0].mentee_id);
	});*/
});


/*
 * changeReviewStatus.
 */
router.put('/cancleMentorReview/:project_id', function(req, res) {
	var db = req.db;
	var collection = db.get('projects');
	var project_id = req.params.project_id;
	console.log("bala");
	collection.update(
		{_id:project_id},
		{
			$set: {
				"project_status":  "request"
			}			
		}
	);
});

module.exports = router;
