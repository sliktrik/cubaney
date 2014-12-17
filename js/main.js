var menuOpen = false;

$(document).ready(function(){
    
   $window = $(window);
    
    scrollNav();
    
    var h = $("html").css("height");
    h.replace("px","");
    
    if($.cookie('userAccepted')){
        $(".age-gate").hide();
    }
    else{
        $(".age-gate").css("height", h);
        $(".age-gate").show();
        
        $(".button-agree").click(function(){
            $.cookie('userAccepted', true);
            $(".age-gate").hide();
            window.scrollTo(0,0);
        });

        $(".button-disagree").click(function(){
            window.location = "http://google.com";
        });
    }
    
    $(".button-products-nav").click(function() {
        $('html,body').animate({
            scrollTop: $(".product-section").offset().top - 75},
            'slow');
    });
    
    $(".button-products-nav-m").click(function() {
        $('html,body').animate({
            scrollTop: $(".product-section").offset().top},
            'slow');
    });
    
    $(".hamburger-menu-icon").click(function(){
        toggleMobileMenu();
    });
});

function scrollNav() {
  $('nav a').click(function(){  
    //Toggle Class
    $(".active").removeClass("active");      
    $(this).closest('li').addClass("active");
    var theClass = $(this).attr("class");
    $('.'+theClass).parent('li').addClass('active');
      
    var offset = 75;  
      
    if(window.innerWidth < 600){
        offset = 0;
        toggleMobileMenu();   
    }
      
    $('html, body').stop().animate({
        scrollTop: $( $(this).attr('href') ).offset().top - offset
    }, 400);
    return false;
  });
    
  $('.scrollTop a').scrollTop();
}

function scrollSmoke(){
    
    var xposraw = $(".smoke img").css('left');
    var xpos = xposraw.replace("px","");
    
    xpos = xpos - 1;
    
    console.log(xpos);
    
    $(".smoke img").css("left", xpos + "px");
}

function toggleMobileMenu(){
    
    if(menuOpen){
        $("nav").fadeOut(250,function(){
            menuOpen = false;
        });
        
    }else{
        $("nav").css('height',window.innerHeight+"px");
        $("nav").css('padding-top',(window.innerHeight/4)+"px");
        $("nav").fadeIn(500);
        menuOpen = true;
    }
}
