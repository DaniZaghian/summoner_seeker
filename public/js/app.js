// CLIENT-SIDE JAVASCRIPT
console.log('Sanity Check, app.js linked');
// On page load
$(document).ready(function(){

	var $form1 = $('#landing-page-form');
	var $form2 = $('#preference-form');
	$form2.hide();
	$form1.on('submit', function (e){
		e.preventDefault();
		
	$form1.hide(1000);

	setTimeout(showForm2, 800);

		function showForm2 () {
	   		$form2.show(1000);
		}
	});

    function rolesHTML () {
    	var roles = ["Top", "Jungle", "Mid", "Marksman", "Support"];
		var html = '';
    	roles.forEach(function (role){
    		html += '<label class="btn btn-primary">'+
              '<input name="roles" type="checkbox" value="' +role+ '" autocomplete="off" checked>' + role +
            '</label>';
    	});
    	$('#roles-buttons').html(html);
    }

     function prefRolesHTML () {
    	var roles = ["Top", "Jungle", "Mid", "Marksman", "Support"];
		var html = '';
    	roles.forEach(function (role){
    		html += '<label class="btn btn-primary">'+
              '<input name="prefRoles" type="checkbox" value="' +role+ '" autocomplete="off" checked>' + role +
            '</label>';
    	});
    	$('#prefRoles-buttons').html(html);
    }

    function rolesFormat () {
    	$.each($("input[name='roles']"), function() {
    		if ($(this).parent().hasClass('active')) {
    			$(this).prop('checked', true);
    		}
    		else {
    			$(this).prop('checked', false);
    		}
    	});
    }

    function prefRolesFormat () {
    	$.each($("input[name='prefRoles']"), function() {
    		if ($(this).parent().hasClass('active')) {
    			$(this).prop('checked', true);
    		}
    		else {
    			$(this).prop('checked', false);
    		}
    	});
    }

    rolesHTML();
    prefRolesHTML();

    $('#signUpButton').on('submit', function (e) {
    	e.preventDefault();
    	rolesFormat();
    	prefRolesFormat();
    	var $user = $("#2ndform").serialize();
    	console.log($user);
    	$.post('/api/users', $user, function(data){
      		console.log(data);
    	});

    	$.ajax({
    		method: "GET",
    		url: "/profile",
    		success: function(data){
    			window.location ='/profile';
    		}
    	});
    });

});

//need to implement:
//if love is checked, teemo is true
