function descHeight() {
    var desc_height = 0;
    var ttl_height = 0;
    $('.wrap-publications .publication').each(function() {
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
    $('.prise__col').click(function(e) {
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
        center: {"lat":mapCenterY,"lng":mapCenterX},
        zoom: 16,
        gestureHandling: 'auto',
        fullscreenControl: false,
        zoomControl: true,
        disableDoubleClickZoom: true,
        mapTypeControl: false,
        scaleControl: false,
        scrollwheel: false,
        streetViewControl: false,
    }
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

$(document).ready(function() {
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

    $('.advertising__video .video-button').on('click', function(e) {
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
	    $( ".search-field input" ).autocomplete({
	      source: availableTags
	    });
	}

    // search results
    $('.sorting .jq-selectbox__dropdown li').click(function() {
    	$('.sorting').submit();
    });

    // $('.sorting').on('submit', function(e) {
    // 	e.preventDefault();
    // 	seachResults('.sorting');
    // });

    $('.sorting input').on('change', function() {
    	$('.sorting').submit();
    });

    $('.sorting .delete_tag').on('click', function() {
        $(this).closest('.sorting__tag').remove();
    	$('.sorting').submit();
    });

    $('.sorting .tag').on('click', function() {
        $(this).closest('.sorting__tag').remove();
        $('.sorting').submit();
    });

    // $('.search__results .pagination__list a').click(function() {
    // 	var page = $(this).text();
    // 	seachResults('.sorting', page);
    // });
});

$(window).load(function() {

});

$(window).resize(function() {

});