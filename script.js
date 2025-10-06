// TGb2b_landing - JavaScript для лендинга ведущего Тимура Громова (UI Upgrade)

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

// IntersectionObserver для reveal анимаций
class RevealAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        io.unobserve(entry.target);
                    }
                });
            }, { 
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            });
            
            document.querySelectorAll('.reveal').forEach(el => {
                io.observe(el);
            });
        }
    }
}

// Sticky Header с эффектом сжатия
class StickyHeader {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }
    
    init() {
        if (this.header) {
            window.addEventListener('scroll', () => {
                this.header.classList.toggle('scrolled', window.scrollY > 8);
            });
        }
    }
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
        
        // Обработчики для видео-карточек
        document.addEventListener('click', (e) => {
            const videoCard = e.target.closest('.video-card');
            if (videoCard) {
                const videoSrc = videoCard.getAttribute('data-video');
                this.openVideoModal(videoSrc);
            }
        });
    }
    
    openModal(modalId) {
        const modal = this.modals.get(modalId + 'Modal');
        if (modal) {
            this.activeModal = modal;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('no-scroll');
            
            // Фокус на модальном окне для доступности
            const focusableElement = modal.querySelector('button, input, textarea, select, a[href]');
            if (focusableElement) {
                focusableElement.focus();
            }
        }
    }
    
    openVideoModal(videoSrc) {
        const modal = this.modals.get('videoModal');
        if (modal) {
            this.activeModal = modal;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('no-scroll');
            
            // Устанавливаем источник видео
            const video = modal.querySelector('#modalVideo');
            if (video && videoSrc) {
                video.src = videoSrc;
                video.load();
            }
            
            // Трекинг клика по видео
            trackCTAClick('video_play', { videoSrc });
        }
    }
    
    closeActiveModal() {
        if (this.activeModal) {
            this.activeModal.classList.remove('active');
            this.activeModal.setAttribute('aria-hidden', 'true');
            this.activeModal = null;
            document.body.classList.remove('no-scroll');
            
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
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
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

// Плавающая кнопка WhatsApp
class FloatingWhatsApp {
    constructor() {
        this.init();
    }
    
    init() {
        // Показываем/скрываем кнопку в зависимости от скролла
        window.addEventListener('scroll', () => {
            const waFab = document.querySelector('.wa-fab');
            if (waFab) {
                // Показываем кнопку только на мобильных устройствах
                const isMobile = window.innerWidth <= 640;
                if (isMobile) {
                    waFab.style.display = window.scrollY > 200 ? 'block' : 'none';
                }
            }
        });
        
        // Обработчик изменения размера окна
        window.addEventListener('resize', () => {
            const waFab = document.querySelector('.wa-fab');
            if (waFab) {
                const isMobile = window.innerWidth <= 640;
                waFab.style.display = isMobile ? 'block' : 'none';
            }
        });
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('TGb2b_landing - Лендинг загружен (UI Upgrade)');
    
    // Инициализируем все компоненты
    new RevealAnimations();
    new StickyHeader();
    new ModalManager();
    new SmoothScroll();
    new CTATracker();
    new LazyLoader();
    new VideoManager();
    new FloatingWhatsApp();
    
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
    CTATracker,
    RevealAnimations,
    StickyHeader,
    FloatingWhatsApp
};