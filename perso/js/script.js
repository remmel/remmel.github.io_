
/*  tab */
function loadTab(){
    var id = "#menu-cv";
    
    //on over event
    $(id+" ul li").mouseover(function() {
        var panel_to_show = $(this).find("a").attr("href");
        var panel_selected = $(id+" ul li.selected a").attr("href");
        
        //do no select twice the same panel
        if(panel_to_show == panel_selected) return false;
        
        // tab
        // unselect all the tab
        $(id+" ul li").removeClass("selected");
        $(id+" ul li a").removeClass("selected"); 
        
        // select the right tab
        $(this).find("a").addClass("selected");
        $(this).addClass("selected");
        
        // panel
        $(".tab-panel").hide();
        $(panel_to_show).show(); //fadeIn();
 
        return false;
    });
    
    // hide all panel
    $(".tab-panel").hide();
    //select nth tab
    $(id+" ul li:eq(1)").trigger('mouseover');
}

/* function loading a div as a popup
 TODO, rewrite it to be generic*/
function loadPopup(){
	$(".open-popup-email").click(function(){
	  //centering  
  	var windowWidth = document.documentElement.clientWidth;
  	var windowHeight = document.documentElement.clientHeight;  
  	var popupHeight = $('#popup-email').height();  
  	var popupWidth = $('#popup-email').width();  
  	$("#popup-email").css({  
  		//"position": "fixed",  
  		"top": windowHeight/2-popupHeight/2,  
  		"left": windowWidth/2-popupWidth/2  
  	});
  	
			$("#overlay").css({"opacity": "0.7"}); 
	        $("#popup-email").fadeIn(200);
	        $("#overlay").fadeIn(200);
	    });
	    $(".popup-close").click(function(){
			
	        $("#popup-email").fadeOut(300);
	        $("#overlay").fadeOut(300);
	
	    });

	    $("#rec").click(function(){
	        mimasterpwd = $("#masterpwd").attr("value");
	        $("#masterpwd").attr("value", "");
	        $(".input").fadeOut(300);
	        $("#overlay").fadeOut(300);
	        setTimeout(olvidar, 10 * 60 * 1000);
	    });
	return false;
}
