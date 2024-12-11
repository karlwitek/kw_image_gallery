jQuery(document).ready(function($) {

  // display first slide as main image
  let mainImgDiv = $('.kwsg-main-image-container').find('[data-id="0"]')[0];

  $(mainImgDiv).addClass('kwsg-show');

  $('.kwsg-slide-size').on({
    "click" : function(event) {

      $('.kwsg-abs-pos-overlay').addClass('kwsg-overlay-show');

      setTimeout(function() {
        let currentImageDiv = $('.kwsg-main-image-container').find('.kwsg-show')[0];

        let imageId = $(event.target).parent()[0].dataset.id;
        
        let mainImgDiv = $('.kwsg-main-image-container').find(`[data-id='${imageId}']`)[0];
  
        $(currentImageDiv).removeClass('kwsg-show');
  
        $(mainImgDiv).addClass('kwsg-show');

        $('.kwsg-abs-pos-overlay').removeClass('kwsg-overlay-show');

      }, 400);

    },
    "mouseover": function(event) {
      $(this).addClass('kwsg-scale-up');
    },
    "mouseout": function(event) {
      $(this).removeClass('kwsg-scale-up');
    }
  });

});