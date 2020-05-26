function getRoutes(){
	return data.routes;
}

function getStops1(route_id){
	var stops = [];
	for(index in data.trips ){
		var raw = data.trips[index];
		if(raw.route_id === route_id){
			//console.log(raw.trip_id );
			for(index2 in data.stop_times){
				var row2 = data.stop_times[index2];
				if(row2.trip_id == raw.trip_id){
					//console.log(row2);
					stops.push(row2.stop_id);
				}
			};
			//console.log(stops);
			return stops;
		}
  			
	};
	
}

function getStops(route_id){
	var stops = [];
	var stop_ids = getStops1(route_id);
	for(i in stop_ids){
		var stop_id = stop_ids[i];
		for(j in data.stops){
			var stop = data.stops[j];
			if(stop.stop_id === stop_id){
				console.log(stop);
				stops.push(stop);
			}
		}
		
	}
	return stops;
}






$(document).ready(function(){
	generateRoutesHTML();
	
	
	$(document).bind("pagebeforechange", function( event, data ) {
    	$.mobile.pageData = (data && data.options && data.options.pageData)
        ? data.options.pageData : null;
	});
	
	
	
    $('div[data-role="page"]').bind('pageshow',function(event, ui){
        //console.log(event);
        //console.log(route_id);
        //var query = window.location.search;
        console.log($(this).data("url"));
        console.log(window.location);
        
    });
    
    $("#page2").bind("pagebeforeshow", function(e, data){
    if ($.mobile.pageData && $.mobile.pageData.id){
        console.log("Parameter id=" + $.mobile.pageData.id);
    }
});
    
    $('a').bind("click", function() {  
    	route_id= $(this).attr("data-route_id"); 
    	generateRouteHTML(route_id); 
    	
	}); 
	
	
	
	
});

function generateRouteHTML(route_id){
	console.log(1);
	var ligneList = "<li data-stop_id=\"$0\" data-theme=\"c\"><a href=\"#page3\" data-route_id=\"$0\" data-transition=\"slide\">$1</a></li>";
	//$('li[data-stop_id]').remove();
	var stops = getStops(route_id);
	$( stops ).each(function( index ) {
        var row = stops[index];
  		
  		var newLigne = ligneList.replace("$1", row.stop_name)
  			.replace("$0", row.stop_id_id);
  			
  		$("#list2").append(newLigne);
	});
	//$("#list2").listview("refresh");
}

function generateRoutesHTML(){
	//$('li[data-route_id]').remove();
	var ligneList = "<li data-theme=\"c\" data-route_id=\"$0\"><a href=\"#page2?id=k\" data-stop_id=\"$0\" data-transition=\"slide\">$1</a></li>";
	
	var routes = getRoutes();
	$( routes ).each(function( index ) {
        var row = routes[index];
  		//console.log( row );
  		
  		var newLigne = ligneList.replace("$1", row.route_long_name)
  			.replace("$0", row.route_id);
  			
  		$("#list1").append(newLigne);
	});
	$("#list1").listview("refresh");
}