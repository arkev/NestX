# NestX — Adventist Innovation Network (Rama Vanilla)

Versión **100% pura y estándar (Vanilla)** de la plataforma web de **NestX**, desarrollada únicamente con **HTML5 semántico, CSS3 moderno y JavaScript ES6+**, sin frameworks pesados, dependencias externas ni procesos de compilación (build steps).

---

## Características Principales

- **Cero Dependencias:** No requiere Node.js, Next.js, React ni Tailwind para ejecutarse.
- **HTML5 Semántico y Accesible:** Estructura limpia con etiquetas estándar (`header`, `main`, `section`, `article`, `nav`, `footer`) y atributos ARIA para lectores de pantalla.
- **CSS3 Moderno y Modular (fuente única: `styles.css`):**
  - Sistema de diseño basado en variables y tokens de marca NestX (`#eb5553` Coral, `#372d5d` Índigo).
  - Layouts completamente responsivos utilizando CSS Grid y Flexbox.
  - Efectos visuales de papel rasgado (*RoughBand*) renderizados con trazados SVG vectoriales nativos.
  - Animaciones de revelado al hacer scroll (`.reveal`) respetando las preferencias de accesibilidad (`prefers-reduced-motion`).
  - Microinteracciones y transiciones fluidas de entrada en modales y componentes (`modalViewFadeIn`).
  - **Cero estilos en HTML:** ninguna página usa `<style>` ni `style=""`. Todo vive en `styles.css` (secciones 1–29, incluyendo §28 Design System Showcase y §29 reemplazos de demos inline).
- **JavaScript ES6+ Nativo:**
  - Barra de navegación pegajosa (*sticky header*) con desenfoque de fondo y borde dinámico según el scroll.
  - Menú móvil colapsable con soporte para tecla `Escape` y cierre automático al interactuar.
  - Animaciones de entrada activadas mediante la API nativa `IntersectionObserver`.
  - **Modal de Registro de Dos Pasos para Eventos:**
    - **Paso 1 (Vista de Detalles):** Indicador de pasos (*Stepper* interactivo), badge de categoría, título, descripción completa, cuadrícula de metadatos con iconos (Fecha & Hora, Ponente/Rol, Formato/Modalidad, Cupos/Acceso) y nota de constancia/certificado digital.
    - **Paso 2 (Vista de Formulario):** Navegación de retorno (*Back to event details*), pastilla resumen con el evento seleccionado, campos de registro validados (nombre, correo institucional, universidad, rol) y atajos de regreso.
    - **Paso 3 (Confirmación):** Pantalla de éxito con los datos confirmados del evento y correo de confirmación.
    - Gestión de foco por teclado, bloqueo de scroll en el `body` y cierre con tecla `Escape` o clic en el fondo.
  - Funcionalidad de copiado al portapapeles con feedback temporal en el botón para compartir eventos.
  - Formulario de suscripción al boletín con retroalimentación visual interactiva.
  - Modal secundario para postularse a la red (*Join the Network*).
  - **JS sin estilos inline:** toda visibilidad se gestiona con clases (`.is-hidden`, `.is-open`, `.is-visible`, `.is-active`, `.is-completed`, `.is-shown`); no se usa `element.style.display`.
- **Design System interactivo (`designSystem.html`, ~1460 líneas):** paleta con click-to-copy + toast, probador tipográfico en vivo, visualizador de espaciado, tokens de radio/sombra, tabla de tokens, matrices de estados de botones/inputs, sandbox del stepper de 2 pasos y escala de iconos. Su JS propio gestiona toast, toggles de código, stepper demo, pangram, filtro de secciones y resaltado de nav por `IntersectionObserver`.
- **Iconografía e Identidad Visual:** Iconos Google Material Symbols Rounded y gráficos SVG nativos para máxima velocidad de renderizado, consistencia y cero dependencias de bibliotecas pesadas.

---

## Estructura de Archivos

```plaintext
NestX/
├── index.html            # Landing page principal y modales interactivos (~1340 líneas, sin estilos inline)
├── faq.html              # Centro de Preguntas Frecuentes con acordeones <details> (~330 líneas)
├── privacy-policy.html   # Políticas de Privacidad y Tratamiento de Datos (~360 líneas)
├── designSystem.html     # Sistema de Diseño y Catálogo de Componentes UI (~1460 líneas, sin <style> ni style="")
├── styles.css            # Hoja de estilos única (~4100 líneas, §1–§29: tokens, layout, componentes, FAQ, policy y DS)
├── script.js             # Lógica interactiva en JavaScript vainilla (~440 líneas: header, drawer, reveal, modales, share, newsletter)
├── images/               # Recursos gráficos, mapas e identidades universitarias
│   ├── hero-globe.png
│   ├── network-map.png
│   ├── vision-collaboration.png
│   ├── favicon.svg
│   ├── NestX.svg
│   └── universidades/
│       ├── UM.png
│       ├── UNAC.webp
│       ├── UNADEBO.png
│       ├── UNADECA.png
│       ├── UNAV.png
│       └── UPEU.png
└── README.md             # Documentación del proyecto
```

## Arquitectura CSS y Convenciones

- **Fuente única:** todo el CSS vive en `styles.css`. Prohibido `<style>` y `style=""` en HTML.
- **Secciones numeradas:** §1 tokens, §2–§5 base/utilidades/tipografía/botones, §6–§7 reveal/rough-band, §8–§20 secciones del sitio, §21 modales, §23 iconos, §24 estados/visibilidad, §25–§27 join/policy/FAQ, §28 showcase DS, §29 reemplazos de demos inline.
- **Nomenclatura:** `ds-*` solo para el Design System (`ds-topbar`, `ds-swatch`, `ds-bg-primary`, `ds-bar-w-16`, `ds-radius-md`, `ds-shadow-md`, `ds-icon-24`); estados con `is-*`; utilidades globales (`.container`, `.text-center`, `.is-hidden`, `.btn:disabled`, `.modal-input:disabled`).
- **Demos con datos visuales:** cuando el valor *es* el dato (color del swatch, ancho de barra, radio, sombra, tamaño de icono) se usa una clase `ds-*`, nunca inline.
- **JS:** alternar visibilidad solo con `classList` (`is-hidden`, `is-open`, …). El `<body>` de `designSystem.html` lleva `class="ds-body"` para aplicar su fondo sin reglas `body` globales.

---

## Cómo Ejecutar el Proyecto Localmente

No necesitas instalar dependencias con `npm install` ni compilar nada. Puedes abrir el proyecto directamente:

### Opción 1: Abrir directamente en el navegador (macOS)
```bash
open index.html
```
*(o simplemente haz doble clic sobre el archivo `index.html`)*

### Opción 2: Servidor estático ligero con Python
```bash
python3 -m http.server 8080
```
Luego abre en tu navegador: [http://localhost:8080](http://localhost:8080)

### Opción 3: Servidor estático con npx
```bash
npx serve .
```

---

## Secciones y Páginas Incluidas

1. **Header & Navegación:** Identidad NestX y navegación fluida entre anclas y páginas secundarias.
2. **Hero Section:** Titular principal, propuesta de valor, accesos directos y globo terráqueo conectado.
3. **The Challenge:** Banda de contraste con bordes rasgados y planteamiento del problema.
4. **Why NestX:** Los 4 pilares: Conectar, Colaborar, Compartir y Crear Impacto.
5. **Who It's For:** Audiencias clave (Universidades, Docentes, Estudiantes, Industria).
6. **Impact Areas & How It Works:** 6 áreas de innovación y 4 fases secuenciales de colaboración.
7. **What Makes NestX Different:** Manifiesto y mapa mundial de nodos.
8. **Ecosystem:** 9 elementos de valor y recursos compartidos de la red.
9. **Vision:** Mensaje inspirador sobre el futuro de la educación colaborativa.
10. **Events & Workshops:** Taller destacado (*Design Thinking* con el Prof. Allen Zapién), eventos secundarios, **modal de dos pasos (Detalles completos $\rightarrow$ Formulario de registro $\rightarrow$ Confirmación)** y botón para compartir con copia al portapapeles.
11. **Call to Action & Newsletter:** Registro a la red y suscripción al boletín.
12. **Partner Universities:** Alianza global con las universidades adventistas asociadas.
13. **Footer:** Enlaces institucionales, redes sociales y navegación complementaria.
14. **Páginas Secundarias:**
    - [faq.html](faq.html): Preguntas frecuentes con acordeones interactivos y buscador/filtros.
    - [privacy-policy.html](privacy-policy.html): Aviso de privacidad y gobernanza de datos de la red.
    - [designSystem.html](designSystem.html): Sistema de diseño completo — Color, Typography, Spacing, Radius, Shadows, Tokens, Buttons, Badges, Forms, 2-Step Stepper, Cards, Callouts e Icon Scale — con demos interactivas (copiar token, type tester, stepper sandbox, filtro y toast).
