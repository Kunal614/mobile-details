$(document).ready(function() {

    $("#touch").hover(function() {
        $("#fill").slideDown("slow");
    });

    $('#slider').on('initialized', function() {
        $('.anythingSlider-in5 .arrow.forward').addClass('blink');
        $('#slider').one('slide_begin', function() {
            $('.anythingSlider-in5 .arrow.forward').removeClass('blink');
        });
    });

});