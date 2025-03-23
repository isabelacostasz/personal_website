/* ===================================================================
 * TypeRite - Main JS
 *
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL   : ''   // mailchimp url
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* preloader
    * -------------------------------------------------- */
    var ssPreloader = function() {
        
        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            //force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');
        
        });
    };


   /* search
    * ------------------------------------------------------ */
    var ssSearch = function() {
            
        var searchWrap = $('.search-block'),
            searchField = searchWrap.find('.search-field'),
            closeSearch = searchWrap.find('.search-close'),
            searchTrigger = $('.search-trigger'),
            siteBody = $('body');


        searchTrigger.on('click', function(e) {
            
            e.preventDefault();
            e.stopPropagation();
        
            var $this = $(this);
        
            siteBody.addClass('search-is-visible');
            setTimeout(function(){
                searchWrap.find('.search-field').focus();
            }, 100);
        
        });

        closeSearch.on('click', function(e) {

            var $this = $(this);
        
            e.stopPropagation(); 
        
            if(siteBody.hasClass('search-is-visible')){
                siteBody.removeClass('search-is-visible');
                setTimeout(function(){
                    searchWrap.find('.search-field').blur();
                }, 100);
            }
        });

        searchWrap.on('click',  function(e) {
            if( !$(e.target).is('.search-field') ) {
                closeSearch.trigger('click');
            }
        });
            
        searchField.on('click', function(e){
            e.stopPropagation();
        });
            
        searchField.attr({placeholder: 'Palavra-chave', autocomplete: 'off'});

    };


   /* menu
    * ------------------------------------------------------ */
    var ssMenu = function() {

        var menuToggle = $('.header__menu-toggle'),
            siteBody = $('body');
    
        menuToggle.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            menuToggle.toggleClass('is-clicked');
            siteBody.toggleClass('nav-wrap-is-visible');
        });

        $('.header__nav .has-children').children('a').on('click', function (e) {
            
            e.preventDefault();

            $(this).toggleClass('sub-menu-is-open')
                .next('ul')
                .slideToggle(200)
                .end()
                .parent('.has-children')
                .siblings('.has-children')
                .children('a')
                .removeClass('sub-menu-is-open')
                .next('ul')
                .slideUp(200);

        });
    };


   /* masonry
    * ---------------------------------------------------- */ 
    var ssMasonryFolio = function () {
        
        var containerBricks = $('.masonry');

        containerBricks.masonry({
            itemSelector: '.masonry__brick',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            resize: true
        });

        // layout Masonry after each image loads
        containerBricks.imagesLoaded().progress( function() {
            containerBricks.masonry('layout');
        });

    };

   /* animate bricks
    * ------------------------------------------------------ */
    var ssBricksAnimate = function() {

        var animateEl = $('.animate-this');

        $WIN.on('load', function() {

            setTimeout(function() {
                animateEl.each(function(ctr) {
                    var el = $(this);
                    
                    setTimeout(function() {
                        el.addClass('animated');
                    }, ctr * 200);
                });
            }, 300);

        });

        $WIN.on('resize', function() {
            // remove animation classes
            animateEl.removeClass('animate-this animated');
        });

    };


   /* slick slider
    * ------------------------------------------------------ */
    var ssSlickSlider = function() {

        var $gallery = $('.slider__slides').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            pauseOnFocus: false,
            fade: true,
            cssEase: 'linear'
        });
        
        $('.slider__slide').on('click', function() {
            $gallery.slick('slickGoTo', parseInt($gallery.slick('slickCurrentSlide'))+1);
        });

    };


   /* smooth scrolling
    * ------------------------------------------------------ */
    var ssSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
            
                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


   /* alert boxes
    * ------------------------------------------------------ */
    var ssAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };


   /* Back to Top
    * ------------------------------------------------------ */
    var ssBackToTop = function() {
        
        var pxShow      = 500,
            goTopButton = $(".go-top")

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) goTopButton.addClass('link-is-visible');

        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                if(!goTopButton.hasClass('link-is-visible')) goTopButton.addClass('link-is-visible')
            } else {
                goTopButton.removeClass('link-is-visible')
            }
        });
    };


   /* Initialize
    * ------------------------------------------------------ */
    (function clInit() {

        ssPreloader();
        ssSearch();
        ssMenu();
        ssMasonryFolio();
        ssBricksAnimate();
        ssSlickSlider();
        ssSmoothScroll();
        ssAlertBoxes();
        ssBackToTop();

    })();

})(jQuery);

var currentLocation = document.URL;

if(currentLocation.includes('index.html?s=')) {
    search = currentLocation.split('?s=')[1].toLowerCase()
    if(search.includes('#')) search = search.split('#')[0];

    articles = document.getElementsByTagName('article');
    selected_articles = 0;
    
    for(i = 0; i < articles.length; i++) {
        tags = articles[i].getElementsByClassName('entry__meta-cat')[0].getElementsByTagName('a');
        titles = articles[i].getElementsByClassName('entry__title')[0].getElementsByTagName('a');
        descriptions = articles[i].getElementsByClassName('entry__excerpt')[0].getElementsByTagName('p');
        article_is_match = false;

        for(j = 0; j < tags.length; j++) if(tags[j].text.toLowerCase() == search) article_is_match = true;
        if(!article_is_match) for(j = 0; j < titles.length; j++) if(titles[j].text.toLowerCase().includes(search)) article_is_match = true;
        if(!article_is_match) for(j = 0; j < descriptions.length; j++) if(descriptions[j].innerHTML.toLowerCase().includes(search)) article_is_match = true;

        if(article_is_match) {
            articles[i].style.display = "block";
            selected_articles += 1;
        }
        else articles[i].style.display = "none";
    }

    if(selected_articles == 0) document.getElementById('no-content').style.display = "block";
    else document.getElementById('no-content').style.display = "none";
}

if(currentLocation.includes('index.html?t=')) {
    search = currentLocation.split('?t=')[1].toLowerCase()

    if(search != "todos") {
        categories_dict = {
            "ufmg": 0,
            "vlog": 1,
            "diversos": 2,
            "todos": 3,
        }

        document.getElementsByClassName('current')[0].classList.remove('current');
        document.getElementsByClassName('has-children')[0].getElementsByTagName('a')[0].style.color = 'white';
        document.getElementsByClassName('has-children')[0].getElementsByTagName('a')[0].classList.add('sub-menu-is-open');
        document.getElementsByClassName('has-children')[0].getElementsByTagName('ul')[0].style.display = 'block';

        for(i = 0; i < 4; i++) document.getElementsByClassName('category-filter')[categories_dict[search]].style.color = 'rgba(255, 255, 255, 0.6)';
        document.getElementsByClassName('category-filter')[categories_dict[search]].style.color = '#ffffff';

        articles = document.getElementsByTagName('article');
        selected_articles = 0;
        
        for(i = 0; i < articles.length; i++) {
            tags = articles[i].getElementsByClassName('entry__meta-cat')[0].getElementsByTagName('a');
            article_is_match = false;

            for(j = 0; j < tags.length; j++) if(tags[j].text.toLowerCase() == search) article_is_match = true;
        
            if(article_is_match) {
                articles[i].style.display = "block";
                selected_articles += 1;
            }
            else articles[i].style.display = "none";
        }

        if(selected_articles == 0) document.getElementById('no-content').style.display = "block";
        else document.getElementById('no-content').style.display = "none";
    }
}

function select_category(category) {
    last_index = currentLocation.lastIndexOf('/');
    new_url = currentLocation.slice(0, last_index) + '/index.html?t=' + category;
    new_url = new_url.replace('/posts', '');
    
    window.location = new_url;
}
