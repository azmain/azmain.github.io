$(document).ready(function(){
	smoothScroll(1200);

	$("contact mail").fitText(1, { minFontSize: '10px', maxFontSize: '65px' });
});

function smoothScroll (duration){
	$('a[href^="#"]').on('click', function(event){
		var target = $($(this).attr('href'));

		if(target.length){
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top - 100
			},duration);
		}
	});
}

//fittext to sizing text according to window size

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );