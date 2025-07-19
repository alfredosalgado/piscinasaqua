// ===== GALERÍA JAVASCRIPT - FUNCIONALIDADES ESPECÍFICAS =====

document.addEventListener('DOMContentLoaded', function() {
    initGalleryFilter();
    initProjectModal();
    initProjectData();
});

// Datos de los proyectos (en una aplicación real, esto vendría de una API)
const projectsData = {
    proyecto1: {
        title: 'Piscina Residencial Las Condes',
        category: 'Piscina de Hormigón',
        description: 'Piscina de hormigón con revestimiento Diamond Brite y sistema de iluminación LED',
        images: [
            'assets/img/galeria/proyecto1/imagen1.jpg',
            'assets/img/galeria/proyecto1/imagen2.jpg',
            'assets/img/galeria/proyecto1/imagen3.jpg'
        ],
        specs: {
            'Dimensiones': '8m x 4m x 1.5m',
            'Tipo': 'Piscina de Hormigón',
            'Revestimiento': 'Diamond Brite Azul',
            'Equipos': 'Filtro de arena, Bomba 1HP, Iluminación LED',
            'Tiempo de construcción': '3 semanas',
            'Ubicación': 'Las Condes, Santiago'
        }
    },
    proyecto2: {
        title: 'Piscina Tipo Playa Vitacura',
        category: 'Piscina de Arena',
        description: 'Piscina de arena con acceso gradual tipo playa y sistema de climatización',
        images: [
            'assets/img/galeria/proyecto2/imagen1.jpg',
            'assets/img/galeria/proyecto2/imagen2.jpg',
            'assets/img/galeria/proyecto2/imagen3.jpg'
        ],
        specs: {
            'Dimensiones': '10m x 6m x 1.8m',
            'Tipo': 'Piscina de Arena',
            'Revestimiento': 'Arena de cuarzo con resina',
            'Equipos': 'Sistema de filtración, Bomba de calor, Limpiafondos automático',
            'Tiempo de construcción': '4 semanas',
            'Ubicación': 'Vitacura, Santiago'
        }
    },
    proyecto3: {
        title: 'Renovación con Mosaicos',
        category: 'Revestimientos',
        description: 'Renovación completa de piscina existente con mosaicos vítreos importados',
        images: [
            'assets/img/galeria/proyecto3/imagen1.jpg',
            'assets/img/galeria/proyecto3/imagen2.jpg',
            'assets/img/galeria/proyecto3/imagen3.jpg'
        ],
        specs: {
            'Dimensiones': '7m x 3.5m x 1.4m',
            'Tipo': 'Renovación',
            'Revestimiento': 'Mosaicos vítreos azul turquesa',
            'Equipos': 'Renovación sistema de filtración',
            'Tiempo de construcción': '2 semanas',
            'Ubicación': 'Providencia, Santiago'
        }
    }
};

let currentProjectIndex = 0;
const projectKeys = Object.keys(projectsData);

// ===== FILTRO DE GALERÍA =====
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filtrar proyectos
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
        });
    });
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