var gProjs = [{
  "id": "ExPacman",
  "name": "Pacman",
  "title": "Eat the food and avoid your enemies",
  "desc": "later",
  "url": "projs/ExPacman/index.html",
  "publishedAt": 1448693940000,
  "labels": ["Matrixes", "keyboard events"]
}, 
{
  "id": "ExMinesweeper",
  "name": "Minesweeper",
  "title": "Walk on the field and avoid getting bombed",
  "desc": "later",
  "url": "projs/ExMinesweeper/index.html",
  "publishedAt": 1448693940000,
  "labels": ["Matrixes", "keyboard events"]
},
{
  "id": "ExInPicture",
  "name": "In Picture",
  "title": "What's in the picture? choose wisely",
  "desc": "later",
  "url": "projs/ExInPicture/index.html",
  "publishedAt": 1448693940000,
  "labels": ["Matrixes", "keyboard events"]
}];

(function initPages() {
  var html = `<div class="row">`;

  gProjs.forEach(project => {
    html +=
      `<div class="col-md-4 col-sm-6 portfolio-item">
      <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
        <div class="portfolio-hover">
          <div class="portfolio-hover-content">
            <i class="fa fa-plus fa-3x"></i>
          </div>
        </div>
        <img class="img-fluid" src="img/portfolio/${project.id}.jpg" alt="No image to show :(">
      </a>
      <div class="portfolio-caption">
        <h4>${project.name}</h4>
        <p class="text-muted">${project.title}</p>
        <a href="${project.url}">To the project</a>
      </div>
    </div>`;
  });

  $(".projects-container").html(html);
})();

(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse the navbar when page is scrolled
  $(window).scroll(function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });

})(jQuery); // End of use strict