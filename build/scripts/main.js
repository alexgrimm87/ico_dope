'use strict';

/**
* Check scroll-bar width
* exemple ->   let scroll = $.scrollbarWidth();
*/
$.scrollbarWidth = function () {
    var a, b, c;if (c === undefined) {
        a = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b = a.children();c = b.innerWidth() - b.height(99).innerWidth();a.remove();
    }return c;
};

/**
* Scroll to the block
* @param {block} str - For what we click
* @param {targetBlock} str - to what we should scroll
*/
function scrollUp(block, targetBlock) {
    $(block).click(function (e) {
        var target = $(targetBlock).offset().top;

        $('body,html').stop().animate({ scrollTop: target }, 800);
        return false;

        e.preventDefault();
    });
}

/**
* Scroll animation
* @param {item} jquery obj - Wrapper for class 'animate-it';
*/
function animationBlock(item) {

    $(window).scroll(function () {
        checkForAnimate();
    });

    function checkForAnimate() {
        var bottomCheck = $(window).height() + $(window).scrollTop();
        var windowTop = $(window).scrollTop() + $(window).height() / 1.5;
        item.each(function () {
            if (windowTop > $(this).offset().top || bottomCheck > $('body').height() * 0.98) {

                var itemSect = $(this);
                var point = 0;
                itemSect.find('.animate-it').addClass('animated');

                var timer = setInterval(function () {
                    itemSect.find('.animate-delay').eq(point).addClass('animated');
                    point++;
                    if (itemSect.find('.animate-delay').length == point) {
                        clearInterval(timer);
                    }
                }, 200);
            }
        });
    }
    checkForAnimate();
}

/**
* GO TO href (smooth)
*/
function goTo() {
    $('.header-menu a').click(function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var target = $(href).offset().top - 65;
        $('body,html').animate({ scrollTop: target }, 500);
    });
}

/**
* Cut text script
* (Add to  div class "cut-text" width data-attr "data-cut"(length letters to show) )
*/
function cutText() {
    var filler = '...';
    var filler_length = filler.length;
    $('.cut-text').each(function () {
        var value = $(this).data('cut') - filler_length;
        var text = $.trim($(this).text());
        if (text.length > value && value > 0) {
            var newText = text.substring(0, value) + filler;
            $(this).text(newText);
        }
    });
};

/**
* Functional header butter
* @param {menuMobile} jquery obj - For what we click
* @param {toggleMenu} jquery obj - to what menu we will slideToggle
*/
function headeButer(menuMobile, toggleMenu) {
    if (menuMobile) {
        menuMobile.click(function (event) {
            if ($(window).width() < 1024 - $.scrollbarWidth()) {
                $(this).toggleClass('active');
                toggleMenu.stop().slideToggle();
            }
        });

        $(document).on('click touchstart', function (event) {
            if ($(window).width() < 1024 - $.scrollbarWidth()) {
                var div = toggleMenu;
                if (!div.is(event.target) && div.has(event.target).length === 0 && !menuMobile.is(event.target) && menuMobile.has(event.target).length === 0) {
                    toggleMenu.slideUp();
                    menuMobile.removeClass('active');
                }
            }
        });
    }
}

/**
* Expresion for numbers with spaces
* @param {x} number
* @return {string}
*/
function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

$(document).ready(function () {

    $('.footer_placeholder').height($('.footer').outerHeight());

    goTo();

    var w = $(window).width();
    if (w <= 1440 && w > 1024) {
        $('.article-item').each(function () {
            $(this).find('.article-item__text').attr('data-cut', '100');
        });
        cutText();
    } else if (w <= 1024 && w > 430) {
        $('.article-item').each(function () {
            $(this).find('.article-item__text').attr('data-cut', '90');
        });
        $('.main-news__list .article-item:first-child').find('.article-item__text').attr('data-cut', '400');
        cutText();
    } else if (w <= 430) {
        $('.main-news__list .article-item:first-child').find('.article-item__text').attr('data-cut', '150');
        cutText();
    } else {
        cutText();
    }
});

$(window).resize(function () {
    $('.footer_placeholder').height($('.footer').outerHeight());
});
'use strict';

