//Header Scroll
function headerScroll() {
  $(window).scroll(function () {
    var scrolled = $(window).scrollTop();
    if (scrolled > 30) {
      $('.header').addClass('active');
    } else {
      $('.header').removeClass('active');
    }
  });
};


//Burger Menu 1024
function burger(){
  var menu = $('.header__content-wrap');
  $('.burger').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('open');
    if ($('.burger').hasClass('active')) {
      menu.slideUp('fast');
      $(this).removeClass('active');
    } else {
      menu.slideDown('fast');
      $(this).addClass('active');
    }
  });

  $(window).resize(function() {
    var menu = $('.header__content-wrap');
    var w = $(window).width();
    if(w > 1024) {
      menu.removeAttr('style');
      $('.burger').removeClass('open');
      $('.burger').removeClass('active');
    }
  });
};


//Search Input Show
function search() {
  $('.js-search').on('click', function(e){
    e.preventDefault();
    $('.header__search').addClass('active');
    $('.js-search').siblings('.header__search-form').addClass('active');
    $('.js-header-search input').focus();
    $(this).hide();
    return false;
  });
};


$(document).ready(function(){

  headerScroll();
  burger();
  search();

  //Open Navigation DropDown Menu
  if( $(window).width() > 1024 ) {
    $('.dropdown').on('mouseover', function (){
      var dropdown = $(this).find('ul');
      $(this).addClass('open');
      dropdown.show();
    });
    $('.dropdown').on('mouseleave', function (){
      var dropdown = $(this).find('ul');
      dropdown.hide();
      $(this).removeClass('open');
    });
    // $('.footer .dropdown').click(function(e){
    //   e.preventDefault();
    //   var dropdown = $(this).find('ul');
    //   $(this).addClass('open');
    //   dropdown.show();
    //   return false;
    // });
    $('.footer .dropdown > ul li a').click(function(e){
      e.preventDefault();
      var href = $(this).attr('href');
      window.location.href = document.location.origin+"/"+href;
      return false;
    });
  } else {
    $('.dropdown').click(function(e){
      e.preventDefault();
      var dropdown = $(this).find('ul');
      dropdown.slideUp();
      if( dropdown.css('display') == 'none' ) {
        $(this).removeClass('open');
        dropdown.slideDown();
      } else {
        $(this).addClass('open');
        dropdown.slideUp();
      }
    });
    $('.dropdown > ul li a').click(function(e){
      e.preventDefault();
      var href = $(this).attr('href');
      window.location.href = document.location.origin+"/"+href;
      return false;
    });
  }

  //Add Button Preload Animation
  $('.js-btnAnim').on('click', function(){
    $(this).addClass('preload');
  });

  //Contacts FancyBox PopUp
  $('.js-popup').click(function(e) {
    e.preventDefault();
    $.fancybox.open({src:"#call-popup"});
  });
});


//Event.target Search/DropDown
$(document).click(function(e) {
  
  //search
  if ($(e.target).closest('.search-field').length) {
    return;
  }
  $('.js-search').show();
  $('.header__search, .header__search-form').removeClass('active');
  
  //footer dropdown
  if ( $(e.target).closest('.dropdown').length ) {
    return;
  }
  $('.footer .dropdown').removeClass('open');
  $('.footer .nav-list__item > ul').hide();
  
  //dropdown mobile
  if( $(window).width() < 1024 ) {
    if ( $(e.target).closest('.dropdown').length ) {
      return;
    }
    $('.nav-list__item > ul').slideUp('fast');
    $('.dropdown').removeClass('open');
  };
  e.stopPropagation();
});


$(window).load(function(){

});

$(window).resize(function(){

});