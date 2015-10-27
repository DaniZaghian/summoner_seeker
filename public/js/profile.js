console.log('Sanity Check, profile.js linked');

$(document).ready(function(){

	// http://localhost:3000/profile/asteryl
	var sumName = $('#sumName').val();
	console.log(sumName);
	if(sumName){
		readUser(sumName);
	}
	//get a user from the back end
	var userObj;
	function readUser(sumName) {
	  $.ajax({
	    url: '/api/user/' + sumName,
	    type: 'GET',
	    complete: function(resUser) {
	    	console.log(resUser.responseJSON);
	    	userObj = resUser.responseJSON;
	    	getMostPlayedChamp();
	    	renderStuff();
	    }
	  });
	}
	var $stuff = $('.stuff');
	function renderStuff (){
		$('.rank').append(userObj.rank);
	}

	//find most played champ, render stuff on page
	function getMostPlayedChamp () {
		var sumUrl = "https://na.api.pvp.net//api/lol/na/v1.3/stats/by-summoner/"+userObj.sumId+"/ranked?api_key=499c7924-f226-4db2-8f05-766de06ea4bb";   			
		$.ajax({
			url: sumUrl
		}).done(function (data){ 
			findChamp(findMaxPlayedId(data));
		});
	}

	//find the id of the most played champ
	 function findMaxPlayedId (data){
	 	var maxIndex = 0;
	 	//find the maximum number of total sessions played, get id
	 	for (var j = 1; j < (data.champions.length); j++){
	 		if (data.champions[j].id !== 0){
		 		if (data.champions[j].stats.totalSessionsPlayed > data.champions[maxIndex].stats.totalSessionsPlayed){
		 			maxIndex = j;
		 		}
		 	}
	 	}
	 	var champId = data.champions[maxIndex].id;
	 	return champId;
	 }

	//based on id found in findMaxPlayedId, pulls info from champ api
	function findChamp (id) {
		var champUrl = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/"+id+"?champData=image&api_key=499c7924-f226-4db2-8f05-766de06ea4bb";
		$.ajax({
	 	url: champUrl
	 }).done(function (data) {
	 	$stuff.append("<img src = http://ddragon.leagueoflegends.com/cdn/5.7.2/img/champion/"+data.image.full+">");
	 });

	 //TODO
	 //render last 5 games if data.games[i].subType === "RANKED_SOLO_5x5"
	 	
	}

});