/* El plugin twentytwenty (antes/despues) calcula el alto del slider justo al
   cargar la pagina, usando el ancho/alto ya renderizado de la 1a imagen. Si en
   ese instante la imagen todavia no ha terminado de cargar, el calculo sale a
   0 y el slider se queda invisible hasta que el usuario redimensiona la
   ventana. Forzamos un recalculo real cuando la imagen del slider termina de
   cargar (y de nuevo en window.load como red de seguridad). */
(function ($) {
  if (!$ || !$.fn || !$.fn.twentytwenty) return;

  function refreshTwentyTwenty() {
    $(window).trigger("resize.twentytwenty");
  }

  $(function () {
    var $sliderImg = $(".before-after-twentytwenty img").first();
    if ($sliderImg.length) {
      if ($sliderImg[0].complete) {
        refreshTwentyTwenty();
      } else {
        $sliderImg.on("load", refreshTwentyTwenty);
      }
    }
  });

  $(window).on("load", refreshTwentyTwenty);
})(window.jQuery);

(function () {
  document.querySelectorAll('.lowe-client-strip__list--logos').forEach(function (track) {
    if (track.dataset.marqueeReady === 'true') return;

    var viewport = document.createElement('div');
    viewport.className = 'lowe-client-strip__viewport';
    track.parentNode.insertBefore(viewport, track);
    viewport.appendChild(track);

    Array.from(track.children).forEach(function (item) {
      var clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    track.dataset.marqueeReady = 'true';
    track.classList.add('is-animated');
  });
})();

/* Duplica las reseñas de cada fila para mantener una cinta continua. Las
   copias se ocultan a lectores de pantalla para no repetir el contenido. */
(function () {
  document.querySelectorAll('.lowe-testimonials-marquee__track').forEach(function (track) {
    if (track.dataset.marqueeReady === 'true') return;

    Array.from(track.children).forEach(function (card) {
      var clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    track.dataset.marqueeReady = 'true';
    track.classList.add('is-animated');
  });
})();

/* Hace clicable la tarjeta completa de cada servicio sin sustituir los
   enlaces internos, y permite abrirla también desde teclado. */
(function () {
  document.querySelectorAll('.services-page .services-two__services-list > li').forEach(function (card) {
    var link = card.querySelector('.services-two__title a');
    if (!link) return;

    card.classList.add('lowe-service-card-link');
    card.tabIndex = 0;
    card.setAttribute('role', 'link');
    card.setAttribute('aria-label', link.textContent.trim());

    function openService() {
      window.location.href = link.href;
    }

    card.addEventListener('click', function (event) {
      if (!event.target.closest('a, button')) openService();
    });

    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openService();
      }
    });
  });
})();