function descHeight() {
    var desc_height = 0;
    var ttl_height = 0;
    $('.wrap-publications .publication').each(function () {
        var cur_desc = $(this).find('.publication__desc').outerHeight();
        var cur_ttl = $(this).find('.publication__title').outerHeight();
        if (cur_desc > desc_height) {
            desc_height = cur_desc;
        }

        if (cur_ttl > ttl_height) {
            ttl_height = cur_ttl;
        }
    });
    $('.wrap-publications .publication .publication__desc').css('height', desc_height);
    $('.wrap-publications .publication .publication__title').css('height', ttl_height);
}

function priseTabs() {
    $('.prise__col').click(function (e) {
        e.preventDefault();
        $(this).closest('ul').find('.prise__col').removeClass('active');
        $(this).addClass('active');

        var index = $(this).index();
        $(this).closest('.prise__wrap').find('.prise__content .prise__desk').removeClass('active');
        $(this).closest('.prise__wrap').find('.prise__content .prise__desk').eq(index).addClass('active');
    });
}

function initMap() {
    var mapOptions = {
        center: { "lat": mapCenterY, "lng": mapCenterX },
        zoom: 16,
        gestureHandling: 'auto',
        fullscreenControl: false,
        zoomControl: true,
        disableDoubleClickZoom: true,
        mapTypeControl: false,
        scaleControl: false,
        scrollwheel: false,
        streetViewControl: false
    };
    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);

    var layer = new google.maps.TransitLayer();
    layer.setMap(map);

    for (var i = 0; i < markersArray.length; i++) {
        var marker = new google.maps.Marker({
            icon: mapMarker,
            position: new google.maps.LatLng(markersArray[i].lat, markersArray[i].lng),
            map: map
        });
    }
}

// function seachResults(form, page) {
// 	var url = window.location.href;

// 	if (!page) {
// 		var page = 1;
// 	} else {
// 		var page = page;
// 	}

// 	var info = {};
//     info['_format'] = 'json';
//     info["_page"] = page;
//     info["_tags"] = [] ;

//     var i_tag = 0;
// 	$(form).find('.sorting__tag').each(function() {
//         var val = $(this).find('.tag').text();
//         info["_tags"][i_tag] = val;
//         i_tag++;
//     });

//     $(form).find('input').each(function() {
//         var name = $(this).attr('name');
//         var val = $(this).val();
//         info[name] = val;
//     });

//     $(form).find('select').each(function() {
//         var name = $(this).attr('name');
//         var val = $(this).val();
//         info[name] = val;
//     });

//     var searchAJAX = null;
//     if (searchAJAX !== null) {
//         searchAJAX.abort();
//     };

//     searchAJAX = $.ajax({
//         url: url,
//         data: info,
//         method: 'GET',
//         success: function(data) {
//         	$('.results span').text(data.amount + "Results");

//             if (data.content.length > 0) {
//             	$('.search__results').append(data.content);
//             } else {
//                $('.search__results').text("No results");
//             }
//         }
//     });
// }

