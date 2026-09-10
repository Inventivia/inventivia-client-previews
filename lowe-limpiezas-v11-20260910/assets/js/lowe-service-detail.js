(function () {
    var base = 'assets/images/lowe/';
    var services = {
        limpieza: {
            title: 'Limpieza y mantenimiento', scope: 'Comunidades, empresas y viviendas', frequency: 'Periódica o puntual',
            lead: 'Planes de limpieza profesional para mantener cada espacio cuidado, saludable y siempre listo.',
            description: 'Organizamos personal, productos, horarios y supervisión según el uso real del inmueble. El plan puede cubrir zonas comunes, oficinas, locales, viviendas y edificios completos.',
            features: ['Estudio previo del espacio', 'Plan de trabajo y frecuencias', 'Equipo propio cualificado', 'Supervisión y seguimiento directo'],
            images: ['home/services/detalle_01.jpg', 'trabajos/trabajos-07.jpg', 'trabajos/trabajos-08.jpg']
        },
        extra: {
            title: 'Limpieza extra', scope: 'Cristales, suelos y grandes superficies', frequency: 'Servicio programado',
            lead: 'Intervenciones especializadas para superficies que necesitan maquinaria, técnica y atención específica.',
            description: 'Realizamos limpieza de superficies acristaladas, abrillantado y tratamiento de suelos, tapicerías y actuaciones especiales tras obras o necesidades puntuales.',
            features: ['Cristales y escaparates', 'Abrillantado y tratamiento de suelos', 'Limpieza de tapicerías', 'Limpiezas puntuales y de obra'],
            images: ['home/services/detalle_03.jpg', 'trabajos/trabajos-01.jpg', 'trabajos/trabajos-10.jpg']
        },
        plagas: {
            title: 'Control de plagas', scope: 'Empresas, comunidades y particulares', frequency: 'Intervención y seguimiento',
            lead: 'Soluciones planificadas de desinfección, desinsectación y desratización para proteger personas e instalaciones.',
            description: 'Evaluamos el origen del problema, definimos el tratamiento más adecuado y realizamos el seguimiento necesario con procesos seguros y personal preparado.',
            features: ['Inspección inicial', 'Desinfección', 'Desinsectación', 'Desratización y control posterior'],
            images: ['home/services/detalle_02.jpg', 'trabajos/detalles/plagas/03_detalle_02.jpg', 'trabajos/detalles/plagas/03_detalle_03.jpg']
        },
        mantenimiento: {
            title: 'Mantenimiento de zonas', scope: 'Comunidades, oficinas e instalaciones', frequency: 'Puntual o periódico',
            lead: 'Un único equipo para conservar instalaciones, zonas comunes y pequeños elementos del inmueble.',
            description: 'Coordinamos trabajos diversos de fontanería, electricidad, pintura y pequeñas reparaciones para reducir incidencias y simplificar la gestión diaria.',
            features: ['Pequeñas reparaciones', 'Pintura y repasos', 'Apoyo en fontanería y electricidad', 'Coordinación de incidencias'],
            images: ['home/projects/proyecto_10.jpg', 'trabajos/trabajos-01.jpg', 'home/projects/proyecto_11.jpg']
        },
        jardineria: {
            title: 'Jardinería y piscinas', scope: 'Exteriores de comunidades y particulares', frequency: 'Mantenimiento periódico',
            lead: 'Cuidado integral de jardines, zonas verdes y piscinas durante todo el año.',
            description: 'Adaptamos cada calendario de trabajo a la temporada, el tipo de vegetación, las instalaciones y el nivel de uso de la piscina.',
            features: ['Poda y mantenimiento de zonas verdes', 'Limpieza de exteriores', 'Puesta a punto de piscinas', 'Control periódico de instalaciones'],
            images: ['home/services/detalle_04.jpg', 'trabajos/detalles/jardineria/02_detalle_02.jpg', 'trabajos/detalles/piscinas/04_detalle_02.jpg']
        },
        conserjeria: {
            title: 'Conserjería y control de accesos', scope: 'Comunidades, edificios e instalaciones', frequency: 'Servicio continuado',
            lead: 'Atención presencial y control cotidiano para que cada edificio funcione con orden y cercanía.',
            description: 'El servicio se adapta a los horarios y protocolos de cada instalación e incluye comunicación directa ante incidencias y necesidades de usuarios.',
            features: ['Control de accesos', 'Atención a usuarios', 'Supervisión de zonas comunes', 'Comunicación y registro de incidencias'],
            images: ['trabajos/trabajos-09.jpg', 'home/services/detalle_05.jpg', 'contact/oficina-lowe.jpg']
        }
    };
    var key = new URLSearchParams(window.location.search).get('servicio') || 'limpieza';
    var service = services[key] || services.limpieza;
    document.title = service.title + ' | Lowe Limpiezas';
    document.querySelector('[data-service-hero-title]').textContent = service.title;
    document.querySelector('[data-service-title]').textContent = service.title;
    document.querySelector('[data-service-lead]').textContent = service.lead;
    document.querySelector('[data-service-description]').textContent = service.description;
    var mainImage = document.querySelector('[data-service-main-image]');
    mainImage.src = base + service.images[0];
    mainImage.alt = service.title + ' de Lowe Limpiezas';
    document.querySelector('[data-service-features]').innerHTML = service.features.map(function (item) { return '<li>' + item + '</li>'; }).join('');
    document.querySelector('[data-service-gallery]').innerHTML = service.images.slice(1).map(function (image, index) { return '<img src="' + base + image + '" alt="Detalle ' + (index + 1) + ' de ' + service.title + '">'; }).join('');
    document.querySelectorAll('[data-service-link]').forEach(function (link) {
        if (link.dataset.serviceLink === key) {
            link.classList.add('is-current');
            link.setAttribute('aria-current', 'page');
        }
    });
}());
