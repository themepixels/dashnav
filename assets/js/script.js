$(function(){
  'use script'

  feather.replace();

  const sb = new PerfectScrollbar('.sidebar-body', {
    suppressScrollX: true
  });

  $('.sidebar').on('mouseenter mouseleave', function(e) {
    var isHover = (e.type === 'mouseenter')? true : false;

    if($('.sidebar').hasClass('minimized')) {
      if(isHover) {
        setTimeout(function(){
          $('.sidebar').addClass('expand');
          sb.update();
        }, 300);
      } else {
        $('.sidebar').removeClass('expand');
        $('.sidebar-body').scrollTop(0);
        sb.update();
      }
    }
  });

  $('.search-body .form-control').on('focusin focusout', function(e){
    $(this).parent().removeClass('onhover');

    if(e.type === 'focusin') {
      $(this).parent().addClass('onfocus');
    } else {
      $(this).parent().removeClass('onfocus');
    }
  });

  $('.search-body').on('mouseover mouseleave', function(e){
    if(!$(this).hasClass('onfocus')) {
      $(this).toggleClass('onhover', e.type === 'mouseover');
    }
  });

  // single level menu
  $('.nav-sidebar > .nav-link').on('click', function(e){
    e.preventDefault();

    // remove active siblings
    $(this).addClass('active').siblings().removeClass('active');

    // remove active siblings from other nav
    var ss = $(this).closest('.nav-sidebar').siblings('.nav-sidebar');
    var sg = $(this).closest('.nav-group').siblings('.nav-group');

    ss.find('.active').removeClass('active');
    ss.find('.show').removeClass('show');

    sg.find('.active').removeClass('active');
    sg.find('.show').removeClass('show');
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

    var ss = $(this).closest('.nav-sidebar').siblings('.nav-sidebar');
    var sg = $(this).closest('.nav-group').siblings('.nav-group');

    ss.find('.active').removeClass('active');
    ss.find('.show').removeClass('show');

    sg.find('.active').removeClass('active');
    sg.find('.show').removeClass('show');

    sb.update();
  });

  $('.nav-sub').on('click', '.sub-link', function(e){
    e.preventDefault();

    $(this).addClass('active').siblings().removeClass('active');

    $(this).closest('.nav-item').addClass('active').siblings().removeClass('active');
    $(this).closest('.nav-item').siblings().find('.sub-link').removeClass('active');

    $(this).closest('.nav-sidebar').siblings().find('.active').removeClass('active');
    $(this).closest('.nav-group').siblings().find('.active').removeClass('active');
  });

  $('.nav-group-label').on('click', function(){
    $(this).closest('.nav-group').toggleClass('show');
    $(this).closest('.nav-group').siblings().removeClass('show');

    sb.update();
  });

  // content menu
  $('#contentMenu').on('click', function(e){
    e.preventDefault();
    $('.sidebar').toggleClass('minimized');

    $('.sidebar-body').scrollTop(0);
    sb.update();
  });

  // mobile menu
  $('#mobileMenu').on('click', function(e){
    e.preventDefault();
    $('body').toggleClass('sidebar-show');
  });

  // for demo only
  $('#navigationSkins a').on('click', function(e){
    e.preventDefault();

    var s = $(this).attr('data-skin');
    localStorage.setItem('skin', s);

    location.reload();
  });

  $('#navigationStyles a').on('click', function(e){
    e.preventDefault();

    var s = $(this).attr('data-style');
    localStorage.setItem('style', s);

    location.reload();
  });

  //on page load
  var sk = (localStorage.getItem('skin'))? localStorage.getItem('skin') : 'base';
  var st = (localStorage.getItem('style'))? localStorage.getItem('style') : 'base';

  // skin
  $('body').attr('class', function(i, c){
    return c.replace(/(^|\s)skin-\S+/g, '');
  });

  $('body').addClass('skin-'+sk);
  $('#navigationSkins a[data-skin='+sk+']').addClass('active').siblings().removeClass('active');

  //sidebar nav style
  $('.nav-sidebar').attr('class', function(i, c){
    return c.replace(/(^|\s)style-\S+/g, '');
  });

  if(st !== 'base') {
    $('.nav-sidebar').addClass('style-'+st);
  }

  $('#navigationStyles a[data-style='+st+']').addClass('active').siblings().removeClass('active');

});
