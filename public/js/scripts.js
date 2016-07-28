$(document).ready(function() {
	$('#weakness_tab').hide();
	$('.view-less').hide();
	$('.view-less-link').hide();
	$('.global-notifications').hide();
	$(".mentor-skill-grading-bar").slider({
		orientation: "horizontal",
		range: "min",
		value: 0,
	});
	/*$( "#green" ).slider({
		orientation: "horizontal",
		range: "min",
		value: 0,
	});*/
	//$( "#red" ).slider( "value", 0 );
	//console.log($('#grade_tooltip').css('left'));
	//$('#grade_tooltip').css('left') = $('.ui-slider-range').width() +'px';

	$('[data-toggle="tooltip"]').tooltip();

	$("#datepicker").datepicker({
		showOn: "button",
		buttonImage: "/css/images/timelineicon.png",
		buttonImageOnly: true,
		buttonText: "Select date"
	});

	$(".from").datepicker({
		showOn: "button",
		buttonImage: "/css/images/timelineicon.png",
		changeMonth: true,
		buttonImageOnly: true,
		numberOfMonths: 1,
		dateFormat: 'dd/mm/yy',

	});
	$(".to").datepicker({
		showOn: "button",
		buttonImage: "/css/images/timelineicon.png",
		buttonImageOnly: true,
		numberOfMonths: 1,
		dateFormat: 'dd/mm/yy',

	});


	$(".date_peerreview").datepicker({
		showOn: "button",
		buttonImage: "/css/images/smallcalendar.png",
		changeMonth: true,
		buttonImageOnly: true,
		numberOfMonths: 1,
		dateFormat: 'dd/mm/yy',

	});

	//Mentee's Progress chart - The corners of the plotarea needs to be rounded
	$('#menteesProgressMap svg>rect').attr('rx', 10).attr('ry', 10);
	$('.mentees-suggestion-tile').height($('#menteesProgressMap svg>rect').eq(1).attr('height'));
});


$(document).on('click', '.user-option', function() {
	if ($(this).hasClass('opened')) {
		$(this).removeClass('opened');
	} else {
		$(this).addClass('opened');
	}
})


$('.new-task-button').bind('click', function() {
	$('.task-view').removeClass('classadd');
	$('.task-view').addClass('hideclass');
	$('.task-form').addClass('classadd', 'task-form')
});
$('.secondary-action').bind('click', function() {
	$('.task-form').addClass('hideclass');
	$('.task-form').removeClass('classadd');
	$('.task-view').addClass('classadd')
});
$('.strengths-head h3').click(function() {
	var t = $(this).attr('id');
	if (!($(this).hasClass('active'))) { //this is the start of our condition 
		$('.strengths-head h3').removeClass('active');
		$(this).addClass('active');
		$('.strength_tabs').hide();
		$('#' + t + '_tab').fadeIn('slow');
	}
});

$('.view-more-link').click(function() {
	$('.view-less').slideDown('slow');
	$('.view-less-link').slideDown('slow');
	$('.view-more-link').hide();
	$('.short_description').hide();

});


$('.view-less-link').click(function() {
    $('.view-less').slideUp();
    $('.view-less-link').slideUp();
    $('.view-more-link').fadeIn('slow');
    $('.short_description').show();
});

// Global Helper Functions
function htmlEncode(value){
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}

function getDate(date) {
	var m_names = new Array("Jan", "Feb", "Mar", 
	"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
	"Oct", "Nov", "Dec");
	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear();
	return (curr_date + " " + m_names[curr_month] + " " + curr_year);
}

$('.profile-view-button').bind('click', function() {
	$('.profile-new').removeClass('classadd');
	$('.profile-new').addClass('hideclass');
	$('.edit-profile').addClass('classadd')
});

$('.edit-profilebackbutton').bind('click', function() {
	$('.edit-profile').removeClass('classadd');
	$('.edit-profile').addClass('hideclass');
	$('.profile-new').addClass('classadd')
});
