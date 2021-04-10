var gProjs = [{
  "id": "ExPacman",
  "name": "Pacman",
  "title": "Eat the food and avoid your enemies",
  "desc": "This game is just like the original Pacman,<br>the only difference is that it doesn't quite look like it.",
  "url": "projs/ExPacman/index.html",
  "publishedAt": 1448693940000,
  "labels": ["Matrixes", "keyboard events"]
}, 
{
  "id": "ExMinesweeper",
  "name": "Minesweeper",
  "title": "Walk on the field and avoid getting bombed",
  "desc": "The beloved Minesweeper game,<br>just prettier + you cannot lose in the begginer difficulty level.",
  "url": "projs/ExMinesweeper/index.html",
  "publishedAt": 1448693940000,
  "labels": ["Matrixes", "keyboard events"]
},
{
  "id": "ExInPicture",
  "name": "In Picture",
  "title": "What's in the picture? choose wisely",
  "desc": "This game is simple.<br>You see a picture and choose the correct answer of what's in that picture.",
  "url": "projs/ExInPicture/index.html",
  "publishedAt": 1448693940000,
  "labels": ["Matrixes", "keyboard events"]
},
{
  "id": "ExBookShop",
  "name": "Book Shop",
  "title": "An admin page for managing a book shop",
  "desc": "Manage the books that you sell.",
  "url": "projs/ExBookShop/index.html",
  "publishedAt": 1448693940000,
  "labels": ["Matrixes", "keyboard events"]
}
];

(function initModals() {
  confirm
  var html = '';
  gProjs.forEach(project => {
    html += `<div class="portfolio-modal modal fade" id="portfolioModal${project.id}" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${project.name}</h2>
                <p class="item-intro text-muted">${project.title}</p>
                <img class="img-fluid d-block mx-auto" src="img/portfolio/${project.id}.jpg" alt="no picture">
                <p>${project.desc}</p>
                <ul class="list-inline">
                  <li>${new Date(project.publishedAt).toDateString()}</li>
                  <li>Category: Game</li>
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    Close Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    });

  $('.modal-container').html(html);
}) ();

(function initPages() {
  var html = `<div class="row">`;

  gProjs.forEach(project => {
    html +=
      `<div class="col-md-4 col-sm-6 portfolio-item">
      <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${project.id}">
        <div class="portfolio-hover">
          <div class="portfolio-hover-content">
            <i class="fa fa-plus fa-3x"></i>
          </div>
        </div>
        <img class="img-fluid game-pic" src="img/portfolio/${project.id}.jpg" alt="No image to show :(">
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