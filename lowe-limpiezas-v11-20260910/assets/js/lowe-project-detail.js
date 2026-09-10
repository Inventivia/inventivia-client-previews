(function () {
  var projects = {
    cristales: {
      title: 'Limpieza de cristales y escaparates',
      category: 'Limpiezas especiales',
      client: 'Empresas y comercios',
      location: 'Región de Murcia',
      duration: 'Servicio programado',
      budget: 'Presupuesto personalizado',
      lead: 'Limpieza profesional de cristales para oficinas, comercios y fachadas, con una planificación adaptada a cada superficie.',
      objective: 'Recuperar la transparencia y la buena imagen de cada espacio, trabajando con seguridad y atención al detalle.',
      images: ['cristales/01_detalle_01.jpg', 'cristales/01_detalle_02.jpg', 'cristales/01_detalle_03.jpg']
    },
    jardineria: {
      title: 'Jardinería y mantenimiento exterior',
      category: 'Jardinería',
      client: 'Comunidades y empresas',
      location: 'Murcia',
      duration: 'Mantenimiento periódico',
      budget: 'Presupuesto personalizado',
      lead: 'Cuidado integral de jardines y zonas exteriores para que cada espacio se mantenga limpio, ordenado y agradable durante todo el año.',
      objective: 'Garantizar un mantenimiento continuado del entorno exterior con trabajos organizados y adaptados a cada instalación.',
      images: ['jardineria/02_detalle_01.jpg', 'jardineria/02_detalle_02.jpg', 'jardineria/02_detalle_03.jpg']
    },
    plagas: {
      title: 'Control de plagas y desinfección',
      category: 'Control de plagas',
      client: 'Empresas y comunidades',
      location: 'Región de Murcia',
      duration: 'Intervención a medida',
      budget: 'Presupuesto personalizado',
      lead: 'Actuaciones de desinfección y control de plagas orientadas a proteger los espacios de trabajo, viviendas y zonas comunes.',
      objective: 'Aplicar una solución eficaz y planificada, priorizando la seguridad, la higiene y el seguimiento posterior.',
      images: ['plagas/03_detalle_01.jpg', 'plagas/03_detalle_02.jpg', 'plagas/03_detalle_03.jpg']
    },
    piscinas: {
      title: 'Mantenimiento de piscinas',
      category: 'Mantenimiento exterior',
      client: 'Comunidades y particulares',
      location: 'Murcia',
      duration: 'Servicio de temporada',
      budget: 'Presupuesto personalizado',
      lead: 'Mantenimiento y puesta a punto de piscinas para mantener el agua, las instalaciones y el entorno en las mejores condiciones.',
      objective: 'Ofrecer un servicio periódico que facilite el uso seguro y el buen estado de la piscina durante toda la temporada.',
      images: ['piscinas/04_detalle_01.jpg', 'piscinas/04_detalle_02.jpg', 'piscinas/04_detalle_03.jpg']
    },
    empresas: {
      title: 'Limpieza profesional de empresas y locales',
      category: 'Limpieza profesional', client: 'Empresas y comercios', location: 'Murcia', duration: 'Plan periódico', budget: 'Presupuesto personalizado',
      lead: 'Limpieza planificada para oficinas, comercios y espacios de trabajo, con horarios compatibles con la actividad del cliente.',
      objective: 'Mantener una imagen cuidada y un entorno saludable mediante rutinas de trabajo supervisadas y adaptadas a cada instalación.',
      images: ['../trabajos-07.jpg', '../../home/projects/proyecto_1.jpg', '../../home/projects/proyecto_3.jpg']
    },
    comunidades: {
      title: 'Mantenimiento integral de comunidades',
      category: 'Comunidades', client: 'Comunidades de propietarios', location: 'Región de Murcia', duration: 'Servicio continuado', budget: 'Presupuesto personalizado',
      lead: 'Atención de portales, escaleras, accesos y zonas comunes con una frecuencia definida junto a la comunidad.',
      objective: 'Simplificar la gestión del edificio y conservar sus espacios comunes limpios, ordenados y bien atendidos.',
      images: ['../trabajos-06.jpg', '../../home/projects/proyecto_6.jpg', '../../home/projects/proyecto_9.jpg']
    },
    especiales: {
      title: 'Limpiezas especiales y tapicerías',
      category: 'Limpieza extra', client: 'Empresas y particulares', location: 'Murcia', duration: 'Actuación puntual', budget: 'Presupuesto personalizado',
      lead: 'Tratamientos específicos para tapicerías, superficies delicadas y espacios que necesitan una limpieza intensiva.',
      objective: 'Recuperar el aspecto y la higiene de cada superficie aplicando la técnica y los productos adecuados.',
      images: ['../../home/projects/proyecto_5.jpg', '../trabajos-01.jpg', '../trabajos-10.jpg']
    },
    oficinas: {
      title: 'Limpieza de oficinas y locales',
      category: 'Limpieza profesional', client: 'Oficinas y negocios', location: 'Murcia', duration: 'Plan a medida', budget: 'Presupuesto personalizado',
      lead: 'Servicio organizado en torno a los horarios, la ocupación y las necesidades de cada espacio profesional.',
      objective: 'Crear un entorno de trabajo limpio y cómodo, con puntos de control y seguimiento del servicio.',
      images: ['../trabajos-08.jpg', '../../home/projects/proyecto_2.jpg', '../../home/projects/proyecto_4.jpg']
    },
    conserjeria: {
      title: 'Conserjería y control de accesos',
      category: 'Conserjería', client: 'Comunidades y edificios', location: 'Murcia', duration: 'Servicio continuado', budget: 'Presupuesto personalizado',
      lead: 'Atención presencial, control de accesos y comunicación de incidencias para el funcionamiento cotidiano del edificio.',
      objective: 'Aportar orden, cercanía y capacidad de respuesta en los accesos y zonas comunes de la instalación.',
      images: ['../trabajos-09.jpg', '../../home/projects/proyecto_11.jpg', '../../home/projects/proyecto_12.jpg']
    },
    sofas: {
      title: 'Limpieza de sofás y tapicerías',
      category: 'Viviendas', client: 'Particulares y alojamientos', location: 'Murcia', duration: 'Servicio puntual', budget: 'Presupuesto personalizado',
      lead: 'Limpieza profunda de sofás y textiles para eliminar suciedad acumulada y recuperar su aspecto.',
      objective: 'Aplicar un tratamiento adecuado al tejido y dejar la tapicería limpia, fresca y lista para volver a utilizarse.',
      images: ['../trabajos-10.jpg', '../../home/projects/proyecto_5.jpg', '../../home/projects/proyecto_13.jpg']
    },
    planchado: {
      title: 'Planchado y apoyo doméstico',
      category: 'Limpiezas especiales', client: 'Particulares', location: 'Murcia', duration: 'Puntual o periódico', budget: 'Presupuesto personalizado',
      lead: 'Apoyo profesional para el cuidado de prendas y tareas domésticas concretas, adaptado a cada hogar.',
      objective: 'Ahorrar tiempo a la familia con un servicio organizado, cuidadoso y de confianza.',
      images: ['../trabajos-05.jpg', '../../home/projects/proyecto_7.jpg', '../../home/projects/proyecto_8.jpg']
    }
  };

  var key = new URLSearchParams(window.location.search).get('proyecto') || 'cristales';
  var project = projects[key] || projects.cristales;
  var base = 'assets/images/lowe/trabajos/detalles/';
  var fields = { client: 'Cliente', budget: 'Presupuesto', category: 'Categoría', location: 'Ubicación', duration: 'Duración' };

  document.title = project.title + ' | Lowe Limpiezas';
  document.querySelector('[data-project-title]').textContent = project.title;
  document.querySelector('[data-project-lead]').textContent = project.lead;
  document.querySelector('[data-project-objective]').textContent = project.objective;
  document.querySelector('[data-project-main-image]').src = base + project.images[0];
  document.querySelector('[data-project-main-image]').alt = project.title + ' por Lowe Limpiezas';
  document.querySelector('[data-project-gallery]').innerHTML = project.images.slice(1).map(function (image, index) {
    return '<img src="' + base + image + '" alt="Detalle ' + (index + 1) + ' de ' + project.title + '">';
  }).join('');
  document.querySelector('[data-project-info]').innerHTML = Object.keys(fields).map(function (field) {
    return '<div><dt>' + fields[field] + '</dt><dd>' + project[field] + '</dd></div>';
  }).join('');
})();
