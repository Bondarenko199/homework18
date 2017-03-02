$(function() {
    $('#owl-one').owlCarousel({
        items:1,
        loop:true,
        nav:true,
        dots:true,
        dotsEach:true,
        navClass:["custom-owl-prev", "custom-owl-next"],
        navText:[],
        smartSpeed: 1000
    });

    $('#owl-two').owlCarousel({
        items:8,
        loop:true,
        nav:true,
        dots:false,
        margin:40,
        navClass:["custom-owl-prev-small", "custom-owl-next-small"],
        navText:[],
        navContainer:'.owl-arrows',
        smartSpeed: 500,
        responsive : {
            0 : {
                items:2
            },
            768 : {
                items:4
            },
            992 : {
                items:6
            },
            1200 : {

            }

        }
    });

    $('.grid').masonry({
        columnWidth: 1,
        itemSelector: ".grid-item",
        fitWidth: true
    });
});