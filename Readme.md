# PROYECTO FINAL FRONTEND

## Descripción
 El proyecto consiste en la creación de un sitio web de e-commerce dinámico e interactivo, que consuma datos de una API REST para mostrar productos, y permita a los usuarios añadir productos a un carrito de compras.

---

## Tecnologías utilizadas
- **HTML5** con etiquetas semánticas (`header`, `nav`, `main`, `section`, `footer`).
- **CSS3** con diseño responsivo implementado usando Flexbox, Grid y media queries.
- **Google Fonts**: Fuente Open Sans.
- **Font Awesome** para íconos.
- **JavaScript** (ES6+):
  - Fetch API para obtener productos desde API REST.
  - Manipulación del DOM para renderizar productos y carrito.
  - Validación de formulario.
  - Persistencia del carrito con `localStorage`.
- **Formspree** para el manejo del formulario de contacto.
- **SEO y accesibilidad**:
  - Uso de etiquetas semánticas y `alt` en imágenes.
  - Navegación con teclado y metaetiquetas optimizadas.

---

## Instalación y ejecución
1. Clonar o descargar el repositorio.
2. Abrir el archivo `index.html` en un navegador moderno.
3. La página carga automáticamente los productos desde la API y permite interactuar con el carrito.
4. Para probar el formulario de contacto, completar los campos y enviar (se usa Formspree).

El proyecto está disponible online en:  
[https://marysolh.github.io/CursoFrontEnd2025CaC/](https://marysolh.github.io/CursoFrontEnd2025CaC/)

---

## Estructura del proyecto
```📁 proyectoFinalFrontEnd
├── 📄 index.html
├── 📄 script.js
├── 📁 data
│ └── 📄 productos.json
├── 📁 imagenes
│ └── 🖼️ imágenes varias
├── 📁 css
│ └── 📄 styles.css
└── 📄 README.md
```

## Funcionalidades principales

- **Renderizado dinámico de productos**  
  Los productos se obtienen mediante Fetch API y se muestran en tarjetas responsivas con imagen, nombre y precio.

- **Carrito de compras interactivo**  
  Permite añadir productos, modificar cantidades, eliminar productos y mostrar el total actualizado en tiempo real.

- **Persistencia del carrito**  
  El contenido del carrito se guarda en `localStorage` para mantener el estado incluso al recargar o cerrar la página.

- **Formulario de contacto**  
  Con campos validados para nombre, email y mensaje. El envío se realiza con Formspree.

- **Diseño responsivo y accesible**  
  Adaptación para distintos tamaños de pantalla usando Flexbox, Grid y media queries. Navegación optimizada para teclado y etiquetas accesibles.

- **SEO básico**  
  Metaetiquetas configuradas para optimizar el posicionamiento en buscadores.

---