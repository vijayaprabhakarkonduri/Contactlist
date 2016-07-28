var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();
var multer = require('multer');
var path = require('path');
//var MulterResizer = require('multer-resizer');


/*
 * GET userlist. Return all the users of the system
 */
router.get('/getAllUsers', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({},{ fields : { password: 0, type: 0, batch: 0, mentor_id: 0 } },function(e,docs){
        res.json(docs);
    });
});

/*
 * GET last batch number.
 */
router.get('/getLastBatch', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.col.aggregate([{ $sort: {'batch':-1}}], function(e,docs){
        if (docs[0].batch) {
            res.json(docs[0].batch);
        } else {
            res.json("0");
        }
        
    });
});

/*
 * POST to addBatch. Adding a user to the system. Google email id will be used.
    Inserting multiple documents to Mongodb using node.js
 */

router.post('/addBatch/:batch', function(req, res) {
    var db = req.db;
    var batch = req.params.batch;
    var collection = db.get('users');
    var new_batch = [];
    for (var i = 0; i < req.body.length; i++) {
        new_batch.push({
            "username":req.body[i].email,
            "type":"mentee",
            "password":"mentee",
            "name":req.body[i].email.split('@')[0],
            "batch":batch
        });
        /*collection.insert(new_batch, function(err, result){
            res.send(
                (err === null) ? { msg: '' } : { msg: err }
            );
        });*/
    }

    collection.col.insert(new_batch, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    })
});


/*
getProfile  GET
updateProfile  PUT
getMentor  GET
shareMentorProfile  POST
getStudents  GET 
getMentorReviews  GET
getMentorsAndMentees  GET
shufflingDone  PUT 
addBatch  POST
*/


/*
 * GET getProfile. Returns the profile by user id
 */
router.get('/getProfile/:username', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    var user_id = req.params.username;
    collection.find({ username: user_id },{},function(e,docs){
        var user_details = {
            "Name":docs[0].name,
            "Email_ID":docs[0].username,
            "Phone_Number":(typeof docs[0].phone_number !== "undefined") ? docs[0].phone_number : '',
            "Personal_Email_ID":(typeof docs[0].personalmail !== "undefined") ? docs[0].personalmail : '',
            "Mentor_id": (typeof docs[0].mentor_id !== "undefined") ? docs[0].mentor_id : ''
        }
        res.json(user_details);
    });
});

router.get('/getProfileByUserid', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    var user_id = req.query.id;

    collection.find({ "_id": user_id },{ fields : { password: 0, type: 0, batch: 0, mentor_id: 0 } },function(e,docs){
        res.json(docs[0]);
    });
});


/*
 * GET Name of the user. Return the user name
 */
router.get('/getUserName/:id', function(req, res) {
    var db = req.db;
    var user_id = ObjectId(req.params.id);
    console.log(user_id + "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    var collection = db.get('users');
    //var user_id = req.params.id;
    collection.find({"_id":user_id},{},function(e,docs){
        if(docs[0]){
            res.json(docs[0].name);   
        }else{
            res.json("");
        }
      
    });
});

/*
 * GET username. Return the name of the user
 */
router.get('/getNameByUserName/:name', function(req, res) {
    var db = req.db;
    var username= req.params.name;
    var collection = db.get('users');
    //var user_id = req.params.id;
    collection.find({"username":username},{},function(e,docs){
        if (docs.length > 0 && (typeof docs[0].name !== "undefined") ){
            var username = {
                "mentee_name" : docs[0].name,
                "mentee_id" : docs[0]._id
            }
            res.json(username);
        }
    });
});


/*
 * GET userlist. Return users by type mentee
 */
router.get('/getStudentsByBatch', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    /*collection.find({ type: 'mentee' },{},function(e,docs){
        res.json(docs);
    });*/

    collection.col.aggregate([ {$match:{"type":"mentee"}},{ $group: { _id : "$batch", users: { $push: "$$ROOT"}}}], function(e,docs){
        res.json(docs);
    });
});


/*
 * GET userlist.
 */
