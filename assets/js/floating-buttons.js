// ===== BOTONES FLOTANTES =====
document.addEventListener('DOMContentLoaded', function() {
    // Crear los botones flotantes
    createFloatingButtons();
    
    // Inicializar funcionalidad
    initScrollToTop();
    initWhatsAppButton();
});

function createFloatingButtons() {
    // Verificar si ya existen los botones
    if (document.querySelector('.floating-buttons')) {
        return;
    }
    
    // Crear contenedor de botones flotantes
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-buttons';
    
    // Botón de scroll to top
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'floating-btn scroll-to-top hidden';
    scrollBtn.setAttribute('aria-label', 'Volver arriba');
    // Forzar ocultación inicial con estilos inline
    scrollBtn.style.opacity = '0';
    scrollBtn.style.visibility = 'hidden';
    scrollBtn.style.transform = 'translateY(20px)';
    scrollBtn.style.pointerEvents = 'none';
    scrollBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
        </svg>
    `;
    
    // Botón de WhatsApp
    const whatsappBtn = document.createElement('a');
    whatsappBtn.className = 'floating-btn whatsapp-float';
    whatsappBtn.href = 'https://wa.me/56951888282';
    whatsappBtn.target = '_blank';
    whatsappBtn.setAttribute('aria-label', 'Contactar por WhatsApp');
    whatsappBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.786"/>
        </svg>
    `;
    
    // Agregar botones al contenedor
    floatingContainer.appendChild(scrollBtn);
    floatingContainer.appendChild(whatsappBtn);
    
    // Agregar al body
    document.body.appendChild(floatingContainer);
}

function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    
    if (!scrollBtn) return;
    
    let lastScrollTop = 0;
    let hasScrolledDown = false;
    let isInitialLoad = true;
    
    // Asegurar que el botón esté oculto al inicio
    scrollBtn.classList.add('hidden');
    
    // Mostrar/ocultar botón según scroll y dirección
    window.addEventListener('scroll', function() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // En la carga inicial, establecer la posición base
        if (isInitialLoad) {
            lastScrollTop = currentScrollTop;
            isInitialLoad = false;
            return;
        }
        
        // Solo detectar scroll hacia abajo si venimos desde una posición menor
        if (currentScrollTop > lastScrollTop && currentScrollTop > 200) {
            hasScrolledDown = true;
        }
        
        // Solo mostrar el botón si se ha hecho scroll hacia abajo Y estamos a más de 300px
        if (hasScrolledDown && currentScrollTop > 300) {
            scrollBtn.classList.remove('hidden');
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
            scrollBtn.style.transform = 'translateY(0)';
            scrollBtn.style.pointerEvents = 'auto';
        } else {
            scrollBtn.classList.add('hidden');
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
            scrollBtn.style.transform = 'translateY(20px)';
            scrollBtn.style.pointerEvents = 'none';
        }
        
        // Si volvemos muy cerca del inicio, resetear completamente
        if (currentScrollTop <= 100) {
            hasScrolledDown = false;
            scrollBtn.classList.add('hidden');
        }
        
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });
    
    // Funcionalidad de scroll suave al top
    scrollBtn.addEventListener('click', function() {
        hasScrolledDown = false; // Resetear estado al hacer clic
        scrollBtn.classList.add('hidden'); // Ocultar inmediatamente
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initWhatsAppButton() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    
    if (!whatsappBtn) return;
    
    // Agregar mensaje personalizado al WhatsApp
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const message = encodeURIComponent('¡Hola! Me interesa conocer más sobre sus servicios de construcción de piscinas. ¿Podrían brindarme información?');
        const whatsappUrl = `https://wa.me/56951888282?text=${message}`;
        
        window.open(whatsappUrl, '_blank');
    });
    
    // Efecto de hover adicional
    whatsappBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1) rotate(5deg)';
    });
    
    whatsappBtn.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
}

// Función para reinicializar botones (útil para páginas SPA)
function reinitFloatingButtons() {
    const existingButtons = document.querySelector('.floating-buttons');
    if (existingButtons) {
        existingButtons.remove();
    }
    createFloatingButtons();
    initScrollToTop();
    initWhatsAppButton();
}

// Exportar funciones para uso global
window.FloatingButtons = {
    init: createFloatingButtons,
    reinit: reinitFloatingButtons
};