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

  // single level menu
  $('.nav-sidebar > .nav-link').on('click', function(e){
    e.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');
  });

  // two level menu
  $('.nav-sidebar .nav-item').on('click', '.nav-link', function(e){
    e.preventDefault();
    if($(this).hasClass('with-sub')) {
      $(this).parent().toggleClass('show');
      $(this).parent().siblings().removeClass('show');
    } else {
      $(this).parent().addClass('active').siblings().removeClass('active');
      $(this).parent().siblings().find('.sub-link').removeClass('active');
    }
  });

  $('.nav-sub').on('click', '.sub-link', function(e){
    e.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');
    $(this).closest('.nav-item').addClass('active').siblings().removeClass('active');
    $(this).closest('.nav-item').siblings().find('.sub-link').removeClass('active');
  });


  // for demo only
  $('#navigationStyles a').on('click', function(e){
    e.preventDefault();
    var s = $(this).attr('data-style');

    $(this).addClass('active').siblings().removeClass('active');

    $('.nav-sidebar').removeClass('style-one style-two style-three');

    if(s !== 'base') {
      $('.nav-sidebar').addClass(s);
    }
  });
})
