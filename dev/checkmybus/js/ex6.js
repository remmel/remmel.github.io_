//chromium-browser --disable-web-security
cleanData();
linkData();

$(document).ready(function(){
	console.log('ready');
});

//index.html
$(document).delegate('#homePage', 'pageinit', function () {
	displayHomepage();
	//console.log(data.routes);
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
$(document).delegate('#mapPage', 'pageshow', function () {
	if (typeof(google) === 'object' && typeof(google.maps) === 'object')
		displayMap();
	else
		alert("Vous devez avoir accès à internet pour consulter la carte");
});

//ex6_timetable.html?route_id=xxx
$(document).delegate('#timetableListPage', 'pagebeforeshow', function () {
	console.log('timetableListPage');
	console.log(getUrlVars());
	var route_id = getUrlVars()["route_id"];
	displayTimetable(route_id, 1);
	displayTimetable(route_id, 0);
	displayTimetable1or2();
	
	//stopTimeListChoice
	$("#timetableChoice :radio").click(function(){
		displayTimetable1or2();
	});
	
	function displayTimetable1or2(){
		var checked = $("#timetableChoice :radio:checked").val();
		var timetable1 = $("#timetable-1");
		var timetable2 = $("#timetable-0");
		
		if(checked == "1"){
			timetable2.hide();
			timetable1.show();
		}else{
			timetable1.hide();
			timetable2.show();
		}
	}
	
});

function displayHomepage(){
	var ligneList = '<option value="$0">$0 - $1</option>';
	var select = $("#routesSelect");
	var select2 = $("#stopsSelect");
	var stopTimesAllListUI = $("#stopTimeListAll");
	var stopTimesNextListUI = $("#stopTimeListNext");
	var stopTimesListChoiceUI = $("#stopTimeListChoice");
	var btTimetable = $("#bt-timetable");
		
	for(index in data.routes) {
        var row = data.routes[index];
  		var option = ligneList.replace("$1", row.route_long_name)
  			.replaceAll("$0", row.route_id)
  			.replace("$1", row.route_short_name);
  		select.append(option);
	};
	
	select.change(function(){
		var route_id = select.val();
		if(route_id !=""){
			btTimetable.removeClass("ui-disabled");
			btTimetable.find("a").text("Horaires de "+route_id).attr("href", "ex6_timetable.html?route_id="+route_id);
		
			select2.selectmenu("enable");
			$("#stopsSelect option:not([data-placeholder])").remove();
			var stopList = '<option value="$0">$1</option>';
			for(i in data.routes[route_id].stops){
				var row = data.routes[route_id].stops[i];
				var option = stopList.replace("$1", row.stop_name)
					.replaceAll("$0", row.stop_id);
				select2.append(option);
			}
		}else{
			select2.selectmenu("disable");
			btTimetable.addClass("ui-disabled");
		}
		select2.selectmenu('refresh', true);
	});
	//select.listview("refresh");
	
	select2.change(function(){
		var stop_id = select2.val();
		var stop = data.stops[stop_id];
		var nbNextBus = 0;
		
		var ligneList = "<li><p>$1</p><p>$0 ($3) vers $2</p></li>";
		var liNext = "<li><p>$1</p><p>$4 vers $2</p></li>";
		
		stopTimesListChoiceUI.show();
		stopTimesAllListUI.empty();
		stopTimesNextListUI.empty();
		
		var stop_times = data.stops[stop_id].stop_times;
		stop_times.sort(function(a,b){return a.departure_time_mn-b.departure_time_mn});
		
		$( stop_times ).each(function( index, stop_time){
			var route = stop_time.trip.route;
			var newLigne =ligneList
				.replace("$0", stop_time.departure_time)
				.replace("$1", stop_time.trip.route.route_long_name)
				.replace("$2", getDirection(stop_time.trip.route, stop_time.trip.direction_id))
				.replace("$3", stop_time.trip.service.op71_jour);
				
			if(stop_time.departure_time != "-"){
				stopTimesAllListUI.append(newLigne);
				
				if(isToday(stop_time)){
					var mn = inXXMinutes(stop_time);
					if(mn > -5 && nbNextBus < 6){
						nbNextBus++;
						var newLi = liNext
							.replace("$0", stop_time.departure_time)
							.replace("$1", stop_time.trip.route.route_long_name)
							.replace("$2", getDirection(stop_time.trip.route, stop_time.trip.direction_id))
							.replace("$4", niceMinutes(mn));
						stopTimesNextListUI.append(newLi);
					}
				}
			}
		});
		if(!nbNextBus)
			stopTimesNextListUI.append("<li>Plus de bus pour aujourd'hui!</li>");
		stopTimesNextListUI.listview("refresh");
		stopTimesAllListUI.listview("refresh");
		
		displayStopTimesNextOrAll();
	});
	
	//stopTimeListChoice
	$("#stopTimeListChoice :radio").click(function(){
		displayStopTimesNextOrAll();
	});
	
	function displayStopTimesNextOrAll(){
		var checked = $("#stopTimeListChoice :radio:checked").val();
		
		if(checked == "all"){
			stopTimesNextListUI.hide();
			stopTimesAllListUI.show();
		}else{
			stopTimesAllListUI.hide();
			stopTimesNextListUI.show();
		}
	}
	
}

function isToday(stop_time){
	var now = new Date();
	var day = now.getDay();
	if(day == 0) day = 7;
	day--;
	var c = stop_time.trip.service.op71_jour[day];
	return (c!="-");
}

function inXXMinutes(stop_time){
	var dt = new Date();
	var now_min = dt.getMinutes() + 60 * dt.getHours();
	//var stop_time_min = hhmmToMin(stop_time.departure_time);
	return stop_time.departure_time_mn - now_min;
}

function hhmmToMin(hhmm){
	var a = hhmm.split(':');
	return (+a[0]) * 60 + (+a[1]);
}

function niceMinutes(minutes){
	var s = (minutes>=0)?"+":"-";
	minutes = Math.abs(minutes);
	var hh = Math.floor(minutes / 60);
	var mm = minutes % 60;
	
	if(hh!=0)
		s += hh+"h";
	if(mm!=0)
		s += mm+"min";
	
	return s;
}

function getDirection(route, direction_id){
	var a = route.route_long_name.split("-");
	if(direction_id){
		return a[0].trim();
	}else{
		return a[a.length-1].trim();
	}
}

function displayMap(){
	var mapCenter = new google.maps.LatLng(46.561816,4.911953);
	myoptions = { zoom: 9, center: mapCenter, mapTypeId: google.maps.MapTypeId.ROADMAP };
	map = new google.maps.Map(document.getElementById("map-canvas"), myoptions);
	infowindow = new google.maps.InfoWindow();
	
	for(route_id in data.routes){
		var route = data.routes[route_id];
		var routePathPositions = [];
		
		for(stop_i in route.stops){
			var stop = route.stops[stop_i];
			var position = new google.maps.LatLng(stop.stop_lat,stop.stop_lon);
			var marker = new google.maps.Marker({
				position: position,
				map: map,
				title:stop.stop_name,
				icon: 'js/marker.png'
				//icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=bus'
				//icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=bus%7C'+route.route_color
		    });
		    marker.stop = stop;
			
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
	
// tell google to resize the map
	google.maps.event.trigger(map, 'resize');
	$('#map-canvas').height(
		$(window).height() - (5 + $('#mapPage [data-role=header]').last().height() + $('#mapPage [data-role=footer]').last().height())
	); //outerHeight
	/*setTimeout(function(){
		google.maps.event.trigger(map, 'resize');
		map.setCenter(mapCenter);
	},10);*/
}



function displayTimetable(route_id, direction_id){
	var timetableUI = $("#timetable-"+direction_id);
	var routes = data.routes[route_id];
	table = [];
	for(var i=0;i<routes.trips.length;i++){
		var trip = routes.trips[i];
		if(trip == undefined) continue;
		//console.log(trip);
		var trip_id = trip.trip_id;
		if(trip.direction_id == direction_id){
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
				row +="<td>"+stop_time.stop.stop_name+"</td>";
				stopNamePrinted = true;
			}
			if(!headerPrinted){
				rowHeader += "<td>" + stop_time.trip.service.op71_jour+ "</td>";
			}
			row +="<td class='stop_time'>"+stop_time.departure_time+"</td>";
		}
		if(!headerPrinted)
			timetableUI.append(rowHeader);
		headerPrinted = true;
		row +="</tr>";
		timetableUI.append(row);
		stopNamePrinted = false;
	}
}

//TODO link service id + order trip by op71_code_serv


function displayRouteList(){
	//$('#routeList li').remove();
	//var ligneList = "<li data-theme=\"c\"><a href=\"ex5_route.html?id=$0\" data-transition=\"slide\">$1 ($0)</a></li>";
	var ligneList = "<li data-theme=\"c\"><a href=\"ex6_timetable.html?route_id=$0\" data-transition=\"slide\">$0 - $1</a></li>";
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
    for(var i = 0; i < hashes.length; i++){
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
		if(stop_time.departure_time != "-"){
			stop_time.departure_time_mn = hhmmToMin(stop_time.departure_time);
		}
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