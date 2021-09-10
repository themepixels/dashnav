$(function(){
  'use script'

  feather.replace();

  $('.sidebar-search .form-control').on('focusin focusout', function(e){
    if(e.type === 'focusin') {
      $(this).parent().addClass('onfocus');
    } else {
      $(this).parent().removeClass('onfocus');
    }
  });

  $('.nav-sidebar .nav-link').on('click', function(e){
    e.preventDefault();

    $(this).addClass('active').siblings().removeClass('active');
  });

  $('#navigationStyles a').on('click', function(e){
    e.preventDefault();
    var s = $(this).attr('data-style');

    $(this).addClass('active').siblings().removeClass('active');

    $('.nav-sidebar').removeClass('style-one style-two style-three');

    if(s !== 'base') {
      $('.nav-sidebar').addClass(s);
    }
  })
})
