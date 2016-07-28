// Functions =============================================================
//Store the task created by mentor in the notification database
function notificationToInstructor(obj) {
    if(typeof obj === "object"){
        $.ajax({
            type: 'POST',
            data: obj,
            url: '/notifications/notificationToInstructor',
            dataType: 'JSON'
        }).done(function( response ) {            
            // Check for successful (blank) response
            if (response.msg === '') { 
                // Show success message
                console.log("success");
                //Make an entry in the notification collection/doc with the notification type "".
            } else {
                // If something goes wrong, alert the error message that our service returned
                console.log('Error: ' + response.msg);
            }
        });    
    }
}

//Add task to the library
function addTask(obj,callback) {
    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: obj,
            url: '/tasks/addtask',
            dataType: 'JSON'
        }).done(function( response ) {

            console.log(response);
            // Check for successful (blank) response
            if (response.msg === '') { //This condition needs to be modified
                // Show success message
                console.log("success");

                //Make an entry in the notification collection/doc with the notification type "".
            } else {

                // If something goes wrong, alert the error message that our service returned
                //alert('Error: ' + response.msg);
                callback(response);
            }
        });    
    }
}

//Get the Task List
function getTasksList(callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/tasks/tasklist', function( data ) {
        callback(data);
    });
}
//Get all skills.
function getSkills(callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/skills/getSkills', function( data ) {
        callback(data);
    });
}

//Get all mentee projects
function getMyProjects(id, callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/projects/getMyProjects/' + id , function( data ) {
        callback(data);
    });
}

//Get all Shared profile details
function sharedProfileDetails(mentor_id, callback) {
    // jQuery AJAX call for JSON
    $.getJSON('/projects/sharedProfileDetails/' +  mentor_id , function( data ) {
        callback(data);
    });
}


//Get all notifications of the instructor
function getAllInstructorNotifications(callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/notifications/getAllInstructorNotifications/', function( data ) {
        callback(data);
    });
}

//Get the Task List
function getTaskById(id,callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/tasks/taskById/'+ id, function( data ) {
        console.log(data);
        callback(data);

    });
}



//Add Task in the task library
function setTimelines(obj,callback) {
    console.log(obj);
    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service

        $.ajax({
            type: 'POST',
            url: '/projects/setTimelines',
            data: JSON.stringify(obj),
            dataType: 'text', //insert/update json object
            contentType: 'application/json', //insert/update json object
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            },
            success: function (response) {
                console.log(response);
                callback(response);
            }
        });
    }
}


//Add Task in the task library
function addArtifact(obj) {
    //console.log(obj);
    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            url: '/projects/addArtifact',
            data: JSON.stringify(obj),
            dataType: 'text', //insert/update json object
            contentType: 'application/json', //insert/update json object
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            },
            success: function (response) {
                if (response.msg === '') {
                    // Show success message
                    console.log("success");
                } else {
                    // If something goes wrong, alert the error message that our service returned
                    console.log('Error: ' + response.msg);
                }
            }
        });
    }
}

// Fill table with data
function getArtifacts(project_id,callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/projects/getArtifacts/'+ project_id, function( data ) {
        // Stick our user data array into a userlist variable in the global object
        console.log(data);
        callback(data);
    });
};

// Fill table with data
function getArtifactLink(artifact, project_id, callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/projects/getArtifactLink/' + project_id + '/' + artifact, function( data ) {
        // Stick our user data array into a userlist variable in the global object
        callback(data);
    });
};

// Fill table with data
function getComments(artifact, project_id, callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/projects/getComments/' + project_id + '/' + artifact, function( data ) {
        // Stick our user data array into a userlist variable in the global object
        callback(data);
    });
};


//Notification START
//requestPeerReview
function requestPeerReview (obj) {
    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: obj,
            url: '/notifications/requestPeerReview',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
                // Show success message
                console.log("success");
            } else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });    
    }
}

//Notification START
//changeReviewStatus
function changeReviewStatus (obj) {
    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: obj,
            url: '/projects/changeReviewStatus',
            dataType: 'JSON'
        }).done(function( response ) {
            // Check for successful (blank) response
            if (response.msg === '') {
                // Show success message
                console.log("success");
            } else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });    
    }
}

function saveGrade (artifact, project_id, obj) {
    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: JSON.stringify(obj),
            url: '/projects/saveGrade/' + project_id + '/' + artifact,
            dataType: 'JSON',
            contentType: 'application/json',
        }).done(function( response ) {
            // Check for successful (blank) response
            if (response.msg === '') {
                // Show success message
                console.log("success");
            } else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });    
    }
}

function saveMentorGrade (artifact, project_id, obj) {
    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: JSON.stringify(obj),
            url: '/projects/saveMentorGrade/' + project_id + '/' + artifact,
            dataType: 'JSON',
            contentType: 'application/json',
        }).done(function( response ) {
            // Check for successful (blank) response
            if (response.msg === '') {
                // Show success message
                console.log("success");
            } else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });    
    }
}


function postComment (artifact, project_id, obj) {
    console.log(artifact + project_id)
    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: JSON.stringify(obj),
            url: '/projects/postComment/' + project_id + '/' + artifact,
            dataType: 'JSON',
            contentType: 'application/json',
        }).done(function( response ) {
            // Check for successful (blank) response
            if (response.msg === '') {
                // Show success message
                console.log("success");
            } else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });    
    }
}


function postReply (index, artifact, project_id, obj) {
    console.log(artifact + project_id)
    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: JSON.stringify(obj),
            url: '/projects/postReply/' + index + '/' + project_id + '/' + artifact,
            dataType: 'JSON',
            contentType: 'application/json',
        }).done(function( response ) {
            // Check for successful (blank) response
            if (response.msg === '') {
                // Show success message
                console.log("success");
            } else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });    
    }
}


//getNotificationById
function getNotificationById (id,callback) {
    // jQuery AJAX call for JSON
    $.getJSON('/notifications/getNotificationById/' + id, function( data ) {
        callback(data);
    });
}
//END

//Get the Task List
function getTaskIdByProjectId(project_id,callback) {
    console.log(project_id + "BALA");
    $.getJSON( '/projects/getTaskIdByProjectId/'+ project_id, function( data ) {
        callback(data);
    });
}


//Users START

function getAllUsers (callback) {
    // jQuery AJAX call for JSON
    $.getJSON('/users/getAllUsers', function( data ) {
        callback(data);
    });
}

//END

//Discard the notification delete the data from the database
function discardNotification(id,callback) {
    var task_id = id;
    $.ajax({
        type: 'DELETE',
        url: '/notifications/discardNotification/' + task_id
    }).done(function( response ) {
        // Check for a successful (blank) response
        if (response.msg === '') {
            //success message
        } else {
            //Error in delete
        }
    });
};


//Store the notification for the mentor about the task
function notificationToMentor(obj,callback) {
    if(typeof obj === "object"){
        $.ajax({
            type: 'POST',
            data: obj,
            url: '/notifications/notificationtomentor',
            dataType: 'JSON'
        }).done(function( response ) {

            callback(response);
            // Check for successful (blank) response
            if (response.msg === '') { //This condition needs to be modified
                // Show success message
                console.log("success");

                //Make an entry in the notification collection/doc with the notification type "".
            } else {

                // If something goes wrong, alert the error message that our service returned
                //alert('Error: ' + response.msg);

            }
        });    
    }
}

//retrieve the notifications of the mentor from the database
function getMentorNotifications(id,callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/notifications/getMentorNotifications/'+ id, function( data ) {
        callback(data);
    });
}

function suggestSkillKey(skill,callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/tasks/suggestSkillKey/'+skill, function( data ) {
        callback(data);
    });
}

function suggestTask(skill,callback) {
    // jQuery AJAX call for JSON
    console.log(skill);
    $.getJSON( '/tasks/suggestTask/'+skill, function( data ) {
        callback(data);
    });
}

//TO assign a task to mentee
function assignTask (obj) {
    console.log(obj);
    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: obj,
            url: '/notifications/assignTask',
            dataType: 'JSON'
        }).done(function( response ) {
            // Check for successful (blank) response
            if (response.msg === '') {
                // Show success message
                console.log("success");
            } else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });    
    }
}

//TO add a batch to the system
function addBatch (batch, obj) {
    console.log( obj);
    obj = JSON.parse(obj);
    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: JSON.stringify(obj),
            url: '/users/addBatch/' + batch,
            dataType: 'JSON',
            contentType: 'application/json'
        }).done(function( response ) {
            // Check for successful (blank) response
            if (response.msg === '') {
                // Show success message
                console.log("success");
            } else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });    
    }
}

//Get the last batch
function getLastBatch(callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/users/getLastBatch/', function( data ) {
        callback(data);
    });
}

//Get the Task List
function getAllMentees(user_type,callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/users/getAllMentees/'+ user_type, function( data ) {
        callback(data);
        //console.log(data);
    });
}


//Get the Task List
function getNewTask(mentee_id,callback) {
    console.log(mentee_id);
    $.getJSON( '/notifications/getNewTask/'+ mentee_id, function( data ) {
        callback(data);
    });
}


//Get the user name by Id
function getUserName(user_id,callback) {
    console.log(user_id);
    $.getJSON( '/users/getUserName/'+ user_id, function( data ) {
        callback(data);
    });
}


//Get the name of the user by username 
function getNameByUserName(username,callback) {
    $.getJSON( '/users/getNameByUserName/'+ username, function( data ) {
        callback(data,username);
    });
}

//Get the Task List
function getTaskIdByNotificationId(notification_id,callback) {
    $.getJSON( '/notifications/getTaskIdByNotificationId/'+ notification_id, function( data ) {
        callback(data);
    });
}
//Get the Notification
function getMenteeNotifications(id, callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/notifications/getMenteeNotifications/'+ id, function( data ) {
        callback(data);
    });
}

//Get the negative marking sheet details
function getNegativeMarkingSheet(artifact, callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/negative_marking/getNegativeMarkingSheet' , { "name": artifact }, function( data ) {
        callback(data);
    });
    
}


//Get the students from the users datbases
function getStudents(callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/users/getStudents', function( data ) {
        callback(data);
    });
}


//Get the students from the users datbases
function getMentors(type, callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/users/getMentors/' + type, function( data ) {
        callback(data);
    });
}


//Get the students from the users datbases
function getStudentsByBatch(callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/users/getStudentsByBatch', function( data ) {
        callback(data);
    });
}


//Get all unassigned mentees from the users collection
function getAllUnassignedMentees(callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/users/getAllUnassignedMentees', function( data ) {
        callback(data);
    });    
}


//Get all mentors from the users collection
function getAllMentors(callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/users/getAllMentors', function( data ) {
        callback(data);
    });    
}


//Update the mentor_id for a mentee
function setMentorId (obj) {
    obj = JSON.parse(obj);
   
    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'PUT',
            data: JSON.stringify(obj),
            url: '/users/setMentorId',
            dataType: 'json',
            contentType: 'application/json',
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            },
            success: function (response) {
                if (response.msg === '') {
                    // Show success message
                    console.log("success");
                } else {
                    // If something goes wrong, alert the error message that our service returned
                    console.log('Error: ' + response.msg);
                }
            }
        });    
    }
}

//Get the all new task Notifications 
function getNewTaskNotification(callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/notifications/getNewTaskNotification/', function( data ) {
        callback(data);
    });
}

//Delete the notification when mentee creates and sets the time for the new project
function deleteNotification(id) { // id = notification id
    // jQuery AJAX call for JSON
    $.getJSON( '/notifications/deleteNotification/'+ id, function(  ) {
    });
}


//Get the Task List
function getProfile(username,callback) {
    $.getJSON( '/users/getProfile/'+ username, function( data ) {
        callback(data);
    });
}



//Get the Task List
function getProfileByUserid(user,callback) {
    $.getJSON( '/users/getProfileByUserid/', {id: user}, function( data ) {
        callback(data);
    });
}


//Upload Profile Image
function uploadProfileImage(Upload, file, id, cb) {
    Upload.upload({
        url: '/users/upload', //webAPI exposed to upload the file
        file: file, //pass file as data, should be user ng-model
        fields: {
            id: id
        } 
    }).then(function (resp) { //upload function returns a promise
        if(resp.data.error_code === 0){ //validate success
            //console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ');
            cb(resp.data.filename);
        } else {
            console.log('an error occured');
        }
    }, function (resp) { //catch error
        console.log('Error status: ' + resp.status);
    }, function (evt) { 
        //console.log(evt);
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      //  console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });

};

//Update the mentor_id for a mentee
function updateProfile (obj) {
    obj = JSON.parse(obj);
    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'PUT',
            data: JSON.stringify(obj),
            url: '/users/updateProfile',
            dataType: 'json',
            contentType: 'application/json',
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            },
            success: function (response) {
                if (response.msg === '') {
                    // Show success message
                    console.log("success");

                } else {
                    // If something goes wrong, alert the error message that our service returned
                    console.log('Error: ' + response.msg);
                }
            }
        });    
    }
}


