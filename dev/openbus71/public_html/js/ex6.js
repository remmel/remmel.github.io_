//chromium-browser --disable-web-security
cleanData();
linkData();

$(document).ready(function(){
	console.log('ready');
});

//routes.html
$(document).delegate('#routeListPage', 'pagebeforeshow', function () {
	displayRouteList();
});

//route.html?id=xxx
$(document).delegate('#routeDetailsPage', 'pagebeforeshow', function () {
	var id = getUrlVars()["id"];
	displayRouteDetails(id);
});

//stop_times.html?stop_id=xxx
$(document).delegate('#stopTimeListPage', 'pagebeforeshow', function () {
	console.log('stopTimeListPage');
	//stop_id=NANAA&route_id=CITY
	var stop_id = getUrlVars()["stop_id"];
	var route_id = getUrlVars()["route_id"];
	displayStopTimeList(route_id, stop_id);
});

//map.html
$(document).delegate('#mapPage', 'pageinit', function () {
	displayMap();
});

//ex6_timetable.html?route_id=xxx
$(document).delegate('#timetableListPage', 'pagebeforeshow', function () {
	console.log('timetableListPage');
	console.log(getUrlVars());
	var route_id = getUrlVars()["route_id"];
	displayTimetable(route_id);
});

function displayMap(){
	console.log('initMap');
	latlng = new google.maps.LatLng(36.914944, -116.761472);
	myoptions = { zoom: 14, center: latlng, mapTypeId: google.maps.MapTypeId.ROADMAP };
	map = new google.maps.Map(document.getElementById("map-canvas"), myoptions);
	var marker = new google.maps.Marker({
		position: latlng,
		map: map,
		visible: true
	});
	infowindow = new google.maps.InfoWindow();
	
	for(route_id in data.routes){
		var route = data.routes[route_id];
		var routePathPositions = [];
		
		for(stop_i in route.stops){
			var stop = route.stops[stop_i];
			//console.log(stop);
			var position = new google.maps.LatLng(stop.stop_lat,stop.stop_lon);
			var marker = new google.maps.Marker({
				position: position,
				map: map,
				title:stop.stop_name,
				icon: 'marker.png'
				//icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=bus'
				//icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=bus%7C'+route.route_color
		    });
		    marker.stop = stop;
			//console.log(stop);
			
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(this.stop.stop_name);
				infowindow.open(map,this);
			});
		    routePathPositions.push(position);
		}
		
		if(route.route_color == undefined || route.route_color == "")
		    route.route_color = "333333";
		
		var routePath = new google.maps.Polyline({
		  path: routePathPositions,
		  strokeColor: route.route_color,
		  strokeOpacity: 1.0,
		  strokeWeight: 2
		}); 
		routePath.setMap(map);
	}
	
	/*$('[data-role=content]')
  .height(
    $(window).height() - 
    (5 + $('[data-role=header]').last().height() 
    + $('[data-role=footer]').last().height())
  );
// tell google to resize the map
google.maps.event.trigger(map, 'resize');*/
setTimeout(function(){
	google.maps.event.trigger(map, 'resize');
	map.setCenter(new google.maps.LatLng(46.582751,4.486671));
	
},1);

}



