$ = require('jquery');

// Smooth scroll for nav to body
function smoothScroll (duration) {
 $('a[href^="#"]').on('click', function(e) {

     var target = $( $(this).attr('href') );

     if( target.length ) {
         e.preventDefault();
         $('html, body').animate({
             scrollTop: target.offset().top
         }, duration);
     }
 });
}
