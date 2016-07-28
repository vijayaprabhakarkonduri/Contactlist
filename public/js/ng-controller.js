var myApp = angular.module('myApp', ['ui.tinymce', 'ngSanitize', 'ngFileUpload', 'angular-carousel']);

myApp.factory('myProfile', function() {
	APIProfile = {};
	APIProfile.getProfile = function(user_id, cb) {
		getProfileByUserid( user_id, function(data) {
			cb(data);
		});
    }
    return APIProfile;
});


myApp.factory('myNotifications', function() {
	APINotifications = {};
	APINotifications.addMemberInDiscussion = function(id, cb) {
		receiveNotification(id, function(data) {
			cb(data);
		})
	}
	return APINotifications;
});