//Get the Task List
function getMentorNameByMenteeId(mentor_id,callback) {
    $.getJSON( '/users/getMentorName/'+ mentor_id, function( data ) {
        callback(data);
    });
}

//Update the mentor_id for a mentee
function shareProfile (obj) {
    obj = JSON.parse(obj);
    
    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service
        console.log(obj);
        $.ajax({
            type: 'POST',
            data: JSON.stringify(obj),
            url: '/notifications/shareProfile',
            dataType: 'json',
            contentType: 'application/json',
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            },
            success: function (response) {
                if (response.msg === '') {
                    // Show success message
                    console.log("success");
                } else {
                    // If something goes wrong, alert the error message that our service returned
                    console.log('Error: ' + response.msg);
                }
            }
        }); 
    }
}

//Get all mentors from the users collection
function getAllMentorslist(callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/users/getAllMentorslist', function( data ) {
        callback(data);
    });    
}

//Add Discussion
function addDiscussion(obj, callback) {
    var obj = JSON.parse(obj);

    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service

        $.ajax({
            type: 'POST',
            url: '/db_discussions/addDiscussion',
            data: JSON.stringify(obj),
            dataType: 'text', //insert/update json object
            contentType: 'application/json', //insert/update json object
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            },
            success: function (response) {
                callback(response);
            }
        });
    }
}

//Add comment in specific discussion, this is done by updating the discussion, adding the comment/message.
function addMessageInDiscussion(obj) {
    var obj = JSON.parse(obj);

    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service

        $.ajax({
            type: 'PUT',
            url: '/db_discussions/addMessageInDiscussion',
            data: JSON.stringify(obj),
            dataType: 'text', //insert/update json object
            contentType: 'application/json', //insert/update json object
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            },
            success: function (response) {
                console.log(response);
            }
        });
    }
}


//Add member in specific discussion, this is done by updating the discussion, adding the member.
function addMemberInDiscussion(obj, cb) {
    var obj = JSON.parse(obj);

    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service

        $.ajax({
            type: 'PUT',
            url: '/db_discussions/addMemberInDiscussion',
            data: JSON.stringify(obj),
            dataType: 'text', //insert/update json object
            contentType: 'application/json', //insert/update json object
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            },
            success: function (response) {
                cb(JSON.parse(response).user);
                console.log("Member added successfully");
                //Notify the member about his inclusion in the discussion thread.
                obj.type = "new member in discussion";
                sendNotification(obj);
            }
        });
    }
}
//Send Notification when a member is added to the discussion thread.
function sendNotification(obj) {    
    if(typeof obj === "object"){
        $.ajax({
            type: 'POST',
            url: '/notifications/addMemberInDiscussion',
            data: JSON.stringify(obj),
            dataType: 'text', //insert/update json object
            contentType: 'application/json', //insert/update json object
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            },
            success: function (response) {
                console.log(response);
            }
        });
    }
}
//Receive Notification when a member is added to the discussion thread.
function receiveNotification(id,callback) {
    $.getJSON( '/notifications/addMemberInDiscussion', {id: id}, function( data ) {
        console.log(data);
        callback(data);
    });
}


//Get all discussion the user is owner or member of
function getDiscussions(id,callback) {
    $.getJSON( '/db_discussions/getDiscussions', {id: id}, function( data ) {
        console.log(data);
        callback(data);
    });
}

//retrieve the notifications of the mentor from the database
function getMenteeByusername(username,callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/users/getMenteeByusername/'+ username, function( data ) {
        callback(data);
    });
}


// This function will returnes the status of the a artifact.
function getArtifactReviewStatus(artifact, project_id, callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/projects/getArtifactReviewStatus/' + project_id + '/' + artifact, function( data ) {
        // Stick our user data array into a userlist variable in the global object
        callback(data);
    });
};


