
$(function(){
        $('.lang__click').click(function(){
            $(this).parent().toggleClass('active');
        });


            $(document).mouseup(function (e){ // событие клика по веб-документу
                var div = $(".lang_select_block"); // тут указываем ID элемента
                if (!div.is(e.target) // если клик был не по нашему блоку
                    && div.has(e.target).length === 0) { // и не по его дочерним элементам
                    div.removeClass('active'); // скрываем его
                }
            });

    $(document).scroll(function(){
        if($(this).scrollTop() > 0){
            $('.header_top_transparent').css('background','rgba(0, 0, 0, 1)');
        } else {
            $('.header_top_transparent').css('background','transparent');
        }
    });

    $('#mob-menu-btn').click(function(){
        $('#mob-menu').addClass('open');
        $('body').css('overflow','hidden');
    });
    $('.mob-menu-close').click(function(){
        $('#mob-menu').removeClass('open');
        $('body').css('overflow','auto');
    });



// =====================================================================================
    $('.clients_slider').slick({
        slidesToShow:4,
        speed:500,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    });
    $('#clients .arrow.left').click(function(event){
        $('.clients_slider').slick('slickPrev');
    });
    $('#clients .arrow.right').click(function(event){
        $('.clients_slider').slick('slickNext');
    });
// =====================================================================================
    $('.comment_slider').slick({
        slidesToShow:3,
        speed:800,
        centerMode:true,
        adaptiveHeight: true
    });
    $('#comment .arrow.left').click(function(event){
        $('.comment_slider').slick('slickPrev');
    });
    $('#comment .arrow.right').click(function(event){
        $('.comment_slider').slick('slickNext');
    });
// =====================================================================================
        $('.media_slider').slick({
            responsive: [
                {
                    breakpoint: 999999999,
                    settings: "unslick"
                },
                {
                    breakpoint: 1201,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 993,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        });
        $('#index_media .arrow.left').click(function(event){
            $('.media_slider').slick('slickPrev');
        });
        $('#index_media .arrow.right').click(function(event){
            $('.media_slider').slick('slickNext');
        });
// =====================================================================================
    $('.blog_slider').slick({
        lazyLoad: 'ondemand',
        slidesToShow:1,
        speed:800,
        adaptiveHeight: true
        // centerMode:true
    });
    $('.blog_slider_wrap .arrow.left').click(function(event){
        $('.blog_slider').slick('slickPrev');
    });
    $('.blog_slider_wrap .arrow.right').click(function(event){
        $('.blog_slider').slick('slickNext');
    });
// =====================================================================================
    $('.cases_slider').slick({
        slidesToShow: 1,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    adaptiveHeight: true
                }
            }
        ]
    });
    $('.cases_slider_wrap .arrow.left').click(function (event) {
        $('.cases_slider').slick('slickPrev');
    });
    $('.cases_slider_wrap .arrow.right').click(function (event) {
        $('.cases_slider').slick('slickNext');
    });

    const slidesAmount = $('.cases_slider .cases__item').length;
    const zeroLength = 2;
    const renderSlidesAmount = ('00' + slidesAmount).slice(-zeroLength);
    $('.counter__total').html(renderSlidesAmount);

    $('.cases_slider').on('beforeChange', function (event, slick, index, currentSlide, nextSlide) {
        currentSlide++;
        let renderCurrentSlide = ('00' + currentSlide).slice(-zeroLength);
        $('.counter__current').html(renderCurrentSlide);
    });
// =====================================================================================
    let screenWidth = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
    );
    if (screenWidth<=769) {
        $('.package__body').slick({
            slidesToShow:1,
            speed:500,
            adaptiveHeight: true
        });
        $('#service_package .arrow.left').click(function(event){
            $('.package__body').slick('slickPrev');
        });
        $('#service_package .arrow.right').click(function(event){
            $('.package__body').slick('slickNext');
        });
    }

// =====================================================================================
// =====================================================================================
    $('#faq .item__question').click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).parent().find('.item__answer').slideUp();
        } else {
            $(this).addClass('active');
            $(this).parent().find('.item__answer').slideDown();
        }
    });
// =====================================================================================

    $('.go-top').click(function(){
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });
    $('.scroll').click(function(){
        var block = $(this).attr('href');
        $('.mob-menu-close').click();
        $('body,html').animate({
            scrollTop: $(block).offset().top -60
        }, 400);
        return false;
    });
});
// =====================================================================================
$(function(){
    if(document.getElementById('map__content')){
        var place = {lat: 50.45905784292677, lng: 30.490232643648845};

        var map = new google.maps.Map(
            document.getElementById('map__content'),
            {
                zoom: 15,
                center: place
            });

        var marker = new google.maps.Marker({
            position: place,
            map: map,
            title: 'г.Киев, ул. Пимоненка, 13, FORUM Business City Business Center'
        });
    }
});
