function showMessage(msg)
{
	$('#message').html(msg);
}

$(document).ready(function(){
	if(supportsGeolocation())
		{
			var options = {
				enableHighAcuracy: true,
				timeout: 3000,
				maximumAge: 20000
			};
			navigator.geolocation.getCurrentPosition(showPosition, showError, options);
		}
	else
		{
			showMessage("Geolocation is not supported by this browser.");
		}
});

function supportsGeolocation() {
	return 'geolocation' in navigator;
}

/*
function showPosition(pos)
{
	var datetime = new Date(pos.timeStamp).toLocaleString();
	showMessage('latitude: ' + pos.coords.latitude + '</br>' + 
				'longitude: ' + pos.coords.longitude + '</br>' +
				'TimeStamp: ' + datetime + '</br>'
			   );
}
*/
function showError(error)
{
	switch(error.code)
		{
			case error.PERMISSION_DENIED:
				showMessage("User denied the location access");
		}
}


function showPosition(pos) {
		var mapcanvas = document.getElementById('mapCanvas');
		var coords = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
		var options = {
			zoom: 13,
			center: coords,
			mapTypeControl: false,
			navigationControlOptions: {
				style: google.maps.NavigationControlStyle.SMALL
			},
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(mapcanvas, options);
		var marker = new google.maps.Marker({
		position: coords,
		map: map,
		title: "You are here!"
	});
}