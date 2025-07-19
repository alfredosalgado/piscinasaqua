// ===== GALERÍA JAVASCRIPT - FUNCIONALIDADES ESPECÍFICAS =====

document.addEventListener('DOMContentLoaded', function() {
    initGalleryFilter();
    initProjectModal();
    initProjectData();
});

// Datos de los proyectos (en una aplicación real, esto vendría de una API)
const projectsData = {
    cerrillos3: {
        title: 'Proyecto Cerrillos III',
        category: 'Piscina de Hormigón',
        description: 'Piscina de hormigón residencial construida con técnicas avanzadas y acabados de calidad',
        images: [
            'assets/img/galeria/Proyecto Cerrillos III/1.jpg',
            'assets/img/galeria/Proyecto Cerrillos III/2.jpg',
            'assets/img/galeria/Proyecto Cerrillos III/3.jpg',
            'assets/img/galeria/Proyecto Cerrillos III/4.jpg'
        ],
        specs: {
            'Ubicación': 'Cerrillos, Santiago',
            'Tipo': 'Piscina de Hormigón',
            'Método de construcción': 'Hand Pack',
            'Equipos': 'Sistema de filtración completo',
            'Estado': 'Completado'
        }
    },
    colina: {
        title: 'Proyecto Colina',
        category: 'Piscina de Hormigón',
        description: 'Piscina de hormigón con equipamiento completo y sistema de filtración avanzado',
        images: [
            'assets/img/galeria/Proyecto Colina/1.jpg',
            'assets/img/galeria/Proyecto Colina/2.jpg',
            'assets/img/galeria/Proyecto Colina/3.jpg',
            'assets/img/galeria/Proyecto Colina/4.jpg',
            'assets/img/galeria/Proyecto Colina/5.jpg'
        ],
        specs: {
            'Ubicación': 'Colina, Santiago',
            'Tipo': 'Piscina de Hormigón',
            'Método de construcción': 'Encofrado',
            'Equipos': 'Filtro, bomba, iluminación LED',
            'Estado': 'Completado'
        }
    },
    donihue: {
        title: 'Proyecto Doñihue',
        category: 'Piscina de Hormigón',
        description: 'Construcción de piscina familiar con diseño funcional y acabados de calidad',
        images: [
            'assets/img/galeria/Proyecto Doñihue/1.jpg',
            'assets/img/galeria/Proyecto Doñihue/2.jpg',
            'assets/img/galeria/Proyecto Doñihue/3.jpg',
            'assets/img/galeria/Proyecto Doñihue/4.jpg'
        ],
        specs: {
            'Ubicación': 'Doñihue, Región de O\'Higgins',
            'Tipo': 'Piscina de Hormigón',
            'Método de construcción': 'Hand Pack',
            'Equipos': 'Sistema básico de filtración',
            'Estado': 'Completado'
        }
    },
    maipu: {
        title: 'Proyecto Maipu',
        category: 'Piscina de Hormigón',
        description: 'Piscina de hormigón residencial con acabados de calidad',
        images: [
            'assets/img/galeria/Proyecto Maipu/1.jpg',
            'assets/img/galeria/Proyecto Maipu/2.jpg',
            'assets/img/galeria/Proyecto Maipu/3.jpg',
            'assets/img/galeria/Proyecto Maipu/4.jpg'
        ],
        specs: {
            'Ubicación': 'Maipu, Santiago',
            'Tipo': 'Piscina de Hormigón',
            'Método de construcción': 'Hand Pack',
            'Equipos': 'Sistema de filtración completo',
            'Estado': 'Completado'
        }
    },
    puentealto1: {
        title: 'Proyecto Puente Alto I',
        category: 'Piscina de Hormigón',
        description: 'Piscina residencial de hormigón con diseño moderno y funcional',
        images: [
            'assets/img/galeria/Proyecto Puente Alto I/1.jpg',
            'assets/img/galeria/Proyecto Puente Alto I/2.jpg',
            'assets/img/galeria/Proyecto Puente Alto I/3.jpg',
            'assets/img/galeria/Proyecto Puente Alto I/4.jpg'
        ],
        specs: {
            'Ubicación': 'Puente Alto, Santiago',
            'Tipo': 'Piscina de Hormigón',
            'Método de construcción': 'Hand Pack',
            'Equipos': 'Filtro de arena, bomba autocebante',
            'Estado': 'Completado'
        }
    },
    quintanormal: {
        title: 'Proyecto Quinta Normal',
        category: 'Piscina de Hormigón',
        description: 'Piscina de hormigón con acabados de calidad y sistema completo',
        images: [
            'assets/img/galeria/Proyecto Quinta Normal/1.jpg',
            'assets/img/galeria/Proyecto Quinta Normal/2.jpg',
            'assets/img/galeria/Proyecto Quinta Normal/3.jpg',
            'assets/img/galeria/Proyecto Quinta Normal/4.jpg'
        ],
        specs: {
            'Ubicación': 'Quinta Normal, Santiago',
            'Tipo': 'Piscina de Hormigón',
            'Método de construcción': 'Encofrado',
            'Equipos': 'Sistema completo de filtración',
            'Estado': 'Completado'
        }
    },
    requinoa: {
        title: 'Proyecto Requinoa',
        category: 'Piscina de Hormigón',
        description: 'Construcción completa de piscina con todos los equipos y acabados',
        images: [
            'assets/img/galeria/Proyecto Requinoa/1.jpg',
            'assets/img/galeria/Proyecto Requinoa/2.jpg',
            'assets/img/galeria/Proyecto Requinoa/3.jpg',
            'assets/img/galeria/Proyecto Requinoa/4.jpg'
        ],
        specs: {
            'Ubicación': 'Requinoa, Región de O\'Higgins',
            'Tipo': 'Piscina de Hormigón',
            'Método de construcción': 'Encofrado',
            'Equipos': 'Sistema completo de filtración y limpieza',
            'Estado': 'Completado'
        }
    },
    tiltil: {
        title: 'Proyecto TilTil',
        category: 'Piscina de Hormigón',
        description: 'Piscina de hormigón con instalación completa de equipos y sistemas',
        images: [
            'assets/img/galeria/Proyecto TilTil/1.jpg',
            'assets/img/galeria/Proyecto TilTil/2.jpg',
            'assets/img/galeria/Proyecto TilTil/3.jpg',
            'assets/img/galeria/Proyecto TilTil/4.jpg'
        ],
        specs: {
            'Ubicación': 'Til Til, Región Metropolitana',
            'Tipo': 'Piscina de Hormigón',
            'Método de construcción': 'Hand Pack',
            'Equipos': 'Filtro, bomba, iluminación, tablero eléctrico',
            'Estado': 'Completado'
        }
    },
    vitacura: {
        title: 'Proyecto Vitacura',
        category: 'Piscina de Hormigón',
        description: 'Piscina de hormigón con acabados premium y equipamiento de alta gama',
        images: [
            'assets/img/galeria/Proyecto Vitacura/1.jpg',
            'assets/img/galeria/Proyecto Vitacura/2.jpg',
            'assets/img/galeria/Proyecto Vitacura/3.jpg',
            'assets/img/galeria/Proyecto Vitacura/4.jpg'
        ],
        specs: {
            'Ubicación': 'Vitacura, Santiago',
            'Tipo': 'Piscina de Hormigón',
            'Método de construcción': 'Hand Pack',
            'Equipos': 'Sistema de filtración de alta gama',
            'Estado': 'Completado'
        }
    }
};

