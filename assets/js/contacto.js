// ===== CONTACTO JAVASCRIPT - FUNCIONALIDADES ESPECÍFICAS =====

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFAQ();
});

// ===== FORMULARIO DE CONTACTO =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });

    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        // Limpiar errores previos
        clearErrors();

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showFieldError(field, 'Este campo es obligatorio');
                isValid = false;
            }
        });

        // Validaciones específicas
        const email = form.querySelector('#email');
        if (email.value && !isValidEmail(email.value)) {
            showFieldError(email, 'Ingrese un email válido');
            isValid = false;
        }

        const telefono = form.querySelector('#telefono');
        if (telefono.value && !isValidPhone(telefono.value)) {
            showFieldError(telefono, 'Ingrese un teléfono válido (ej: +56912345678)');
            isValid = false;
        }

        const acepto = form.querySelector('#acepto');
        if (!acepto.checked) {
            showFieldError(acepto, 'Debe aceptar el uso de sus datos');
            isValid = false;
        }

        return isValid;
    }

    function showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        const existingError = formGroup.querySelector('.field-error');
        
        if (existingError) {
            existingError.remove();
        }

        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
        
        field.classList.add('error');
    }

    function clearErrors() {
        const errors = form.querySelectorAll('.field-error');
        const errorFields = form.querySelectorAll('.error');
        
        errors.forEach(error => error.remove());
        errorFields.forEach(field => field.classList.remove('error'));
    }

    async function submitForm() {
        // Mostrar estado de carga
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';

        try {
            // Recopilar datos del formulario
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Formatear teléfono
            if (data.telefono) {
                data.telefono = formatPhone(data.telefono);
            }

            // Simular envío (aquí integrarías con tu backend)
            await simulateFormSubmission(data);

            // Mostrar mensaje de éxito
            showNotification('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.', 'success');
            
            // Limpiar formulario
            form.reset();

            // Opcional: redirigir a WhatsApp con mensaje pre-llenado
            const whatsappMessage = createWhatsAppMessage(data);
            setTimeout(() => {
                if (confirm('¿Desea continuar la conversación por WhatsApp?')) {
                    window.open(`https://wa.me/56951888282?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
                }
            }, 2000);

        } catch (error) {
            console.error('Error al enviar formulario:', error);
            showNotification('Error al enviar el mensaje. Por favor, intente nuevamente.', 'error');
        } finally {
            // Restaurar estado del botón
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    }

    function simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            // Simular delay de red
            setTimeout(() => {
                // Simular éxito (90% de las veces)
                if (Math.random() > 0.1) {
                    console.log('Datos del formulario:', data);
                    resolve();
                } else {
                    reject(new Error('Error simulado'));
                }
            }, 2000);
        });
    }

    function createWhatsAppMessage(data) {
        let message = `¡Hola! Me contacto desde su sitio web.\n\n`;
        message += `*Datos de contacto:*\n`;
        message += `• Nombre: ${data.nombre}\n`;
        message += `• Teléfono: ${data.telefono}\n`;
        message += `• Email: ${data.email}\n\n`;
        
        if (data.servicio) {
            message += `*Servicio de interés:* ${getServiceName(data.servicio)}\n`;
        }
        
        if (data.presupuesto) {
            message += `*Presupuesto estimado:* ${getBudgetName(data.presupuesto)}\n`;
        }
        
        if (data.plazo) {
            message += `*Plazo del proyecto:* ${getTimeframeName(data.plazo)}\n`;
        }
        
        message += `\n*Mensaje:*\n${data.mensaje}`;
        
        return message;
    }

    function getServiceName(value) {
        const services = {
            'piscina-hormigon': 'Piscina de Hormigón',
            'piscina-arena': 'Piscina de Arena',
            'revestimientos': 'Revestimientos',
            'bordes': 'Bordes de Piscina',
            'equipos': 'Instalación de Equipos',
            'mantencion': 'Mantención',
            'otro': 'Otro'
        };
        return services[value] || value;
    }

    function getBudgetName(value) {
        const budgets = {
            'hasta-5m': 'Hasta $5.000.000',
            '5m-10m': '$5.000.000 - $10.000.000',
            '10m-15m': '$10.000.000 - $15.000.000',
            '15m-mas': 'Más de $15.000.000'
        };
        return budgets[value] || value;
    }

    function getTimeframeName(value) {
        const timeframes = {
            'inmediato': 'Inmediato',
            '1-3-meses': '1-3 meses',
            '3-6-meses': '3-6 meses',
            'mas-6-meses': 'Más de 6 meses'
        };
        return timeframes[value] || value;
    }

    // Validación en tiempo real
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                showFieldError(this, 'Este campo es obligatorio');
            } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                showFieldError(this, 'Ingrese un email válido');
            } else if (this.type === 'tel' && this.value && !isValidPhone(this.value)) {
                showFieldError(this, 'Ingrese un teléfono válido');
            } else {
                // Limpiar error si el campo es válido
                const formGroup = this.closest('.form-group');
                const error = formGroup.querySelector('.field-error');
                if (error) {
                    error.remove();
                    this.classList.remove('error');
                }
            }
        });

        input.addEventListener('input', function() {
            // Limpiar error mientras el usuario escribe
            if (this.classList.contains('error')) {
                const formGroup = this.closest('.form-group');
                const error = formGroup.querySelector('.field-error');
                if (error && this.value.trim()) {
                    error.remove();
                    this.classList.remove('error');
                }
            }
        });
    });
}

// ===== FAQ INTERACTIVO =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Cerrar todas las otras FAQ
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle la FAQ actual
                item.classList.toggle('active', !isActive);
            });
        }
    });
}

// ===== ESTILOS DINÁMICOS PARA FORMULARIO =====
const contactStyles = `
    .field-error {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    }

    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }

    .faq-item {
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 8px;
        margin-bottom: 1rem;
        overflow: hidden;
    }

    .faq-item:hover {
        background-color: rgba(0, 119, 190, 0.05);
    }

    .faq-question {
        position: relative;
        padding-right: 2rem;
    }

    .faq-question::after {
        content: '+';
        position: absolute;
        right: 0;
        top: 0;
        font-size: 1.5rem;
        font-weight: bold;
        color: #0077be;
        transition: transform 0.3s ease;
    }

    .faq-item.active .faq-question::after {
        transform: rotate(45deg);
    }

    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
        padding-top: 0;
    }

    .faq-item.active .faq-answer {
        max-height: 200px;
        padding-top: 0.5rem;
    }

    .submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .btn-loading {
        display: none;
    }
`;

// Agregar estilos específicos de contacto
const contactStyleSheet = document.createElement('style');
contactStyleSheet.textContent = contactStyles;
document.head.appendChild(contactStyleSheet);