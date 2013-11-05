$(document).ready(function(){

	var map;
	var mapOptions = {
		zoom: 2,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	 };
	map = new google.maps.Map(document.getElementById('map'), mapOptions);
	
	navigator.geolocation.getCurrentPosition(function(position) {
		var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var infowindow = new google.maps.InfoWindow({
	        map: map, 
	        position: pos,
	        content: 'Sei qui'
		});
		map.setCenter(pos);
	});

	$("input").on("click", function(){
		//$.couch.urlPrefix = "http://192.168.0.5:5984";
		$.couch.urlPrefix = "http://192.168.0.2:5984";
		var db = $.couch.db("disastri");
	
		var updateUI = function(data, mappa){
			//var urlAttachment = "data:" + data._attachments["fukushima.jpg"].content_type + ";base64," + data._attachments["fukushima.jpg"].data;
			var urlAttachment = "data:" + data._attachments["image.jpg"].content_type + ";base64," + data._attachments["image.jpg"].data;
			var posDisastro = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
			var info = new google.maps.InfoWindow({
			    map: mappa,
			    position: posDisastro,
			    content: data.msg
			});
			mappa.setCenter(posDisastro);
		
			$("#userId").text(data.userId);
			$("#userMail").text(data.userMail);
			$("#userMsg").text(data.msg);
			$("#lat").text(data.coords.latitude);
			$("#lon").text(data.coords.longitude);
			$("#foto").attr("src", urlAttachment);
		}
	
		var doc = {};
	
		db.openDoc("esempio",{
			success: function(data){
				updateUI(data, map);
			},
			error: function(err){
				alert("ERRORE: " + err);
			},
			attachments: true
		});
	});
});