let currentProjectIndex = 0;
const projectKeys = Object.keys(projectsData);

// ===== FILTRO DE GALERÍA =====
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Mostrar todos los proyectos al cargar la página
    showAllProjects();

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filtrar proyectos
            filterProjects(filter);
        });
    });

    function showAllProjects() {
        projectCards.forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }

    function filterProjects(filter) {
        projectCards.forEach(card => {
            const category = card.dataset.category;
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
}

// ===== MODAL DE PROYECTO =====
function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const viewProjectButtons = document.querySelectorAll('.view-project');
    const prevButton = document.getElementById('prevProject');
    const nextButton = document.getElementById('nextProject');

    // Abrir modal
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectId = this.dataset.project;
            openModal(projectId);
        });
    });

    // Cerrar modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Navegación entre proyectos
    prevButton.addEventListener('click', showPreviousProject);
    nextButton.addEventListener('click', showNextProject);

    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Navegación con flechas
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                showPreviousProject();
            } else if (e.key === 'ArrowRight') {
                showNextProject();
            }
        }
    });

    function openModal(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        currentProjectIndex = projectKeys.indexOf(projectId);
        
        // Actualizar contenido del modal
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalCategory').textContent = project.category;
        
        // Cargar imagen principal
        const mainImage = document.getElementById('mainImage');
        mainImage.src = project.images[0];
        mainImage.alt = project.title;
        
        // Cargar thumbnails
        loadThumbnails(project.images, project.title);
        
        // Cargar especificaciones
        loadProjectSpecs(project.specs);
        
        // Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPreviousProject() {
        currentProjectIndex = (currentProjectIndex - 1 + projectKeys.length) % projectKeys.length;
        const projectId = projectKeys[currentProjectIndex];
        openModal(projectId);
    }

    function showNextProject() {
        currentProjectIndex = (currentProjectIndex + 1) % projectKeys.length;
        const projectId = projectKeys[currentProjectIndex];
        openModal(projectId);
    }

    function loadThumbnails(images, title) {
        const thumbnailGallery = document.getElementById('thumbnailGallery');
        thumbnailGallery.innerHTML = '';

        images.forEach((imageSrc, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            if (index === 0) thumbnail.classList.add('active');

            thumbnail.innerHTML = `
                <img src="${imageSrc}" alt="${title} - Imagen ${index + 1}" class="thumbnail-img">
            `;

            thumbnail.addEventListener('click', function() {
                // Actualizar imagen principal
                const mainImage = document.getElementById('mainImage');
                mainImage.src = imageSrc;
                
                // Actualizar thumbnail activo
                thumbnailGallery.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });

            thumbnailGallery.appendChild(thumbnail);
        });
    }

    function loadProjectSpecs(specs) {
        const projectSpecs = document.getElementById('projectSpecs');
        projectSpecs.innerHTML = '';

        Object.entries(specs).forEach(([key, value]) => {
            const specItem = document.createElement('div');
            specItem.className = 'spec-item';
            specItem.innerHTML = `
                <span class="spec-label">${key}:</span>
                <span class="spec-value">${value}</span>
            `;
            projectSpecs.appendChild(specItem);
        });
    }
}

