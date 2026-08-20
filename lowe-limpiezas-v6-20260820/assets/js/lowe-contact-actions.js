document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.lowe-whatsapp-float')) return;

    var button = document.createElement('a');
    button.className = 'lowe-whatsapp-float';
    button.href = 'https://wa.me/34648672359?text=Hola%2C%20quiero%20solicitar%20informacion%20sobre%20los%20servicios%20de%20Lowe%20Limpiezas.';
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
    button.setAttribute('aria-label', 'Contactar por WhatsApp con Lowe Limpiezas');
    button.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i><span>WhatsApp</span>';
    document.body.appendChild(button);
});
