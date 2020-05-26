var data = {
'agencies': [
	{
		"agency_id": "DTA",
		"agency_name": "Demo Transit Authority",
		"agency_url": "http://google.com",
		"agency_timezone": "America/Los_Angeles"
	}
],
'calendar_dates' :[
	{
		"service_id": "FULLW",
		"date": "20070604",
		"exception_type": "2"
	}
],
'calendars' : [
	{
		"service_id": "FULLW",
		"monday": "1",
		"tuesday": "1",
		"wednesday": "1",
		"thursday": "1",
		"friday": "1",
		"saturday": "1",
		"sunday": "1",
		"start_date": "20070101",
		"end_date": "20101231"
	},
	{
		"service_id": "WE",
		"monday": "0",
		"tuesday": "0",
		"wednesday": "0",
		"thursday": "0",
		"friday": "0",
		"saturday": "1",
		"sunday": "1",
		"start_date": "20070101",
		"end_date": "20101231"
	}
],
'fare_attributes' : [
	{
		"fare_id": "p",
		"price": "1.25",
		"currency_type": "USD",
		"payment_method": "0",
		"transfers": "0",
		"transfer_duration": ""
	},
	{
		"fare_id": "a",
		"price": "5.25",
		"currency_type": "USD",
		"payment_method": "0",
		"transfers": "0",
		"transfer_duration": ""
	}
],
'fare_rules' :[
	{
		"fare_id": "p",
		"route_id": "AB",
		"origin_id": "",
		"destination_id": "",
		"contains_id": ""
	},
	{
		"fare_id": "p",
		"route_id": "STBA",
		"origin_id": "",
		"destination_id": "",
		"contains_id": ""
	},
	{
		"fare_id": "p",
		"route_id": "BFC",
		"origin_id": "",
		"destination_id": "",
		"contains_id": ""
	},
	{
		"fare_id": "a",
		"route_id": "AAMV",
		"origin_id": "",
		"destination_id": "",
		"contains_id": ""
	}
],
'frequencies' : [
	{
		"trip_id": "STBA",
		"start_time": "6:00:00",
		"end_time": "22:00:00",
		"headway_secs": "1800"
	},
	{
		"trip_id": "CITY1",
		"start_time": "6:00:00",
		"end_time": "7:59:59",
		"headway_secs": "1800"
	},
	{
		"trip_id": "CITY2",
		"start_time": "6:00:00",
		"end_time": "7:59:59",
		"headway_secs": "1800"
	},
	{
		"trip_id": "CITY1",
		"start_time": "8:00:00",
		"end_time": "9:59:59",
		"headway_secs": "600"
	},
	{
		"trip_id": "CITY2",
		"start_time": "8:00:00",
		"end_time": "9:59:59",
		"headway_secs": "600"
	},
	{
		"trip_id": "CITY1",
		"start_time": "10:00:00",
		"end_time": "15:59:59",
		"headway_secs": "1800"
	},
	{
		"trip_id": "CITY2",
		"start_time": "10:00:00",
		"end_time": "15:59:59",
		"headway_secs": "1800"
	},
	{
		"trip_id": "CITY1",
		"start_time": "16:00:00",
		"end_time": "18:59:59",
		"headway_secs": "600"
	},
	{
		"trip_id": "CITY2",
		"start_time": "16:00:00",
		"end_time": "18:59:59",
		"headway_secs": "600"
	},
	{
		"trip_id": "CITY1",
		"start_time": "19:00:00",
		"end_time": "22:00:00",
		"headway_secs": "1800"
	},
	{
		"trip_id": "CITY2",
		"start_time": "19:00:00",
		"end_time": "22:00:00",
		"headway_secs": "1800"
	}
],
'stop_times': [
	{
		"trip_id": "STBA",
		"arrival_time": "6:00:00",
		"departure_time": "6:00:00",
		"stop_id": "STAGECOACH",
		"stop_sequence": "1",
		"stop_headsign": "",
		"pickup_type": "",
		"drop_off_time": "",
		"shape_dist_traveled": ""
	},
	{
		"trip_id": "STBA",
		"arrival_time": "6:20:00",
		"departure_time": "6:20:00",
		"stop_id": "BEATTY_AIRPORT",
		"stop_sequence": "2",
		"stop_headsign": "",
		"pickup_type": "",
		"drop_off_time": "",
		"shape_dist_traveled": ""
	},
	{
		"trip_id": "CITY1",
		"arrival_time": "6:00:00",
		"departure_time": "6:00:00",
		"stop_id": "STAGECOACH",
		"stop_sequence": "1",
		"stop_headsign": "",
		"pickup_type": "",
		"drop_off_time": "",
		"shape_dist_traveled": ""
	},
	{
		"trip_id": "CITY1",
		"arrival_time": "6:05:00",
		"departure_time": "6:07:00",
		"stop_id": "NANAA",
		"stop_sequence": "2",
		"stop_headsign": "",
		"pickup_type": "",
		"drop_off_time": "",
		"shape_dist_traveled": ""
	},
	{
		"trip_id": "CITY1",
		"arrival_time": "6:12:00",
		"departure_time": "6:14:00",
		"stop_id": "NADAV",
		"stop_sequence": "3",
		"stop_headsign": "",
		"pickup_type": "",
		"drop_off_time": "",
		"shape_dist_traveled": ""
	},
	{
		"trip_id": "CITY1",
		"arrival_time": "6:19:00",
		"departure_time": "6:21:00",
		"stop_id": "DADAN",
		"stop_sequence": "4",
		"stop_headsign": "",
		"pickup_type": "",
		"drop_off_time": "",
		"shape_dist_traveled": ""
	},
	{
		"trip_id": "CITY1",
		"arrival_time": "6:26:00",
		"departure_time": "6:28:00",
		"stop_id": "EMSI",
		"stop_sequence": "5",
		"stop_headsign": "",
		"pickup_type": "",
		"drop_off_time": "",
		"shape_dist_traveled": ""
	},
	{
		"trip_id": "CITY2",
		"arrival_time": "6:28:00",
		"departure_time": "6:30:00",
		"stop_id": "EMSI",
		"stop_sequence": "1",
		"stop_headsign": "",
		"pickup_type": "",
		"drop_off_time": "",
		"shape_dist_traveled": ""
	},
	{
		"trip_id": "CITY2",
		"arrival_time": "6:35:00",
		"departure_time": "6:37:00",
		"stop_id": "DADAN",
		"stop_sequence": "2",
		"stop_headsign": "",
		"pickup_type": "",
		"drop_off_time": "",
		"shape_dist_traveled": ""
	},
	{
		"trip_id": "CITY2",
		"arrival_time": "6:42:00",
		"departure_time": "6:44:00",
		"stop_id": "NADAV",
		"stop_sequence": "3",
		"stop_headsign": "",
		"pickup_type": "",
		"drop_off_time": "",
		"shape_dist_traveled": ""
	},
	{
		"trip_id": "CITY2",
		"arrival_time": "6:49:00",
		"departure_time": "6:51:00",
		"stop_id": "NANAA",
		"stop_sequence": "4",
		"stop_headsign": "",
		"pickup_type": "",
		"drop_off_time": "",
		"shape_dist_traveled": ""
	},
	{
		"trip_id": "CITY2",
		"arrival_time": "6:56:00",
		"departure_time": "6:58:00",
		"stop_id": "STAGECOACH",
		"stop_sequence": "5",
		"stop_headsign": "",
		"pickup_type": "",
		"drop_off_time": "",
		"shape_dist_traveled": ""
	},
	{
		"trip_id": "AB1",
		"arrival_time": "8:00:00",
		"departure_time": "8:00:00",
		"stop_id": "BEATTY_AIRPORT",
		"stop_sequence": "1",
		"stop_headsign": "",
		"pickup_type": "",
		"drop_off_time": "",
		"shape_dist_traveled": ""
	},
	{
		"trip_id": "AB1",
		"arrival_time": "8:10:00",
		"departure_time": "8:15:00",
		"stop_id": "BULLFROG",
		"stop_sequence": "2",
		"stop_headsign": "",
		"pickup_type": "",
		"drop_off_time": "",
		"shape_dist_traveled": ""
	},
	{
		"trip_id": "AB2",
		"arrival_time": "12:05:00",
		"departure_time": "12:05:00",
		"stop_id": "BULLFROG",
		"stop_sequence": "1",
		"stop_headsign": "",
		"pickup_type": "",
		"drop_off_time": "",
		"shape_dist_traveled": ""
	},
	{
		"trip_id": "AB2",
		"arrival_time": "12:15:00",
		"departure_time": "12:15:00",
		"stop_id": "BEATTY_AIRPORT",
		"stop_sequence": "2"
	},
	{
		"trip_id": "BFC1",
		"arrival_time": "8:20:00",
		"departure_time": "8:20:00",
		"stop_id": "BULLFROG",
		"stop_sequence": "1"
	},
	{
		"trip_id": "BFC1",
		"arrival_time": "9:20:00",
		"departure_time": "9:20:00",
		"stop_id": "FUR_CREEK_RES",
		"stop_sequence": "2"
	},
	{
		"trip_id": "BFC2",
		"arrival_time": "11:00:00",
		"departure_time": "11:00:00",
		"stop_id": "FUR_CREEK_RES",
		"stop_sequence": "1"
	},
	{
		"trip_id": "BFC2",
		"arrival_time": "12:00:00",
		"departure_time": "12:00:00",
		"stop_id": "BULLFROG",
		"stop_sequence": "2"
	},
	{
		"trip_id": "AAMV1",
		"arrival_time": "8:00:00",
		"departure_time": "8:00:00",
		"stop_id": "BEATTY_AIRPORT",
		"stop_sequence": "1"
	},
	{
		"trip_id": "AAMV1",
		"arrival_time": "9:00:00",
		"departure_time": "9:00:00",
		"stop_id": "AMV",
		"stop_sequence": "2"
	},
	{
		"trip_id": "AAMV2",
		"arrival_time": "10:00:00",
		"departure_time": "10:00:00",
		"stop_id": "AMV",
		"stop_sequence": "1"
	},
	{
		"trip_id": "AAMV2",
		"arrival_time": "11:00:00",
		"departure_time": "11:00:00",
		"stop_id": "BEATTY_AIRPORT",
		"stop_sequence": "2"
	},
	{
		"trip_id": "AAMV3",
		"arrival_time": "13:00:00",
		"departure_time": "13:00:00",
		"stop_id": "BEATTY_AIRPORT",
		"stop_sequence": "1"
	},
	{
		"trip_id": "AAMV3",
		"arrival_time": "14:00:00",
		"departure_time": "14:00:00",
		"stop_id": "AMV",
		"stop_sequence": "2"
	},
	{
		"trip_id": "AAMV4",
		"arrival_time": "15:00:00",
		"departure_time": "15:00:00",
		"stop_id": "AMV",
		"stop_sequence": "1"
	},
	{
		"trip_id": "AAMV4",
		"arrival_time": "16:00:00",
		"departure_time": "16:00:00",
		"stop_id": "BEATTY_AIRPORT",
		"stop_sequence": "2"
	}
],
'stops': [
	{
		"stop_id": "FUR_CREEK_RES",
		"stop_name": "Furnace Creek Resort (Demo)",
		"stop_desc": "",
		"stop_lat": "36.425288",
		"stop_lon": "-117.133162",
		"zone_id": "",
		"stop_url": ""
	},
	{
		"stop_id": "BEATTY_AIRPORT",
		"stop_name": "Nye County Airport (Demo)",
		"stop_desc": "",
		"stop_lat": "36.868446",
		"stop_lon": "-116.784582",
		"zone_id": "",
		"stop_url": ""
	},
	{
		"stop_id": "BULLFROG",
		"stop_name": "Bullfrog (Demo)",
		"stop_desc": "",
		"stop_lat": "36.88108",
		"stop_lon": "-116.81797",
		"zone_id": "",
		"stop_url": ""
	},
	{
		"stop_id": "STAGECOACH",
		"stop_name": "Stagecoach Hotel & Casino (Demo)",
		"stop_desc": "",
		"stop_lat": "36.915682",
		"stop_lon": "-116.751677",
		"zone_id": "",
		"stop_url": ""
	},
	{
		"stop_id": "NADAV",
		"stop_name": "North Ave / D Ave N (Demo)",
		"stop_desc": "",
		"stop_lat": "36.914893",
		"stop_lon": "-116.76821",
		"zone_id": "",
		"stop_url": ""
	},
	{
		"stop_id": "NANAA",
		"stop_name": "North Ave / N A Ave (Demo)",
		"stop_desc": "",
		"stop_lat": "36.914944",
		"stop_lon": "-116.761472",
		"zone_id": "",
		"stop_url": ""
	},
	{
		"stop_id": "DADAN",
		"stop_name": "Doing Ave / D Ave N (Demo)",
		"stop_desc": "",
		"stop_lat": "36.909489",
		"stop_lon": "-116.768242",
		"zone_id": "",
		"stop_url": ""
	},
	{
		"stop_id": "EMSI",
		"stop_name": "E Main St / S Irving St (Demo)",
		"stop_desc": "",
		"stop_lat": "36.905697",
		"stop_lon": "-116.76218",
		"zone_id": "",
		"stop_url": ""
	},
	{
		"stop_id": "AMV",
		"stop_name": "Amargosa Valley (Demo)",
		"stop_desc": "",
		"stop_lat": "36.641496",
		"stop_lon": "-116.40094",
		"zone_id": "",
		"stop_url": ""
	}
],
'trips' : [
	{
		"route_id": "AB",
		"service_id": "FULLW",
		"trip_id": "AB1",
		"trip_headsign": "to Bullfrog",
		"direction_id": "0",
		"block_id": "1",
		"shape_id": ""
	},
	{
		"route_id": "AB",
		"service_id": "FULLW",
		"trip_id": "AB2",
		"trip_headsign": "to Airport",
		"direction_id": "1",
		"block_id": "2",
		"shape_id": ""
	},
	{
		"route_id": "STBA",
		"service_id": "FULLW",
		"trip_id": "STBA",
		"trip_headsign": "Shuttle",
		"direction_id": "",
		"block_id": "",
		"shape_id": ""
	},
	{
		"route_id": "CITY",
		"service_id": "FULLW",
		"trip_id": "CITY1",
		"trip_headsign": "",
		"direction_id": "0",
		"block_id": "",
		"shape_id": ""
	},
	{
		"route_id": "CITY",
		"service_id": "FULLW",
		"trip_id": "CITY2",
		"trip_headsign": "",
		"direction_id": "1",
		"block_id": "",
		"shape_id": ""
	},
	{
		"route_id": "BFC",
		"service_id": "FULLW",
		"trip_id": "BFC1",
		"trip_headsign": "to Furnace Creek Resort",
		"direction_id": "0",
		"block_id": "1",
		"shape_id": ""
	},
	{
		"route_id": "BFC",
		"service_id": "FULLW",
		"trip_id": "BFC2",
		"trip_headsign": "to Bullfrog",
		"direction_id": "1",
		"block_id": "2",
		"shape_id": ""
	},
	{
		"route_id": "AAMV",
		"service_id": "WE",
		"trip_id": "AAMV1",
		"trip_headsign": "to Amargosa Valley",
		"direction_id": "0",
		"block_id": "",
		"shape_id": ""
	},
	{
		"route_id": "AAMV",
		"service_id": "WE",
		"trip_id": "AAMV2",
		"trip_headsign": "to Airport",
		"direction_id": "1",
		"block_id": "",
		"shape_id": ""
	},
	{
		"route_id": "AAMV",
		"service_id": "WE",
		"trip_id": "AAMV3",
		"trip_headsign": "to Amargosa Valley",
		"direction_id": "0",
		"block_id": "",
		"shape_id": ""
	},
	{
		"route_id": "AAMV",
		"service_id": "WE",
		"trip_id": "AAMV4",
		"trip_headsign": "to Airport",
		"direction_id": "1",
		"block_id": "",
		"shape_id": ""
	}
],
'routes' :[
	{
		"route_id": "AB",
		"agency_id": "DTA",
		"route_short_name": "10",
		"route_long_name": "Airport - Bullfrog",
		"route_desc": "",
		"route_type": "3",
		"route_url": "",
		"route_color": "00FFFF",
		"route_text_color": ""
	},
	{
		"route_id": "BFC",
		"agency_id": "DTA",
		"route_short_name": "20",
		"route_long_name": "Bullfrog - Furnace Creek Resort",
		"route_desc": "",
		"route_type": "3",
		"route_url": "",
		"route_color": "00FF00",
		"route_text_color": ""
	},
	{
		"route_id": "STBA",
		"agency_id": "DTA",
		"route_short_name": "30",
		"route_long_name": "Stagecoach - Airport Shuttle",
		"route_desc": "",
		"route_type": "3",
		"route_url": "",
		"route_color": "FF0000",
		"route_text_color": ""
	},
	{
		"route_id": "CITY",
		"agency_id": "DTA",
		"route_short_name": "40",
		"route_long_name": "City",
		"route_desc": "",
		"route_type": "3",
		"route_url": "",
		"route_color": "0000FF",
		"route_text_color": ""
	},
	{
		"route_id": "AAMV",
		"agency_id": "DTA",
		"route_short_name": "50",
		"route_long_name": "Airport - Amargosa Valley",
		"route_desc": "",
		"route_type": "3",
		"route_url": "",
		"route_color": "00FFFF",
		"route_text_color": ""
	}
],



};