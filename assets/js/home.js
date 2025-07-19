// ===== HOME JAVASCRIPT - FUNCIONALIDADES ESPECÍFICAS =====

document.addEventListener('DOMContentLoaded', function() {
    initHeroAnimations();
    initServiceCards();
    initFeatureCounters();
    initScrollReveal();
});

// ===== ANIMACIONES DEL HERO =====
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroImage = document.querySelector('.hero-image');

    if (heroTitle) {
        // Animación de escritura para el título
        const titleText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';

        let i = 0;
        const typeWriter = () => {
            if (i < titleText.length) {
                heroTitle.textContent += titleText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Animar descripción después del título
                if (heroDescription) {
                    heroDescription.style.animation = 'fadeInUp 0.8s ease-out 0.5s forwards';
                }
                // Animar botones
                if (heroButtons) {
                    heroButtons.style.animation = 'fadeInUp 0.8s ease-out 1s forwards';
                }
            }
        };

        setTimeout(typeWriter, 1000);
    }

    // Efecto parallax suave para la imagen del hero
    if (heroImage) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        }, 10));
    }
}

// ===== TARJETAS DE SERVICIOS INTERACTIVAS =====
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach((card, index) => {
        // Efecto de hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 119, 190, 0.2)';
            
            // Animar el icono
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px) scale(1)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });

        // Animación de entrada escalonada
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);

        // Efecto de click con ondas
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== CONTADORES ANIMADOS =====
function initFeatureCounters() {
    const features = document.querySelectorAll('.feature');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateFeature(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    features.forEach(feature => {
        observer.observe(feature);
    });
}

function animateFeature(feature) {
    const icon = feature.querySelector('.feature-icon');
    const title = feature.querySelector('.feature-title');
    const description = feature.querySelector('.feature-description');

    // Animación del icono
    if (icon) {
        icon.style.animation = 'bounceIn 0.8s ease-out';
    }

    // Animación del título
    if (title) {
        setTimeout(() => {
            title.style.animation = 'slideInLeft 0.6s ease-out';
        }, 200);
    }

    // Animación de la descripción
    if (description) {
        setTimeout(() => {
            description.style.animation = 'fadeInUp 0.6s ease-out';
        }, 400);
    }
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.service-card, .feature, .cta-content');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal-element');
        revealObserver.observe(el);
    });
}

// ===== EFECTOS DE SCROLL AVANZADOS =====
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    
    // Efecto parallax para secciones
    const parallaxElements = document.querySelectorAll('.services-preview, .why-choose-us');
    parallaxElements.forEach(el => {
        const speed = 0.1;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });

    // Cambio de opacidad del hero basado en scroll
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroHeight = hero.offsetHeight;
        const opacity = Math.max(0, 1 - (scrolled / heroHeight));
        hero.style.opacity = opacity;
    }
}, 10));

// ===== INTERACCIONES AVANZADAS =====
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de partículas en el hero (opcional)
    createParticleEffect();
    
    // Inicializar tooltips personalizados
    initCustomTooltips();
    
    // Efecto de typing en elementos específicos
    initTypingEffect();
});

function createParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    hero.appendChild(particlesContainer);

    // Crear partículas
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

function initCustomTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.dataset.tooltip;
            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => tooltip.classList.add('show'), 10);
        });

        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.custom-tooltip');
            if (tooltip) {
                tooltip.classList.remove('show');
                setTimeout(() => tooltip.remove(), 300);
            }
        });
    });
}

function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(element => {
        const text = element.dataset.typing;
        const speed = parseInt(element.dataset.typingSpeed) || 100;
        
        element.textContent = '';
        let i = 0;
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const typeWriter = () => {
                        if (i < text.length) {
                            element.textContent += text.charAt(i);
                            i++;
                            setTimeout(typeWriter, speed);
                        }
                    };
                    typeWriter();
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    });
}

// ===== ESTILOS DINÁMICOS PARA HOME =====
const homeStyles = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 119, 190, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .particles-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    }

    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        animation: float linear infinite;
    }

    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }

    .custom-tooltip {
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 10000;
        opacity: 0;
        transform: translateY(5px);
        transition: all 0.3s ease;
        pointer-events: none;
    }

    .custom-tooltip.show {
        opacity: 1;
        transform: translateY(0);
    }

    .custom-tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
    }

    .reveal-element {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }

    .reveal-element.revealed {
        opacity: 1;
        transform: translateY(0);
    }

    @keyframes bounceIn {
        0% {
            transform: scale(0.3);
            opacity: 0;
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes slideInLeft {
        from {
            transform: translateX(-50px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .service-card {
        position: relative;
        overflow: hidden;
    }

    .service-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
    }

    .service-card:hover::before {
        left: 100%;
    }
`;

// Agregar estilos específicos de home
const homeStyleSheet = document.createElement('style');
homeStyleSheet.textContent = homeStyles;
document.head.appendChild(homeStyleSheet);