// ===== INICIALIZAR DATOS DE PROYECTO =====
function initProjectData() {
    // En una aplicación real, aquí cargarías los datos desde una API
    // Por ahora, los datos están hardcodeados en projectsData
    
    // Verificar si las imágenes existen y mostrar placeholders si no
    Object.keys(projectsData).forEach(projectId => {
        const project = projectsData[projectId];
        project.images.forEach((imageSrc, index) => {
            const img = new Image();
            img.onerror = function() {
                // Si la imagen no existe, usar placeholder
                project.images[index] = `https://via.placeholder.com/800x600/0077be/ffffff?text=${encodeURIComponent(project.title)}`;
            };
            img.src = imageSrc;
        });
    });
}

// ===== LAZY LOADING PARA IMÁGENES DE GALERÍA =====
function initGalleryLazyLoading() {
    const images = document.querySelectorAll('.project-img');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

// ===== ESTILOS DINÁMICOS PARA GALERÍA =====
const galleryStyles = `
    .project-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }

    .project-modal.active {
        opacity: 1;
        visibility: visible;
    }

    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    }

    .modal-content {
        position: relative;
        background: white;
        border-radius: 12px;
        max-width: 90vw;
        max-height: 90vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }

    .project-modal.active .modal-content {
        transform: scale(1);
    }

    .modal-close {
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #666;
        z-index: 1;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
    }

    .modal-close:hover {
        background: rgba(0, 0, 0, 0.1);
        color: #333;
    }

    .modal-header {
        padding: 2rem 2rem 1rem;
        border-bottom: 1px solid #eee;
    }

    .modal-title {
        margin: 0 0 0.5rem;
        color: #0077be;
    }

    .modal-category {
        background: #0077be;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
    }

    .modal-body {
        padding: 2rem;
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
    }

    .modal-gallery {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .main-image {
        border-radius: 8px;
        overflow: hidden;
    }

    .modal-main-img {
        width: 100%;
        height: 400px;
        object-fit: cover;
    }

    .thumbnail-gallery {
        display: flex;
        gap: 0.5rem;
        overflow-x: auto;
        padding: 0.5rem 0;
    }

    .thumbnail {
        flex-shrink: 0;
        width: 80px;
        height: 60px;
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
        border: 2px solid transparent;
        transition: border-color 0.3s ease;
    }

    .thumbnail.active {
        border-color: #0077be;
    }

    .thumbnail-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .modal-info h3 {
        margin-bottom: 1rem;
        color: #333;
    }

    .spec-item {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 0;
        border-bottom: 1px solid #f0f0f0;
    }

    .spec-item:last-child {
        border-bottom: none;
    }

    .spec-label {
        font-weight: 600;
        color: #666;
    }

    .spec-value {
        color: #333;
        text-align: right;
    }

    .modal-footer {
        padding: 1rem 2rem 2rem;
        display: flex;
        justify-content: space-between;
        gap: 1rem;
    }

    .filter-btn {
        background: #f8f9fa;
        border: 2px solid transparent;
        color: #0077be;
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .filter-btn:hover,
    .filter-btn.active {
        background: #0077be;
        color: white;
        border-color: #0077be;
    }

    .project-card {
        transition: all 0.3s ease;
    }

    .project-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 119, 190, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .project-card:hover .project-overlay {
        opacity: 1;
    }

    .project-info {
        text-align: center;
        color: white;
        padding: 2rem;
    }

    .project-info h3 {
        margin-bottom: 0.5rem;
        color: white;
    }

    .project-info p {
        margin-bottom: 1.5rem;
        opacity: 0.9;
    }

    @media (max-width: 768px) {
        .modal-content {
            max-width: 95vw;
            max-height: 95vh;
        }

        .modal-body {
            grid-template-columns: 1fr;
            padding: 1rem;
        }

        .modal-header {
            padding: 1.5rem 1rem 1rem;
        }

        .modal-footer {
            padding: 1rem;
            flex-direction: column;
        }

        .modal-main-img {
            height: 250px;
        }
    }
`;

// Agregar estilos específicos de galería
const galleryStyleSheet = document.createElement('style');
galleryStyleSheet.textContent = galleryStyles;
document.head.appendChild(galleryStyleSheet);

// Inicializar lazy loading cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initGalleryLazyLoading();
});