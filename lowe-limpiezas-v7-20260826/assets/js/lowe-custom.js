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
