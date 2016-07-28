var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();


/*
 * POST to requestPeerReview.
 */
router.post('/requestPeerReview', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


/*
 * GET to getNotificationById. //Return notification by notification in the collection
 */
router.get('/getNotificationById/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');

    var notification_id = ObjectId(req.params.id);

    collection.find(
        { "_id": notification_id}, 
        { },
        function(e,docs){
            res.json(docs);
        });
});


/*
getPeerReviewRequest GET
peerReviewRequest POST 
sendTimelinesExtension  POST
requestForMentorReview  POST
getMentorNotifications  GET
getSharedMentee  GET
rejectTimelineRequest  DELETE
sendToInstructor  POST
getNotifications  GET
getPassiveNotification  GET
*/


/*
 * POST to  .
 */
router.post('/sendTimelinesExtension', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});




/*
 * POST to  .
 */
router.post('/requestForMentorReview', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


/*
 * POST to  .
 */
router.post('/sendToInstructor', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


/*
 * GET .
 */
router.get('/getPeerReviewRequest', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');
    collection.find({},{},function(e,docs){
        var tasks = [];
        for (var i = 0; i < docs.length; i++) {
            tasks.push({
                /*id: docs[i]._id, 
                title: docs[i].task_name, 
                task: docs[i].short_description,
                task_details: docs[i].task_details,*/
            });
        };
        res.json(tasks);
    });
});



/*
 * GET .

router.get('/getMentorNotifications/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');
    collection.find({_id : req.params.id},{},function(e,docs){
        var tasks = [];
        for (var i = 0; i < docs.length; i++) {
            tasks.push({
                id: docs[i]._id, 
                title: docs[i].task_name, 
                task: docs[i].short_description,
                task_details: docs[i].task_details,
            });
        };
        res.json(tasks);
    });
}); */


/*
 * GET .
 */
router.get('/getNewTask', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');
    collection.find({},{},function(e,docs){
        var tasks = [];
        for (var i = 0; i < docs.length; i++) {
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
 * GET .
 */
router.get('/getSharedMentee', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');
    collection.find({},{},function(e,docs){
        var tasks = [];
        for (var i = 0; i < docs.length; i++) {
            tasks.push({
                /*id: docs[i]._id, 
                title: docs[i].task_name, 
                task: docs[i].short_description,
                task_details: docs[i].task_details,*/
            });
        };
        res.json(tasks);
    });
});


/*
 * GET  all notifications of the instructor.
 */
router.get('/getAllInstructorNotifications', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');
    collection.find({to:"instructor"},{},function(e,docs){
        res.json(docs);
    });
});


/*
 * GET .
 */
router.get('/getPassiveNotification', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');
    collection.find({},{},function(e,docs){
        var tasks = [];
        for (var i = 0; i < docs.length; i++) {
            tasks.push({
                /*id: docs[i]._id, 
                title: docs[i].task_name, 
                task: docs[i].short_description,
                task_details: docs[i].task_details,*/
            });
        };
        res.json(tasks);
    });
});


/*
 * DELETE .
 */
router.delete('/rejectTimelineRequest/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


/*
 * POST to assignTask.
 */
router.post('/assignTask', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');
    console.log("##########################################################################");
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


/*
 * POST to assignTask.
 */
router.post('/modifyAssignTask', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');
    console.log("##########################################################################");
    collection.update(
        {type:  "pending", mentor_id: req.body.mentor_id},
        {
            $set: {
                "type" : "new project", "task_id" : req.body.task_id
            }
        },{multi: true}
    );
});



/*
 * POST to addtask.
 */
router.post('/notificationToInstructor', function(req, res) {
    var db = req.db;
    console.log("##########################################################################");
    console.log(req.body);
    var collection = db.get('notifications');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: result._id } : { msg: err }
        );
    });
});


/*
 * DELETE .
 */
router.delete('/discardNotification/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');
    var taskToDelete = req.params.id;
    collection.remove({ '_id' : taskToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

/*
 * POST to addtask.
 */
router.post('/notificationtomentor', function(req, res) {
    var db = req.db;
    console.log(req.body);
    var collection = db.get('notifications');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: result._id } : { msg: err }
        );
    });
});


/*
 * GET .
 */
router.get('/getMentorNotifications/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');
    var user_id = req.params.id;
    console.log(user_id);
    collection.find({mentor_id:user_id},{},function(e,docs){
        res.json(docs);
        console.log(docs);
    });

});

/*
 * GET .
 */
router.get('/getMenteeNotifications/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');
    var user_id = req.params.id;
    collection.find({"mentee_id":user_id },{},function(e,docs){
            res.json(docs);
    });

});


/*
 * GET Artifacts of project.
 */
router.get('/getTaskIdByNotificationId/:notification_id', function(req, res) {
    var db = req.db;
    var notification_id = req.params.notification_id;
    var collection = db.get('notifications');
    collection.find({_id:notification_id},function(e,docs){
        console.log(docs);
        res.json(docs);
    });
});


/*
 * GET Artifacts of project.
 */
router.get('/deleteNotification/:notification_id', function(req, res) {
    var db = req.db;
    var notification_id = req.params.notification_id;
    var collection = db.get('notifications');
    collection.remove({_id:notification_id});
});


/*
 * POST to adduser.
 */
router.post('/shareProfile', function(req, res) {
    console.log(req.body)
    var db = req.db;
    var collection = db.get('notifications');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


/*
 * POST to  .
 */
router.post('/createProjectPassiveNotification', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});



/*
 * POST:: Send add member to discussion thread notification.
 */
router.post('/addMemberInDiscussion', function(req, res) {
    var db = req.db;
    var collection = db.get('notifications');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * GET:: Receive add member to discussion thread notification.
 */
router.get('/addMemberInDiscussion', function(req, res) {
    var user_id = req.query.id;

    var db = req.db;
    var notifications_collection = db.get('notifications');
    var discussions_collection = db.get('discussions');
    
    notifications_collection.col.aggregate([ {
        $match: { "member": user_id } //key is recipient(one who receives) id of the notification
    }, { 
        //$group: { _id : "$type", "notifications": { $push: "$$ROOT"} } 
        $group: { _id : "$type", "notifications": { $push: { id: "$id" }} } 
    }], function(e,docs){
        var user_notifications = docs;
        
        discussions_collection.find({},{},function(error,documents){
            var user_discussions = documents, notifications = [];
            
            //Based on the type of notification, db call will be made to specific collections
            user_notifications.forEach(function(element, index, array) {
                
                //E.G.>> type: 'new member in discussion', collection: 'discussions'
                switch(element._id) {
                    case "new member in discussion":
                        notifications.new_member_in_discussion = [];
                        element.notifications.forEach(function(ele, idx, arr) {
                            user_discussions.forEach(function(e, i, a) {
                                if(ele.id == e._id) {
                                    custom_object = e; //Show only the columns/fields you want to use in the notification
                                    notifications.new_member_in_discussion.push(custom_object);
                                }
                            });
                        });
                    
                        break;
                    default:
                        console.log("default");    
                }
            });
            console.log(notifications);
            res.json(notifications);
        });
    });
});

module.exports = router;