function displayTimetable(route_id){
	console.log(route_id);
	var routes = data.routes[route_id];
	table = [];
	for(var i=0;i<routes.trips.length;i++){
		var trip = routes.trips[i];
		if(trip == undefined) continue;
		//console.log(trip);
		var trip_id = trip.trip_id;
		if(trip.direction_id){
			//console.log(trip);
			for(var j=0; j<trip.stop_times.length;j++){
				var stop_time = trip.stop_times[j];
				var stop_sequence = stop_time.stop_sequence;
				//console.log(trip_id +"_"+ stop_sequence);
				//console.log(table[trip.trip_id]);
				if(table[stop_sequence] == undefined) table[stop_sequence] = [];
				table[stop_sequence][trip_id] = stop_time;
			}
		}
	}
	
	var headerPrinted = false;
	for(var i=0;i<table.length;i++){
		var seq = table[i];
		if(seq == undefined) continue;
		var row = "<tr>";
		var rowHeader = "<thead><td></td>";
		var stopNamePrinted = false;
		
		for(var j=0; j<table[i].length;j++){
			var stop_time = table[i][j];
			if(stop_time == undefined) continue;
			if(!stopNamePrinted){
				row +="<td>"+stop_time.stop.stop_name+" ("+stop_time.stop.stop_id+")</td>";
				stopNamePrinted = true;
			}
			if(!headerPrinted){
				rowHeader += "<td>" + stop_time.trip.op71_code_serv + " / " + stop_time.trip.service.op71_jour+ "</td>";
			}
			row +="<td class='stop_time'>"+stop_time.departure_time+"/"+stop_time.stop_sequence+"</td>";
		}
		if(!headerPrinted)
			$("#timetable").append(rowHeader);
		headerPrinted = true;
		row +="</tr>";
		$("#timetable").append(row);
		stopNamePrinted = false;
	}
}

//TODO link service id + order trip by op71_code_serv


function displayRouteList(){
	//$('#routeList li').remove();
	//var ligneList = "<li data-theme=\"c\"><a href=\"ex5_route.html?id=$0\" data-transition=\"slide\">$1 ($0)</a></li>";
	var ligneList = "<li data-theme=\"c\"><a href=\"ex6_timetable.html?route_id=$0\" data-transition=\"slide\">$1 ($0)</a></li>";
	var routes = getRoutes();
	for(index in routes) {
        var row = routes[index];
  		var newLigne = ligneList.replace("$1", row.route_long_name)
  			.replaceAll("$0", row.route_id)
  			.replace("$2", row.route_short_name);
  		$("#routeList").append(newLigne);
	};
	$("#routeList").listview("refresh");
}

function displayRouteDetails(route_id){
	var ligneList = "<li data-theme=\"c\"><a href=\"ex5_stop_times.html?stop_id=$0&route_id=$2\" data-transition=\"slide\">$1</a></li>";
	//$('li[data-stop_id]').remove();
	var stops = getStopsByRouteId(route_id);
	var route = data.routes[route_id];
	//+route.route_short_name
	$("#routeDetailsPage h3").text("Route "+": "+route.route_long_name + " ("+route.route_id +")");
	
	$( stops ).each(function( index ) {
        var row = stops[index];
  		
  		var newLigne = ligneList.replace("$1", row.stop_name)
  			.replace("$0", row.stop_id)
  			.replace("$2", route_id);
  			
  		$("#stopList").append(newLigne);
	});
	$("#stopList").listview("refresh");
}

function displayStopTimeList(route_id, stop_id){

	var stop = data.stops[stop_id];
	$("#stopTimeListPage h3").text("Stop: "+stop.stop_name+" / "+stop_id + "");
	
	var ligneList = "<li data-theme=\"c\"><p>$0</p><p>$1</p></li>";
	
	var stop_times = data.stops[stop_id].stop_times;
	$( stop_times ).each(function( index, stop_time){
		var route = stop_time.trip.route;
		//"+route.route_short_name+" 
		//stop_time.trip.trip_headsign
		var newLigne =ligneList.replace("$0", stop_time.departure_time)
			.replace("$1", "Route : "+route.route_long_name + " / Direction "+(stop_time.trip.direction_id?"Aller":"Retour"));
		$("#stopTimeList").append(newLigne);
	});
	$("#stopTimeList").listview("refresh");
}






function getRoutes(){
	return data.routes;
}

