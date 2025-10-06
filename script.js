// TGb2b_landing - JavaScript для лендинга ведущего Тимура Громова

// Инициализация dataLayer для аналитики
window.dataLayer = window.dataLayer || [];

// Функция для трекинга CTA кликов
function trackCTAClick(label, element) {
    const event = {
        event: 'cta_click',
        label: label,
        timestamp: new Date().toISOString(),
        url: window.location.href
    };
    
    console.log('CTA Click tracked:', event);
    window.dataLayer.push(event);
}

// Управление модальными окнами
class ModalManager {
    constructor() {
        this.modals = new Map();
        this.activeModal = null;
        this.init();
    }
    
    init() {
        // Находим все модальные окна
        const modalElements = document.querySelectorAll('.modal');
        modalElements.forEach(modal => {
            const id = modal.id;
            this.modals.set(id, modal);
        });
        
        // Добавляем обработчики событий
        this.addEventListeners();
    }
    
    addEventListeners() {
        // Закрытие по клику на overlay или кнопку закрытия
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-modal-close')) {
                this.closeActiveModal();
            }
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeActiveModal();
            }
        });
        
        // Обработчики для кнопок открытия модалок
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-modal')) {
                const modalId = e.target.getAttribute('data-modal');
                this.openModal(modalId);
            }
        });
        
        // Обработчики для видео
        document.addEventListener('click', (e) => {
            if (e.target.closest('.video-item')) {
                const videoItem = e.target.closest('.video-item');
                const videoId = videoItem.getAttribute('data-video');
                this.openVideoModal(videoId);
            }
        });
    }
    
    openModal(modalId) {
        const modal = this.modals.get(modalId + 'Modal');
        if (modal) {
            this.activeModal = modal;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            
            // Фокус на модальном окне для доступности
            const focusableElement = modal.querySelector('button, input, textarea, select, a[href]');
            if (focusableElement) {
                focusableElement.focus();
            }
        }
    }
    
    openVideoModal(videoId) {
        const modal = this.modals.get('videoModal');
        if (modal) {
            this.activeModal = modal;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            
            // Устанавливаем источник видео
            const video = modal.querySelector('#modalVideo');
            if (video) {
                video.src = `assets/${videoId}.mp4`;
                video.load();
            }
            
            // Трекинг клика по видео
            trackCTAClick('video_play', { videoId });
        }
    }
    
    closeActiveModal() {
        if (this.activeModal) {
            this.activeModal.classList.remove('active');
            this.activeModal.setAttribute('aria-hidden', 'true');
            this.activeModal = null;
            document.body.style.overflow = '';
            
            // Останавливаем видео при закрытии
            const video = document.querySelector('#modalVideo');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        }
    }
}

// Плавная прокрутка для навигации
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        // Обработчики для ссылок с якорями
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    this.scrollToElement(targetElement);
                }
            }
        });
    }
    
    scrollToElement(element) {
        const headerHeight = document.querySelector('.nav').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Обработка CTA кнопок
class CTATracker {
    constructor() {
        this.init();
    }
    
    init() {
        // WhatsApp кнопки
        document.addEventListener('click', (e) => {
            const whatsappLink = e.target.closest('a[href*="wa.me"]');
            if (whatsappLink) {
                trackCTAClick('whatsapp', whatsappLink);
            }
        });
        
        // Телефонные ссылки
        document.addEventListener('click', (e) => {
            const phoneLink = e.target.closest('a[href^="tel:"]');
            if (phoneLink) {
                trackCTAClick('call', phoneLink);
            }
        });
        
        // Кнопка "Получить программы"
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-modal') && e.target.getAttribute('data-modal') === 'programs') {
                trackCTAClick('programs', e.target);
            }
        });
    }
}

// Lazy loading для изображений
class LazyLoader {
    constructor() {
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    }
                });
            });
            
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
}

// Анимации при скролле
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            const animatedElements = document.querySelectorAll('.benefit-item, .hero__content, .cta__content');
            animatedElements.forEach(el => {
                animationObserver.observe(el);
            });
        }
    }
}

// Управление видео
class VideoManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Обработка воспроизведения видео в модальном окне
        const videoModal = document.getElementById('videoModal');
        if (videoModal) {
            const video = videoModal.querySelector('video');
            if (video) {
                video.addEventListener('loadeddata', () => {
                    console.log('Video loaded successfully');
                });
                
                video.addEventListener('error', (e) => {
                    console.warn('Video loading error:', e);
                    // Показываем заглушку если видео не загрузилось
                    video.innerHTML = '<p>Видео временно недоступно</p>';
                });
            }
        }
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('TGb2b_landing - Лендинг загружен');
    
    // Инициализируем все компоненты
    new ModalManager();
    new SmoothScroll();
    new CTATracker();
    new LazyLoader();
    new ScrollAnimations();
    new VideoManager();
    
    // Добавляем CSS для анимаций
    const style = document.createElement('style');
    style.textContent = `
        .benefit-item,
        .hero__content,
        .cta__content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .benefit-item.animate-in,
        .hero__content.animate-in,
        .cta__content.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero__content {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Проверяем производительность
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        });
    }
});

// Обработка ошибок
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Обработка необработанных промисов
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Экспорт для возможного использования в консоли
window.TGb2bLanding = {
    trackCTAClick,
    ModalManager,
    SmoothScroll,
    CTATracker
};