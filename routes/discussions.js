var express = require('express');

var router = express.Router();

/*
discussionList  GET
addDiscussion  POST
discussionThread  GET
addMessageInDiscussion  PUT
addMemberInDiscussion  PUT

*/


/*
 * (POST) START/Initiate a discussion.
 */
router.post('/addDiscussion', function(req, res) {
    var db = req.db;
    var collection = db.get('discussions');

    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '', discussion_id: result._id } : { msg: err }
        );
    });
});


/*
 * (PUT) Update the Discussion with individual message/comment.
 */
router.put('/addMessageInDiscussion', function(req, res) {
    var db = req.db;
    var collection = db.get('discussions');

    collection.update(
        {"_id": req.body.id}, 
        {
            $push: {"messages": req.body.message}
        }, function(err, result){
            res.send(
                (err === null) ? { msg: '' } : { msg: err }
            );
        });
});


/*
 * (PUT) Update the Discussion by adding members.
 */
router.put('/addMemberInDiscussion', function(req, res) {
    var db = req.db;
    var discussions_collection = db.get('discussions');
    var users_collection = db.get('users');
    
    users_collection.findOne( {"_id": req.body.member}, {}, function(err, doc) {
        var user = {
            name: doc.name,
            image: doc.image
        };
        
        discussions_collection.update(
            {"_id": req.body.id}, 
            {
                $push: {"members": req.body.member}
            }, function(err, result){
                var response = {};
                if(err === null) {
                    response.user = user;
                    response.msg = '';
                } else {
                    response.msg = err;
                }
                res.json(response);
            });
    });
});


/*
 * GET getDiscussions. //"owner": owner_id
 */
router.get('/getDiscussions', function(req, res) {
    var db = req.db;
    var discussions_collection = db.get('discussions');
    var users_collection = db.get('users');
    owner_id = req.query.id;
    
    users_collection.find({},{}, function(err,documents) {
        var users = documents, discussions = [];
        discussions_collection.find({"members": owner_id},{},function(e,docs){
            docs.forEach(function(element, index, array) {
                var discussion = {
                    id: element._id, 
                    title: element.title, 
                    task: element.description,
                    messages: element.messages,
                    owner: element.owner,
                    members: []
                };
                
                users.forEach(function(el, idx, arr) {
                    element.members.forEach(function(e, i, a) {
                        if(e == el._id) {
                            discussion.members.push({
                                id: e,
                                image: el.image,
                                name: el.name
                            });
                        }
                    });
                });
                
                discussions.push(discussion);

            });
            res.json(discussions);
                
        });
        
    });

    
    

    //discussions_collection.find({"members": owner_id},{},function(e,docs){
        //var discussions = [], results = docs;


        /*for (var i = 0; i < docs.length; i++) {
            discussions.push({
                id: docs[i]._id, 
                title: docs[i].title, 
                task: docs[i].description,
                messages: docs[i].messages,
                owner: docs[i].owner,
                members: docs[i].members
            });
        };*/


//console.log(discussions);

        //res.json(discussions);
    //});
});


/*
 * GET discussionThread.
 */
router.get('/discussionThread/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('discussions');
    discussion_id = req.params.id;
    collection.find({"_id": discussion_id},{},function(e,docs){
        var thread = {};
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






module.exports = router;