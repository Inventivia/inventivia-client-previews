document.addEventListener('DOMContentLoaded', function () {
    var whatsappUrl = 'https://wa.me/34648672359?text=Hola%2C%20quiero%20solicitar%20informacion%20sobre%20los%20servicios%20de%20Lowe%20Limpiezas.';

    document.querySelectorAll('.main-menu__btn-box').forEach(function (box) {
        if (box.querySelector('.lowe-whatsapp-header')) return;

        var headerButton = document.createElement('a');
        headerButton.className = 'lowe-whatsapp-header';
        headerButton.href = whatsappUrl;
        headerButton.target = '_blank';
        headerButton.rel = 'noopener noreferrer';
        headerButton.setAttribute('aria-label', 'Contactar con Lowe por WhatsApp');
        headerButton.setAttribute('title', 'WhatsApp');
        headerButton.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i>';
        box.insertBefore(headerButton, box.firstChild);
    });

    if (document.querySelector('.lowe-whatsapp-float')) return;

    var button = document.createElement('a');
    button.className = 'lowe-whatsapp-float';
    button.href = whatsappUrl;
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
    button.setAttribute('aria-label', 'Contactar por WhatsApp con Lowe Limpiezas');
    button.setAttribute('title', 'WhatsApp');
    button.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i>';
    document.body.appendChild(button);
});
