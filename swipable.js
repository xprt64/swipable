/**
 * This plugin needs jquery, i.e. <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
 */
(function($){
	
	$.fn.swipable = function(opt){
		return this.each(function(){
			start.call(this, opt); //see the start function below
		});
	};

	$.fn.swipable.defaults = {
		threshold: 50, //pixels
		swipeLeft: function(drag_x){}, //default callback for swipe left event
		swipeRight: function(drag_x){} //default callback for swipe right event
	};
	
	/**
	 * start our plugin for one HTML element only
	 */
	function start(opt){
		
		// our HTML element is this
		var our_elem = this;
		
		/**
		 * The event that occurred at mouse down
		 */
		var mouse_down_event = null;
		
		opt = $.extend({}, $.fn.swipable.defaults, opt);
		
		/**
		 * save the event 
		 */
		$(our_elem).mousedown(function(event) {
			mouse_down_event = event;
			return true;
	   });

		/**
		 * unset the event
		 */
		$(document).on("mouseup", function() {
			mouse_down_event = null;
			return true;
		});
		
		$(document).on("mousemove", function(event) {
			if(!mouse_down_event)
				return true;//if an mousedown event not followed by a mouseup event never occurred
		   
		   //if the user moved the mouse more than opt.threshold pixels to the right
			if(event.pageX > mouse_down_event.pageX + opt.threshold)
			{
				//call the supplied callback, if any
				if(typeof opt.swipeRight === 'function')
					opt.swipeRight.call(our_elem, event.pageX - mouse_down_event.pageX);
			}
			//if the user moved the mouse more than opt.threshold pixels to the left
			else if(event.pageX < mouse_down_event.pageX - opt.threshold)
			{
				//call the supplied callback, if any
				if(typeof opt.swipeLeft === 'function')
					opt.swipeLeft.call(our_elem, event.pageX - mouse_down_event.pageX);
			}
			
			return true;//allow other handlers to run
		});	

		return this;//allow other handlers to run
	};
}(jQuery));
