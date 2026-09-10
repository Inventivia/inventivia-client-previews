(function () {
    'use strict';

    var whatsappUrl = 'https://wa.me/34648672359?text=' + encodeURIComponent('Hola Lowe Limpiezas, quiero solicitar presupuesto');

    function footerMarkup() {
        return '<div class="site-footer__shape-bg float-bob-y" style="background-image:url(assets/images/shapes/site-footer-shpae-bg.png)"></div>' +
            '<div class="site-footer__shape-2 img-bounce"><img src="assets/images/shapes/site-footer-shape-2.png" alt=""></div>' +
            '<div class="container"><div class="site-footer__inner"><div class="site-footer__top"><div class="row">' +
            '<div class="col-xl-5 col-lg-5"><div class="site-footer__top-left"><div class="site-footer__logo-box"><div class="site-footer__logo"><a href="index.html" class="lowe-logo-image"><img src="assets/images/lowe/logo-white.png" alt="Lowe Limpiezas - Espacios que inspiran"></a></div><p class="site-footer__text-1">LOWE Limpieza y Servicios S.L. Empresa de limpieza integral en Murcia. Más de 12 años cuidando empresas, comunidades y hogares.</p></div><div class="site-footer__contact-info-box"><ul class="list-unstyled site-footer__contact-info"><li><div class="site-footer__contact-info-icon"><span class="icon-phone-call"></span></div><div class="site-footer__contact-info-content"><p><a href="tel:648672359">648 672 359</a></p></div></li><li><div class="site-footer__contact-info-icon"><span class="icon-mail"></span></div><div class="site-footer__contact-info-content"><p><a href="mailto:info@lowelimpiezas.com">info@lowelimpiezas.com</a></p></div></li></ul><ul class="list-unstyled site-footer__contact-info site-footer__contact-info--two"><li><div class="site-footer__contact-info-icon"><span class="icon-pin-1"></span></div><div class="site-footer__contact-info-content"><p>Ctra. de Churra, 58, 30007 Murcia</p></div></li><li><div class="site-footer__contact-info-icon"><span class="icon-support"></span></div><div class="site-footer__contact-info-content"><p>Lunes a viernes: 7:00-19:00</p></div></li></ul></div></div></div>' +
            '<div class="col-xl-7 col-lg-7"><div class="site-footer__top-right"><div class="site-footer__top-right-heading-box"><div class="site-footer__shape-1 float-bob-x"><img src="assets/images/shapes/site-footer-shape-1.png" alt=""></div><h3 class="site-footer__top-right-heading-title">Presupuesto gratuito&nbsp;<br>para tu espacio</h3><div class="site-footer__top-right-heading-img"><img src="assets/images/lowe/footer/equipo.png" alt="Equipo de Lowe Limpieza y Servicios"></div></div>' +
            '<div class="site-footer__widget-box"><div class="row"><div class="col-lg-4 col-md-6"><div class="footer-widget__quick-links"><h4 class="footer-widget__title">Navegación</h4><ul class="footer-widget__quick-links-list list-unstyled"><li><a href="index.html"><span class="icon-next"></span>Inicio</a></li><li><a href="servicios.html"><span class="icon-next"></span>Servicios</a></li><li><a href="nosotros.html"><span class="icon-next"></span>Nosotros</a></li><li><a href="promos.html"><span class="icon-next"></span>Promos</a></li><li><a href="trabajos.html"><span class="icon-next"></span>Trabajos</a></li><li><a href="contacto.html"><span class="icon-next"></span>Contacto</a></li><li><a href="faq.html"><span class="icon-next"></span>Preguntas frecuentes</a></li><li><a href="opiniones.html"><span class="icon-next"></span>Opiniones</a></li><li><a href="clientes.html"><span class="icon-next"></span>Clientes</a></li><li><a href="calidad-medio-ambiente.html"><span class="icon-next"></span>Calidad y medio ambiente</a></li></ul></div></div>' +
            '<div class="col-lg-8 col-md-6"><div class="footer-widget__services"><h4 class="footer-widget__title">Servicios</h4><ul class="footer-widget__quick-links-list list-unstyled"><li><a href="servicio-detalle.html?servicio=limpieza"><span class="icon-next"></span>Limpieza integral</a></li><li><a href="servicio-detalle.html?servicio=extra"><span class="icon-next"></span>Limpieza extra</a></li><li><a href="servicio-detalle.html?servicio=plagas"><span class="icon-next"></span>Control de plagas</a></li><li><a href="servicio-detalle.html?servicio=jardineria"><span class="icon-next"></span>Jardinería y piscinas</a></li></ul></div></div></div></div></div></div></div></div>' +
            '<div class="site-footer__bottom"><div class="row"><div class="col-xl-12"><div class="site-footer__bottom-text-box"><p class="site-footer__bottom-text">Copyright © 2026 LOWE Limpieza y Servicios S.L.</p></div></div></div></div></div></div>';
    }

    function normaliseFooter() {
        document.querySelectorAll('footer.site-footer').forEach(function (footer) {
            footer.classList.add('lowe-footer-v8', 'lowe-footer-v10');
            footer.innerHTML = footerMarkup();
        });
    }

    function addWhatsApp() {
        document.querySelectorAll('.main-menu__btn-box').forEach(function (box) {
            if (box.querySelector('.lowe-whatsapp-header')) return;
            var headerButton = document.createElement('a');
            headerButton.className = 'lowe-whatsapp-header';
            headerButton.href = whatsappUrl;
            headerButton.target = '_blank';
            headerButton.rel = 'noopener noreferrer';
            headerButton.setAttribute('aria-label', 'Contactar con Lowe por WhatsApp');
            headerButton.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i>';
            box.insertBefore(headerButton, box.firstChild);
        });
        if (!document.querySelector('.lowe-whatsapp-float')) {
            var floatingButton = document.createElement('a');
            floatingButton.className = 'lowe-whatsapp-float';
            floatingButton.href = whatsappUrl;
            floatingButton.target = '_blank';
            floatingButton.rel = 'noopener noreferrer';
            floatingButton.setAttribute('aria-label', 'Contactar por WhatsApp con Lowe Limpiezas');
            floatingButton.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i>';
            document.body.appendChild(floatingButton);
        }
    }

    function setSocialLinks() {
        var profiles = {
            Facebook: 'https://www.facebook.com/lowelimpiezasmurcia/',
            LinkedIn: 'https://es.linkedin.com/in/lowelimpiezas',
            Instagram: 'https://www.instagram.com/lowelimpiezas/'
        };
        var markup = '<h4 class="main-menu__top-social-title">Síguenos</h4><div class="main-menu__top-social"><a href="' + profiles.Facebook + '" aria-label="Facebook"><span class="icon-facebook-app-symbol"></span></a><a href="' + profiles.LinkedIn + '" aria-label="LinkedIn"><span class="icon-linkedin-big-logo"></span></a><a href="' + profiles.Instagram + '" aria-label="Instagram"><span class="icon-instagram"></span></a></div>';

        document.querySelectorAll('.main-menu__top-inner').forEach(function (inner) {
            var socialBox = inner.querySelector('.main-menu__top-social-box');
            if (!socialBox) {
                socialBox = document.createElement('div');
                socialBox.className = 'main-menu__top-social-box';
                inner.appendChild(socialBox);
            }
            socialBox.innerHTML = markup;
        });
        document.querySelectorAll('.main-menu__top-social a').forEach(function (link) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        });
    }

    function initClientMarquee() {
        document.querySelectorAll('.lowe-client-strip__list--logos').forEach(function (track) {
            if (track.dataset.marqueeReady) return;
            track.dataset.marqueeReady = 'true';
            Array.prototype.slice.call(track.children).forEach(function (item) {
                var clone = item.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                track.appendChild(clone);
            });
            track.classList.add('is-animated');
        });
    }

    function configureForms() {
        document.querySelectorAll('form.contact-form-validated').forEach(function (form) {
            if (window.jQuery) window.jQuery(form).off('submit');
            form.removeAttribute('novalidate');
            ['email', 'service'].forEach(function (name) {
                var field = form.elements[name];
                if (field) field.required = true;
            });
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                event.stopImmediatePropagation();
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
                var values = new FormData(form);
                var subject = 'Solicitud de presupuesto web - ' + (values.get('service') || 'Servicio Lowe');
                var body = [
                    'Nombre: ' + (values.get('name') || ''),
                    'Teléfono: ' + (values.get('phone') || ''),
                    'Email: ' + (values.get('email') || ''),
                    'Servicio: ' + (values.get('service') || ''),
                    '',
                    'Mensaje:',
                    values.get('message') || ''
                ].join('\n');
                var result = form.parentElement.querySelector('.result');
                if (result) result.textContent = 'Se abrirá tu aplicación de correo con la solicitud preparada.';
                window.location.href = 'mailto:info@lowelimpiezas.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
            }, true);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        normaliseFooter();
        addWhatsApp();
        setSocialLinks();
        initClientMarquee();
        configureForms();
    });
}());