router.get('/getMentorReviews', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


/*
 * POST to adduser.
 */
router.post('/shareMentorProfile', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        //req.body.image_folder = path.join(__dirname + '/../public/users');
        cb(null, path.join(__dirname + '/../public/users'));
    },
    filename: function (req, file, cb) {
        var user_id = req.body.id;
        var filename = user_id + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        req.body.filename = filename;
        cb(null, filename);
    }
});

var loader = multer( {storage: storage} );
/*
var resizer = new MulterResizer({
    multer: multer({storage: storage}),
    tasks: [{
        resize: {
            width: 16,
            suffix: '_xs',
            format: 'jpg'
        }
    },{
        resize: {
            width: 32,
            suffix: '_s',
            format: 'jpg'
        }
    },{
        resize: {
            width: 64,
            suffix: '_m',
            format: 'jpg'
        }
    },{
        resize: {
            width: 128,
            suffix: '_l',
            format: 'jpg'
        }
    }]
});
*/
/** API path that will upload the files */
router.post('/upload', loader.single('file'), function(req, res, next) {
    // All multer-resizer tasks were completed
    res.json({error_code:0,err_desc:null, filename: req.body.filename});
});


/*
* PUT to updateProfile: Updating user/profile by the user id
*/
router.put('/updateProfile', function(req, res) {
    
    var db = req.db;
    var collection = db.get('users');
    console.log(req.body);

    image_folder = "/users/";
    var user_id = ObjectId(req.body.user_id);  


    if(req.body.image) {
        collection.update(
            { _id: user_id }, 
            {
                $set: {
                    "name" : req.body.user_name,
                    "username": req.body.email_id,
                    "phone_number": req.body.phone_number,
                    "personalmail": req.body.personal_email_id,
                    "image": image_folder + req.body.image
                }
            },
            function(err, result){
                res.send(
                    (err === null) ? { msg: '' } : { msg: err }
                );
            });
    } else {
        collection.update(
            { _id: user_id }, 
            {
                $set: {
                    "name" : req.body.user_name,
                    "username": req.body.email_id,
                    "phone_number": req.body.phone_number,
                    "personalmail": req.body.personal_email_id
                }
            },
            function(err, result){
                res.send(
                    (err === null) ? { msg: '' } : { msg: err }
                );
            });
    }
    

});
/*
var obj = {};
if(req.body.image) {
    obj.image = image_folder + req.body.image;
}
if(req.body.user_name) {
    obj.name = req.body.user_name;
}
if(req.body.email_id) {
    obj.username = req.body.email_id;
}
if(req.body.personal_email_id) {
    obj.personalmail = req.body.personal_email_id;
}
if(req.body.phone_number) {
    obj.phone_number = req.body.phone_number;
}
*/


/*
 * GET userlist. Return all the users of the system
 */
router.get('/getAllMentees/:user_type', function(req, res) {
    var db = req.db;
    var user_type = req.params.user_type;
    var collection = db.get('users');
    collection.find({"type":user_type},{username:1},function(error,documents){
       var mentees = [];
        documents.forEach(function(element, index, array) {
            mentees.push(element.username);
        });
        res.json(mentees);
    });
});


/*
 * GET the student details from the users collection
 */
router.get('/getStudents', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({ "type": "mentee" },{},function(e,docs){
        res.json(docs);
    });
});



/*
 * GET the student details from the users collection
 */
router.get('/getMentors/:type', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({ "type": req.params.type },{},function(e,docs){
        res.json(docs);
    });
});


/*
 * GET the student details from the users collection
 */
router.get('/getAllUnassignedMentees', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({ $and: [{"type": "mentee" }, {"mentor_id": {'$exists':false}}]},{},function(e,docs){
        var mentees = [];
        docs.forEach(function(element, index, array) {
            mentees.push({
                "id": element._id,
                "name": element.name,
                //"project": make db call with the mentee_id
                "image": (typeof element.image !== "undefined") ? element.image : null
            })
        })
        res.json(mentees);
    });
});


