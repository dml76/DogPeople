$(document).ready(function() {
	
	$('.reviews, .reviews-overlay, .reviews-close, .nearby-search, .rate-app').hide();
	
	/* OFF-CANVAS MENUS */
	$(function() {
	    
	    var menuPanel = $('#menu-panel').scotchPanel({
	        containerSelector: '#site-wrapper',
	        direction: 'left',
	        duration: 300,
	        transition: 'ease',
	        clickSelector: '.menu-tap',
	        distanceX: '250px',
	        enableEscapeKey: true,
	        
	      beforePanelOpen: function() {
		      $('header, .signin_cont').css({
	            '-moz-transform': 'translate3d(250px, 0, 0)',
	            '-ms-transform': 'translate3d(250px, 0, 0)',
	            '-o-transform': 'translate3d(250px, 0, 0)',
	            '-webkit-transform': 'translate3d(250px, 0, 0)',
	            'transform': 'translate3d(250px, 0, 0)'
	          });
	        },
	        beforePanelClose: function() {
	          $('header, .signin_cont').css({
	            '-moz-transform': 'translate3d(0, 0, 0)',
	            '-ms-transform': 'translate3d(0, 0, 0)',
	            '-o-transform': 'translate3d(0, 0, 0)',
	            '-webkit-transform': 'translate3d(0, 0, 0)',
	            'transform': 'translate3d(0, 0, 0)'
	          });
	          
	          /* VIEW TITLE */
			  var itemType = $('.sub-menu').find('li a.active').attr('title');
			  $( ".logo" ).replaceWith( "<span class='logo'>" + itemType + "</span>" );
			  
	        }
	    });
		
		$('.filter').click(function() {
			menuPanel.open();
			return false;
		});
		
		$('.sub-menu li a').click(function() {
			$(".sub-menu a").removeClass('active');
			$(this).addClass('active');
			var itemType = $('.sub-menu').find('li a.active').attr('title');
			menuPanel.close();
			findPlaces();
			return false;
		});
	
	});
	
	/* CHECK FOR PLATFORMS */
	var platformRateLink;	
	if ((navigator.platform.indexOf("iPhone") != -1)) {
		platformRateLink = 'https://itunes.apple.com/app/id1005822759';
	} else {
	    platformRateLink = 'https://play.google.com/store/apps/details?id=com.dmlapps.dogpeople';
	}
	document.getElementById("platform-link").setAttribute("href",platformRateLink);
	
	/* SHOW RATE THIS APP MODAL AGAIN ONCE PER WEEK */
	function rateAppRepeat() {
		$('.rate-app').fadeIn("fast");
	}
	setTimeout(rateAppRepeat, 10000);
	//setTimeout(rateAppRepeat, 604800000);
	
	/* SHOW RATE THIS APP MODAL INITIALLY */
	$('.rate-app .remind').click(function(){
        $('.rate-app').fadeOut("fast");
        setTimeout(rateAppRepeat, 10000)
    });
	
	/* NEVER SHOW RATE THIS APP MODAL AGAIN */
	$('.rate-app .cancel').click(function(){
        $('.rate-app').fadeOut("fast");
    });
	
	/* SHOW FILTER TOOLTIP */
    function filterTooltip() {
		$('.filter').fadeOut("slow");
	}
	setTimeout(filterTooltip, 5000)
    				    
	$(".nearby-search").click(function(){
        if (!$('.sub-menu li a').hasClass("active")) {
			$('.sub-menu li a.all').addClass("active");
		}
        var itemType = $('.sub-menu').find('li a.active').attr('title');
		$( ".logo" ).replaceWith( "<span class='logo'>" + itemType + "</span>" );
        panLoc();
        findPlaces();
    });
    
    $('.refresh').hide();
    $(".refresh").click(function(){
        findPlaces();
    });
    
/*
    $(".sub-menu li a").click(function(){
        $(".sub-menu a").removeClass('active');
        $(this).addClass('active');
        var itemType = $('.sub-menu').find('li a.active').attr('title');
    });
*/

})