function getStopsByRouteId(route_id){
	return data.routes[route_id].stops;
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function cleanData(){
	for(var i=0; i<data.stops.length; i++){
		var stop = data.stops[i];
		stop.stop_lat = parseFloat(stop.stop_lat.replace(',', '.'));
		stop.stop_lon = parseFloat(stop.stop_lon.replace(',', '.'));
	}
	
	for(var i=0; i<data.stop_times.length; i++){
		var stop_time = data.stop_times[i];
		stop_time.stop_sequence = parseFloat(stop_time.stop_sequence);
	}
	
	for(var i=0;i<data.trips.length;i++){
		var trip = data.trips[i];
		trip.op71_code_serv = parseFloat(trip.op71_code_serv);
	}
	
	data.stop_times.sort(function(a,b){return a.stop_sequence-b.stop_sequence});
	
	data.trips.sort(function(a,b){return a.op71_code_serv-b.op71_code_serv});
}

function linkData(){
	//console.log(data);
	data.routes =toAssociativeArray(data.routes, 'route_id');	
        data.trips =toAssociativeArray(data.trips, 'trip_id');
	data.stops = toAssociativeArray(data.stops, 'stop_id');
	data.calendars = toAssociativeArray(data.calendars, 'service_id');
	
        
	//Kind of JOIN MANY-TO-ONE
	//data.trips['AB1'].route
	addItemFromId(data.trips, 'route_id', 'route', data.routes);
	//data.stop_times[0].trip
	addItemFromId(data.stop_times, 'trip_id', 'trip', data.trips);
	//data.stop_times[0].stop
	addItemFromId(data.stop_times, 'stop_id', 'stop', data.stops);
	//data.trips[1].service
	addItemFromId(data.trips, 'service_id', 'service', data.calendars);
	
	//Kind of JOIN ONE-TO-MANY
	//data.routes['AB'].trips ([string])
	addItemsFromId(data.routes, data.trips, 'route_id', 'trips', true);
	//data.trips['AB1'].stop_times ([number])
	addItemsFromId(data.trips, data.stop_times, 'trip_id', 'stop_times', false);
	//data.stops['AMV'].stop_times ([string])
	addItemsFromId(data.stops, data.stop_times, 'stop_id', 'stop_times', false);
	
	//data.routes['AB'].stops ([number])
	addStopsToRoute();
}

/**
 * return an associative array from the array with the key param
 */
function toAssociativeArray(array, key){
	var associative = [];
	$(array).each(function(i, item){
		associative[item[key]] = item;		
	});
	return associative;
}

/**
 * add X to items of a collections, if X_id is set in that item
 * array[x][key_item]  = array2[array[x][key_id]]
 */
function addItemFromId(array, key_id, key_item, array2){
	for(key in array){
		var key_id_val = array[key][key_id];
		array[key][key_item] = array2[key_id_val];
	}
}

/**
 * add list of Bs to A if B.A_id is set
 * TODO mode where isAssociativeArray is guessed -> key is number or string
 */
function addItemsFromId(array_a, array_b, a_name_id, key_items, isAssociativeArray){
	for(b_id in array_b){
		var b = array_b[b_id];
		var a_id = b[a_name_id];
		var a = array_a[a_id];
		if(a[key_items] ==undefined) a[key_items]=[];
		if(isAssociativeArray)
			a[key_items][b_id] = b;
		else
			a[key_items].push(b);
	}
}

/**
 * create an approximative list of stops for a route (no time)
 * TODO : this list must be provided in the db
 */
 function addStopsToRoute(){
 	for(route_id in data.routes){
 		var trips = data.routes[route_id].trips;
		var stop_times;
		for(i in trips){ //take the first time
			stop_times = trips[i].stop_times;
			break
		}
		data.routes[route_id].stops = [];
		for(i in stop_times){
			data.routes[route_id].stops.push(stop_times[i].stop);
			//console.log(stop_times[i].stop);
		}
 	}
 }


String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
    var _token;
    var str = this + "";
    var i = -1;

    if ( typeof token === "string" ) {

        if ( ignoreCase ) {

            _token = token.toLowerCase();

            while( (
                i = str.toLowerCase().indexOf(
                    token, i >= 0 ? i + newToken.length : 0
                ) ) !== -1
            ) {
                str = str.substring( 0, i ) +
                    newToken +
                    str.substring( i + token.length );
            }

        } else {
            return this.split( token ).join( newToken );
        }

    }
return str;
};