$(document).ready(function() {
	
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
			  var itemType = $('.nav-pills').find('li.active a').data('itemtype');
			  $( ".logo" ).replaceWith( "<span class='logo'>" + itemType + "</span>" );
	        }
	    });
		
		$('.filter').click(function() {
			menuPanel.open();
			return false;
		});
		
		$('nav a').click(function() {
			menuPanel.close();
			return false;
		});
	
	});

})