# NestX — Adventist Innovation Network (Rama Vanilla)

Versión **100% pura y estándar (Vanilla)** de la plataforma web de **NestX**, desarrollada únicamente con **HTML5 semántico, CSS3 moderno y JavaScript ES6+**, sin frameworks pesados, dependencias externas ni procesos de compilación (build steps).

---

## Características Principales

- **Cero Dependencias:** No requiere Node.js, Next.js, React ni Tailwind para ejecutarse.
- **HTML5 Semántico y Accesible:** Estructura limpia con etiquetas estándar (`header`, `main`, `section`, `article`, `nav`, `footer`) y atributos ARIA para lectores de pantalla.
- **CSS3 Moderno y Modular:**
  - Sistema de diseño basado en variables y tokens de marca NestX (`#eb5553` Coral, `#372d5d` Índigo).
  - Layouts completamente responsivos utilizando CSS Grid y Flexbox.
  - Efectos visuales de papel rasgado (*RoughBand*) renderizados con trazados SVG vectoriales nativos.
  - Animaciones de revelado al hacer scroll (`.reveal`) respetando las preferencias de accesibilidad (`prefers-reduced-motion`).
- **JavaScript ES6+ Nativo:**
  - Barra de navegación pegajosa (*sticky header*) con desenfoque de fondo y borde dinámico según el scroll.
  - Menú móvil colapsable con soporte para tecla `Escape` y cierre automático al interactuar.
  - Animaciones de entrada activadas mediante la API nativa `IntersectionObserver`.
  - Modal accesible de registro para workshops con validación y pantalla de confirmación.
  - Funcionalidad de copiado al portapapeles con feedback temporal en el botón para compartir eventos.
  - Formulario de suscripción al boletín con retroalimentación visual interactiva.
- **Iconografía SVG Inline:** Iconos limpios e integrados directamente en el código para máxima velocidad de renderizado y cero peticiones de red adicionales.

---

## Estructura de Archivos

```plaintext
nestxV0/
├── index.html       # Estructura y contenido de toda la plataforma
├── styles.css       # Hoja de estilos pura (tokens, layout, componentes)
├── script.js        # Lógica interactiva en JavaScript vainilla
├── images/          # Recursos gráficos y logotipos de universidades
│   ├── hero-globe.png
│   ├── network-map.png
│   ├── vision-collaboration.png
│   └── universidades/
│       ├── UM.png
│       ├── UNAC.webp
│       ├── UNADEBO.png
│       ├── UNADECA.png
│       ├── UNAV.png
│       └── UPEU.png
└── README.md        # Documentación de la rama Vanilla
```

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

## Secciones Incluidas

1. **Header & Navegación:** Identidad NestX y navegación fluida entre anclas.
2. **Hero Section:** Titular principal, propuesta de valor, accesos directos y globo terráqueo conectado.
3. **The Challenge:** Banda de contraste con bordes rasgados y planteamiento del problema.
4. **Why NestX:** Los 4 pilares: Conectar, Colaborar, Compartir y Crear Impacto.
5. **Who It's For:** Audiencias clave (Universidades, Docentes, Estudiantes, Industria).
6. **Impact Areas & How It Works:** 6 áreas de innovación y 4 fases secuenciales de colaboración.
7. **What Makes NestX Different:** Manifiesto y mapa mundial de nodos.
8. **Ecosystem:** 9 elementos de valor y recursos compartidos de la red.
9. **Vision:** Mensaje inspirador sobre el futuro de la educación colaborativa.
10. **Events & Workshops:** Taller destacado ("Design Thinking" con el Prof. Allen Zapién), eventos secundarios, modal de registro y botón para compartir.
11. **Call to Action & Newsletter:** Registro a la red y suscripción al boletín.
12. **Partner Universities:** Alianza global con las universidades adventistas asociadas.
13. **Footer:** Enlaces institucionales, redes sociales y créditos.