/*
 * GET all mentors along with their mentee list from the users collection for mentor-mentee shuffling
 */
router.get('/getAllMentors', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    var assignedMentees = []; //List of mentors who already have mentees assigned.

    collection.col.aggregate([ {$match: {"mentor_id": {'$exists':true}}}, { $group: { _id : "$mentor_id", mentees: { $push: {id: "$_id", name: "$name", image: "$image"}}}}], function(e,docs){
        assignedMentees = docs;

        collection.find({"type": "mentor" },{},function(error,documents){
            var mentors = [], mentees_length;
            
            documents.forEach(function(element, index, array) {
                var elem = {
                    id: element._id,
                    name: element.name,
                    image: element.image,
                    mentees: []
                }
                
                assignedMentees.forEach(function(el, idx, arr) {
                    if(el._id == elem.id) {
                        elem.mentees = el.mentees;
                    }
                });

                mentees_length = 3; //Resetting in every loop the max number of mentees each mentor can have.

                if(elem.mentees.length<=3) {
                    var mentees_length = 3 - elem.mentees.length;
                } 
                
                for (var i = 0; i < mentees_length; i++) {
                    elem.mentees.push({id: "", name: "", image: ""});   
                };

                mentors.push(elem);
            });
            

            res.json(mentors);
        });
    });    
});


/*
* PUT to updateProfile: Updating user/profile by the user id
*/
router.put('/setMentorId', function(req, res) {
    
    var db = req.db;
    var collection = db.get('users');
    var mentee_id = ObjectId(req.body.mentee_id);
    var mentor_id = req.body.mentor_id;
    
    if(mentor_id == "") {
        collection.update(
            { _id: mentee_id }, 

            {$unset: {"mentor_id":1}},
            function(err, result){
                res.send(
                    (err === null) ? { msg: '' } : { msg: err }
                );
            });
    } else {
        collection.update(
            { _id: mentee_id }, 
            {
              $set: {"mentor_id" : mentor_id}
            },
            function(err, result){
                res.send(
                    (err === null) ? { msg: '' } : { msg: err }
                );
            });
    }
});

/*
 * GET mentorslist. Return all the mentors of the system
 */
router.get('/getAllMentorslist', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({type:"mentor"},{},function(e,docs){
        var mentor = [];
        for(i=0;i<docs.length;i++){
            mentor.push({
                "img":(typeof docs[i].img !== "undefined") ? docs[i].img : '',
                "name":docs[i].name,
                "mentor_id":docs[i]._id,
            })
        }
        res.json(mentor);
    });
});


/*
 * GET userlist. Return all the users of the system
 */
router.get('/getMenteeByusername/:username', function(req, res) {
    var db = req.db;
    var user_type = req.params.username;
    var collection = db.get('users');
    collection.find({"username":user_type},{username:1},function(error,documents){
       var mentees = [];
        documents.forEach(function(element, index, array) {
            mentees.push({
                "id": element._id,
                "name": element.name,
            })
        })
        res.json(mentees);
    });

});

/*
 * GET mentees list. Return mentees list 
*/
router.get('/getAssignedMentees/:user_id', function(req, res) {
    var db = req.db;

    //Get the user id partameter and copy that in to the id variable.
    var id = req.params.user_id;

    //Get all the users collection into the collection variable.
    var collection = db.get('users');

    //Get the mentee list matching with the id and search in the mentees list for the mentor_id matches with the thing and group the result by the type(mentee)
    collection.col.aggregate([ {$match:{"mentor_id":id}},{ $group: { _id : "$type", users: { $push: "$$ROOT"}}}], function(e,docs){
        res.json(docs);
    });
});

/*
 * GET Name of the user. Return the user name
 */
router.get('/getMentorIdByMenteeId/:id', function(req, res) {
    var db = req.db;
    var user_id = ObjectId(req.params.id);
    var collection = db.get('users');
    collection.find({"_id":user_id},{},function(e,docs){
        if(docs[0]){
            res.json(docs[0].mentor_id);   
        }else{
            res.json("");
        }
      
    });
});

module.exports = router;