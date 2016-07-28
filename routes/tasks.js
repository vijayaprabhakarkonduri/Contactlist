var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();


/*
 *addtask
 *tasklist
 *updatetask
 *deletetask
 *assignTask
 *suggestTask
 */


/*
 * POST to assignTask.
 */
router.post('/assignTask', function(req, res) {
    var db = req.db;
    var collection = db.get('tasks');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


/*
 * POST to suggestTask.
 */
router.get('/suggestSkillKey/:skill', function(req, res) {
    var db = req.db;
    var collection = db.get('skills');
    var skill = req.params.skill;
    collection.find({skill: { $regex : skill }},{},function(e,docs){
        var tasks = [];
        for (var i = 0; i < docs.length; i++) {
            tasks.push({
                skill: docs[i].skill
            });
        };
        res.json(tasks);
    });
});

/*
 * POST to suggestTask.
 */
router.get('/suggestTask/:skill', function(req, res) {
    var db = req.db;
    var collection = db.get('tasks');
    var skill = req.params.skill;
    collection.find({skills_required:new RegExp(skill)},{},function(e,docs){
        var tasks = [];
        for (var i = 0; i < 2; i++) {
            tasks.push({
                id: docs[i]._id, 
                title: docs[i].task_name, 
                task: docs[i].short_description,
                task_details: docs[i].task_details,
            });
        };
        res.json(tasks);
    });
});


/*
 * POST to addtask.
 */
router.post('/addtask', function(req, res) {
    var db = req.db;
    var collection = db.get('tasks');
    collection.insert(req.body, function(err, docsInserted){
        console.log(docsInserted._id);
        res.send(docsInserted._id);
    });
});


/*
 * GET tasklist.
 */
router.get('/tasklist', function(req, res) {
    var db = req.db;
    var collection = db.get('tasks');
    collection.find({},{},function(e,docs){
        var tasks = [];
        for (var i = 0; i < docs.length; i++) {
            tasks.splice(0,0,{
                id: docs[i]._id, 
                title: docs[i].task_name, 
                task: docs[i].short_description,
                task_details: docs[i].task_details,
                skills_required: docs[i].skills_required,
            });
        };
        res.json(tasks);
    });
});

/*
 * GET task by taskid.
 */
router.get('/taskById/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('tasks');
    var taskid = ObjectId(req.params.id);
    collection.find({_id:taskid},{},function(e,docs){
        var tasks = {
            task_name: docs[0].task_name,
            short_description: docs[0].short_description,
            skills_required: docs[0].skills_required,
            task_details: docs[0].task_details
        };        
        res.json(tasks);
    });
});


/*
* PUT to updatetask
*/
router.put('/updatetask/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('tasks');
    var userToUpdate = req.params.id;
    console.log(req.params);
    collection.update(
    	{ _id: userToUpdate }, 
    	{
	      $set: req.body
	   	},
	   	{ upsert: true }, 
	   	function(err, result){
	        res.send(
	            (err === null) ? { msg: '' } : { msg: err }
	        );
	    });
});


//db.COLLECTION_NAME.update(SELECTIOIN_CRITERIA, UPDATED_DATA)
//https://mongodb.github.io/node-mongodb-native/markdown-docs/insert.html
//https://docs.mongodb.com/v2.6/reference/operator/update/positional/


/*
 * DELETE to deletetask.
 */
router.delete('/deletetask/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('tasks');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


module.exports = router;