$(document).ready(function () {
    if ($('.wrap-publications').length && $(window).outerWidth() > 767) {
        descHeight();
    }
    if ($('.contact__popup').length) {
        $('.contact__popup').addClass('active');
    }

    if ($('.prise').length) {
        priseTabs();
    }

    if ($('.map').length) {
        initMap();
    }

    $('.sort_by').styler();

    $('.advertising__video .video-button').on('click', function (e) {
        e.preventDefault();
        $(this).addClass('hide');
        $(this).closest('.advertising__video').find('.pic').addClass('hide');
        $("#video")[0].src += "&autoplay=1";
    });

    var settings = {
        entries: entries,
        width: 300,
        height: 215,
        radius: '85%',
        radiusMin: 50,
        bgDraw: true,
        bgColor: 'transparent',
        opacityOver: 1.00,
        opacityOut: 0.3,
        opacitySpeed: 6,
        fov: 800,
        speed: 1,
        fontFamily: 'DiavloLight',
        fontSize: '18',
        fontColor: '#000',
        fontWeight: '400', //bold
        fontStyle: 'normal', //italic 
        fontStretch: 'normal', //wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
        fontToUpperCase: true
    };

    //var svg3DTagCloud = new SVG3DTagCloud( document.getElementById( 'holder'  ), settings );
    if (entries.length) {
        $('#tag-cloud').svg3DTagCloud(settings);
    }

    // autocomplite
    if (availableTags.length) {
        $(".search-field input").autocomplete({
            source: availableTags
        });
    }

    // search results
    $('.sorting .jq-selectbox__dropdown li').click(function () {
        $('.sorting').submit();
    });

    // $('.sorting').on('submit', function(e) {
    // 	e.preventDefault();
    // 	seachResults('.sorting');
    // });

    $('.sorting input').on('change', function () {
        $('.sorting').submit();
    });

    $('.sorting .delete_tag').on('click', function () {
        $(this).closest('.sorting__tag').remove();
        $('.sorting').submit();
    });

    $('.sorting .tag').on('click', function () {
        $(this).closest('.sorting__tag').remove();
        $('.sorting').submit();
    });

    // $('.search__results .pagination__list a').click(function() {
    // 	var page = $(this).text();
    // 	seachResults('.sorting', page);
    // });
});

$(window).load(function () {});

$(window).resize(function () {});
'use strict';

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
function burger() {
  var menu = $('.header__content-wrap');
  $('.burger').on('click', function (e) {
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

  $(window).resize(function () {
    var menu = $('.header__content-wrap');
    var w = $(window).width();
    if (w > 1024) {
      menu.removeAttr('style');
      $('.burger').removeClass('open');
      $('.burger').removeClass('active');
    }
  });
};

//Search Input Show
function search() {
  $('.js-search').on('click', function (e) {
    e.preventDefault();
    $('.header__search').addClass('active');
    $('.js-search').siblings('.header__search-form').addClass('active');
    $('.js-header-search input').focus();
    $(this).hide();
    return false;
  });
};

$(document).ready(function () {

  headerScroll();
  burger();
  search();

  //Open Navigation DropDown Menu
  if ($(window).width() > 1024) {
    $('.dropdown').on('mouseover', function () {
      var dropdown = $(this).find('ul');
      $(this).addClass('open');
      dropdown.show();
    });
    $('.dropdown').on('mouseleave', function () {
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
    $('.footer .dropdown > ul li a').click(function (e) {
      e.preventDefault();
      var href = $(this).attr('href');
      window.location.href = document.location.origin + "/" + href;
      return false;
    });
  } else {
    $('.dropdown').click(function (e) {
      e.preventDefault();
      var dropdown = $(this).find('ul');
      dropdown.slideUp();
      if (dropdown.css('display') == 'none') {
        $(this).removeClass('open');
        dropdown.slideDown();
      } else {
        $(this).addClass('open');
        dropdown.slideUp();
      }
    });
    $('.dropdown > ul li a').click(function (e) {
      e.preventDefault();
      var href = $(this).attr('href');
      window.location.href = document.location.origin + "/" + href;
      return false;
    });
  }

  //Add Button Preload Animation
  $('.js-btnAnim').on('click', function () {
    $(this).addClass('preload');
  });

  //Contacts FancyBox PopUp
  $('.js-popup').click(function (e) {
    e.preventDefault();
    $.fancybox.open({ src: "#call-popup" });
  });
});

//Event.target Search/DropDown
$(document).click(function (e) {

  //search
  if ($(e.target).closest('.search-field').length) {
    return;
  }
  $('.js-search').show();
  $('.header__search, .header__search-form').removeClass('active');

  //footer dropdown
  if ($(e.target).closest('.dropdown').length) {
    return;
  }
  $('.footer .dropdown').removeClass('open');
  $('.footer .nav-list__item > ul').hide();

  //dropdown mobile
  if ($(window).width() < 1024) {
    if ($(e.target).closest('.dropdown').length) {
      return;
    }
    $('.nav-list__item > ul').slideUp('fast');
    $('.dropdown').removeClass('open');
  };
  e.stopPropagation();
});

$(window).load(function () {});

$(window).resize(function () {});