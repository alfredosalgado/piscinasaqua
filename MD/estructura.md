# Estructura de Archivos para el Proyecto "Piscinas Aqua"

A continuación se detalla la organización de los directorios y archivos para el desarrollo del sitio web.

/ (RAIZ)
├── index.html
├── quienes-somos.html
├── servicios.html
├── galeria.html
├── contacto.html
│
└── /assets
├── /css
│   ├── style.css         // Estilos globales para todo el sitio
│   ├── home.css          // Estilos específicos para index.html
│   ├── quienes-somos.css // Estilos específicos para quienes-somos.html
│   ├── servicios.css     // Estilos específicos para servicios.html
│   ├── galeria.css       // Estilos específicos para galeria.html
│   └── contacto.css      // Estilos específicos para contacto.html
│
├── /js
│   ├── main.js           // Scripts globales para todo el sitio
│   ├── home.js           // Scripts específicos para la página de inicio
│   ├── galeria.js        // Scripts para la funcionalidad de la galería
│   └── contacto.js       // Scripts para el formulario de contacto
│
├── /img
│   ├── logo.jpeg         // Logotipo principal de la empresa
│   │
│   └── /galeria
│       ├── /proyecto1
│       │   ├── imagen1.jpg
│       │   ├── imagen2.jpg
│       │   └── ...
│       │
│       ├── /proyecto2
│       │   ├── imagen1.jpg
│       │   ├── imagen2.jpg
│       │   └── ...
│       │
│       └── /proyecto3
│           ├── ...


### **Descripción de la Estructura**

* **RAIZ (`/`)**: Contiene todos los archivos HTML principales del sitio. Cada archivo corresponde a una sección de la página (Home, Quiénes Somos, etc.).
* **`./assets/css`**: Almacena todas las hojas de estilo.
    * `style.css`: Contendrá los estilos generales (variables de color, fuentes, estilos para el header, footer, etc.) que se aplicarán en todo el sitio.
    * Archivos CSS por sección: Cada página HTML tendrá su propio archivo CSS para estilos específicos, manteniendo el código más ordenado.
* **`./assets/js`**: Almacena todos los archivos JavaScript.
    * `main.js`: Para funcionalidades que se repiten en todo el sitio, como el menú de navegación móvil.
    * Archivos JS por sección: Para scripts que solo son necesarios en páginas específicas (por ejemplo, `galeria.js` para la lógica de la galería interactiva).
* **`./assets/img`**: Carpeta para todas las imágenes.
    * El logo y otras imágenes generales se guardan en la raíz de `img`.
    * **`./assets/img/galeria/`**: Contiene subcarpetas para cada proyecto. Cada subcarpeta (`proyecto1`, `proyecto2`, etc.) almacenará las imágenes correspondientes a ese proyecto específico.