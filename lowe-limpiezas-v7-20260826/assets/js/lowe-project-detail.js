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
