// CLIENT-SIDE JAVASCRIPT
console.log('Sanity Check, app.js linked');
// On page load
$(document).ready(function(){

	var $form1 = $('#landing-page-form');
	var $form2 = $('#preference-form');
    //hide the second form
	$form2.hide();
    //when first form is submitted, slide in second form
	$form1.on('submit', function (e){
		e.preventDefault();
		
	$form1.hide(1000);

	setTimeout(showForm2, 800);

		function showForm2 () {
	   		$form2.show(1200);
		}
	});

    //generate roles array based on checkboxes selected
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

    //generate prefRoles array bbased on checkboxes selected
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

    //part of roles array generation
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

    //part of prefroles array generation
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

    //performs ajax call to get summoner id based on sumName entered
   	function createSumId () {
   		//use sumName to get sumId from LoL API
    	var summonerName = $('#sumName').val().toLowerCase();
    	var url = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/'+ summonerName +'?api_key=+499c7924-f226-4db2-8f05-766de06ea4bb';
   		$.ajax({
			url: url
		}).done(function(summonerObj){
			//adding the summoner id to the value of sumId input
			var sumIdToSend = summonerObj[summonerName].id;
	    	$('#sumId').val(sumIdToSend);

	   		//submitting form after the ajax request
	    	submitForm();
		});
   	}

    //when the user submits the whole form, serialize it and send to db
   	function submitForm () {
		//send form to server
    	var $user = $("#2ndform").serialize();
    	$.post('/api/users', $user, function(data){
      		console.log(data);
      		$.ajax({
	    		method: "GET",
	    		url: "/profile/" + $('#sumName').val(),
	    		success: function(data){
                    //redirect to their profile
	    			window.location ='/profile/' + $('#sumName').val();
    			}
    		});
    	});
   	}

    rolesHTML();
    prefRolesHTML();

    //do everything when button is clicked
    $('#signUpButton').on('click', function (e) {
    	e.preventDefault();
    	rolesFormat();
    	prefRolesFormat();
    	createSumId();
    });

});
