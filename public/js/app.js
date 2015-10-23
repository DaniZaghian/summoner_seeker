// CLIENT-SIDE JAVASCRIPT
console.log('Sanity Check, app.js linked');
// On page load
$(document).ready(function(){
 

// $('#landing-page-form').on('submit', function (e) {
//     	e.preventDefault();
//     	$.ajax({
//     		method: "GET",
//     		url: "/info",
//     		success: function(data){
//     			window.location ='/info';
//     		}
//     	});
//     });

	var $form1 = $('#landing-page-form');
	var $form2 = $('#preference-form');
	$form2.hide();
	$form1.on('submit', function (e){
		e.preventDefault();
		console.log("form getting here");
		
	$form1.hide(1000);

	setTimeout(showForm2, 800);

	function showForm2 () {
   		$form2.show(1000);
	}


	});

});