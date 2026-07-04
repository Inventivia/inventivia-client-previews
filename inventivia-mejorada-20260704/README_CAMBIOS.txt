InventivIA - versión corregida responsive

Archivos principales:
- index.html
- servicios.html
- contacto.html

Cambios realizados:
- Menú de navegación modernizado y responsive con enlaces claros: Inicio, Servicios y Contacto.
- Panel móvil tipo hamburguesa con CTA "Hablemos".
- Ajustes mínimos de responsive para evitar textos cortados o fuera de contenedor en móvil.
- Corrección del hero de Servicios para que el titular no desborde ni quede oculto en móviles.
- Formulario de Contacto ajustado a una columna en pantallas pequeñas.
- No se han eliminado animaciones ni efectos de movimiento existentes.
- No se ha reconstruido el diseño general.

Verificación:
- Probado en 390px móvil, 768px tablet y escritorio mediante Chromium headless.

Actualización posterior:
- La home final usada como index.html es "InventivIA - Agencia SEO Murcia (standalone).html", porque es la versión con más movimiento indicada por Francisco.
- Se añadió un menú externo responsive Inicio / Servicios / Contacto sin alterar las animaciones internas de esa home standalone.

Mejora julio 2026 — movimiento moderno + SEO "agencia seo en murcia":
- Transiciones suaves entre páginas con View Transitions API (las 4 páginas).
- Reveals de sección con desenfoque progresivo (blur-in) al hacer scroll.
- Tilt 3D con brillo (glare) en las tarjetas de proyectos al pasar el ratón.
- Parallax de profundidad con el puntero en las piezas del hero.
- Barrido de brillo en los botones neumórficos al hover.
- Acordeón FAQ con apertura animada e icono "+" rotatorio (interpolate-size).
- Las bandas cinéticas se inclinan (skew) según la velocidad de scroll.
- Title de la home reordenado para atacar "agencia SEO en Murcia".
- FAQ ampliada de 3 a 6 preguntas con schema FAQPage (JSON-LD) sincronizado.
- Nuevos schemas: WebSite + WebPage en home, BreadcrumbList en subpáginas.
- areaServed ampliado (Molina de Segura, Alcantarilla, Cartagena, Región de Murcia).
- Párrafo de cobertura local con enlace interno a servicios.html.
- Favicon añadido en home, servicios y quiénes somos.
- Corregido 404 del logo en contacto.html (window.__resources para _ds_bundle).
- Se respeta prefers-reduced-motion en los efectos nuevos; sin librerías externas.
- Verificado con Chromium headless (1440px y 390px): sin errores de consola, JSON-LD válido.
