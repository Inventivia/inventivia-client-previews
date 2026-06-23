# InventivIA V2 — Guardrails del /loop

Regla principal de Francisco:

> El diseño NO se modifica. Menos aún las cosas en movimiento. La V2 debe verse igual que la versión actual.

## Permitido

- Corregir errores técnicos en HTML.
- Corregir SEO on-page sin cambiar diseño visual.
- Ajustar `<title>`, `meta description`, canonical, OG/Twitter, JSON-LD si faltan o están mal.
- Corregir enlaces rotos evidentes si apuntan a páginas existentes.
- Añadir atributos técnicos invisibles: `alt`, `aria-label`, `loading="lazy"`, `decoding="async"`, `rel`.
- Mantener `noindex` porque es preview en GitHub Pages.
- Añadir comentarios/reportes de TODO si falta información real.

## Prohibido

- No modificar `styles.css` salvo bug técnico crítico y documentado.
- No modificar animaciones, movimiento, typewriter, círculos, sellos, transforms ni scripts de interacción.
- No cambiar colores, tipografías, tamaños, espaciados, layout, orden de secciones ni composición visual.
- No rediseñar menús, hero, CTAs, tarjetas ni footers.
- No inventar datos de empresa, teléfono, reseñas, premios ni servicios.
- No tocar `/decyde/` ni `/inventivia/` original.

## Si un error de diseño requiere cambiar diseño

No se aplica automáticamente. Se reporta como `NECESITA DECISIÓN HUMANA`.

## Definición de hecho

- Todas las páginas responden 200 en `/inventivia-v2/`.
- No hay placeholders crudos ni scripts faltantes.
- SEO técnico correcto manteniendo noindex.
- Validación estática PASS.
- Capturas móvil/escritorio comparadas contra la versión base sin cambios visuales intencionados.