// This function will returnes the status of the a artifact.
function getPeerScore(artifact, project_id, callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/projects/getPeerScore/' + project_id + '/' + artifact, function( data ) {
        // Stick our user data array into a userlist variable in the global object
        callback(data);
    });
};

// This function will get the list of the assigned mentees list of the mentor  from the users collection
function getAssignedMentees(user_id,callback) {
    // jQuery AJAX call for JSON
    //get the data from the users collection
    $.getJSON( '/users/getAssignedMentees/'+ user_id, function( data ) {
        callback(data);
    });
}

//TO assign a task to mentee
function modifyAssignTask (obj) {
    console.log(obj);
    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: JSON.stringify(obj),
            url: '/notifications/modifyAssignTask',
            dataType: 'JSON',
            contentType: 'application/json'
        }).done(function( response ) {
            // Check for successful (blank) response
            if (response.msg === '') {
                // Show success message
                console.log("success");
            } else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });    
    }
}


//retrieve the notifications of the mentor from the database
function getMenteeIdByProjectId(id,callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/projects/getMenteeIdByProjectId/'+ id, function( data ) {
        callback(data);
    });
}


//To save project grading


function saveProjectGrading (project_id, obj) {
    console.log(obj);
    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service

        $.ajax({
            type: 'POST',
            url: '/projects/saveProjectGrading/' + project_id,
            data: JSON.stringify(obj),
            dataType: 'text', //insert/update json object
            contentType: 'application/json', //insert/update json object
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            },
            success: function (response) {
                console.log(response);
                callback(response);
            }
        });
    }
}

//TO assign a task to mentee
function redflagmentee (obj) {
    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service
        console.log(obj);
        $.ajax({
            type: 'POST',
            data: obj,
            url: '/projects/redflagmentee',
            dataType: 'JSON'
        }).done(function( response ) {
            // Check for successful (blank) response
            if (response.msg === '') {
                // Show success message
                console.log("success");
            } else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        }); 
    }
}


//Create Project Passive notification mentor and mentee
function createProjectPassiveNotification (obj) {
    console.log(obj);
    if(typeof obj === "object"){
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: obj,
            url: '/notifications/createProjectPassiveNotification',
            dataType: 'JSON'
        }).done(function( response ) {
            // Check for successful (blank) response
            if (response.msg === '') {
                // Show success message
                console.log("success = 123");
            } else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });    
    }
}

//retrieve the notifications of the mentor from the database
function getMentorId(project_id,callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/projects/getMentorId/'+ project_id, function( data ) {
        callback(data);
    });
}


//retrieve the notifications of the mentor from the database
function getMenteeId(project_id,callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/projects/getMenteeId/'+ project_id, function( data ) {
        callback(data);
    });
}

//Get all mentee projects
function getRedFlagsList(id,callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/projects/getRedFlagsList/'+ id, function( data ) {
        callback(data);
    });
}


//retrieve the notifications of the mentor from the database
function getMentorIdByMenteeId(id,callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/users/getMentorIdByMenteeId/'+ id, function( data ) {
        console.log(data)
        callback(data);
    });
}

//Get all Shared profile details
function getCurriculum(callback) {
    // jQuery AJAX call for JSON
    $.getJSON('/db_curriculum/getCurriculum' , function( data ) {
        callback(data);
    });
}


//Delete the notification when mentee creates and sets the time for the new project
function canclePeerreview(project_id,artfact_name) { // id = notification id
    // jQuery AJAX call for JSON
    $.getJSON( '/projects/canclePeerreview/' + project_id + '/' + artfact_name, function(  ) {

    });
}

function cancleMentorReview (project_id) {

    $.ajax({
        type: 'PUT',
        url: '/projects/cancleMentorReview/' + project_id,
        dataType: 'text', //insert/update json object
        contentType: 'application/json', //insert/update json object
        error: function (jqXHR, exception) {
            console.log(jqXHR);
        },
        success: function (response) {
            console.log(response);
            callback(response);
        }
    });
}

//Get all getAllArtifactNames
function getAllArtifactNames(callback) {
    // jQuery AJAX call for JSON
    $.getJSON( '/negative_marking/getAllArtifactNames', function( data ) {
        callback(data);
    });
}

