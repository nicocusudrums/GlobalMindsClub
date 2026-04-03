
// INICIALIZAR EMAILJS
emailjs.init("D7DpJsArACpx3YiNW"); // tu Public Key de EmailJS

// MENU HAMBURGUESA
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

if (toggle && nav) {
    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}

// FORMULARIO EMAILJS
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Intentar buscar el botón dentro del formulario si no tiene ID
    const btn = document.getElementById('submit-btn') || this.querySelector('button[type="submit"]');
    const msg = document.getElementById('form-message');
    const originalText = btn.innerText;

    if (!msg) return; // Evitar error si falta el contenedor de mensaje

    btn.innerText = "Enviando...";
    msg.className = "";
    msg.innerText = "";

    emailjs.sendForm('service_rt1jtqh', 'template_rhnceu3', this)
        .then(() => {
            msg.innerText = '¡Mensaje enviado! Nos pondremos en contacto pronto.';
            msg.className = "success";
            form.reset();
        }, (error) => {
            msg.innerText = 'Hubo un error. Por favor intenta nuevamente.';
            msg.className = "error";
            console.error('EmailJS Error:', error);
        })
        .finally(() => {
            btn.innerText = originalText;
            setTimeout(() => { msg.innerText = ""; }, 5000); // Borrar mensaje a los 5s
        });
});
}

// SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== "#" && href !== "") {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// NAVBAR DINÁMICO
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled'); // El padding se maneja en CSS
    } else {
        navbar.classList.remove('scrolled'); // El padding se maneja en CSS
    }
});

// SCROLL ANIMATIONS
const reveals = document.querySelectorAll('section:not(#contact), .service, .destination');

// Hacemos que #contact esté activo siempre
const contactSection = document.querySelector('#contact');
if (contactSection) { // Añadido un chequeo para asegurar que la sección existe
    contactSection.classList.add('active');
}

// ANIMACIONES CON INTERSECTION OBSERVER (Más profesional y eficiente)
const observerOptions = {
    threshold: 0.15 // Se activa cuando el 15% del elemento es visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Opcional: dejar de observar si solo quieres que anime una vez
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

reveals.forEach(el => observer.observe(el));

// BOTONES EFECTO CLICK
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.style.transform = "scale(0.95)";
        setTimeout(() => { btn.style.transform = "scale(1)"; }, 150);
    });
});

// HERO PARALLAX
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    if (!hero) return;
    let offset = window.scrollY;
    hero.style.backgroundPositionY = offset * 0.5 + "px";
});

// CARRUSEL FUNCIONAL
window.addEventListener('load', () => {
    const track = document.querySelector('.carousel-track');
    if (!track) return; // Salir si no hay carrusel en la página
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const items = Array.from(track.children);
    let index = 0;

    const getSlideWidth = () => {
        const gap = parseInt(getComputedStyle(track).gap) || 0;
        return items[0].getBoundingClientRect().width + gap;
    };

    const updateCarousel = () => {
        track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
    };

    nextBtn.addEventListener('click', () => {
        index++;
        if (index >= items.length) index = 0;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        index--;
        if (index < 0) index = items.length - 1;
        updateCarousel();
    });

    let autoScroll = setInterval(() => {
        index++;
        if (index >= items.length) index = 0;
        updateCarousel();
    }, 3500);

    track.addEventListener('mouseenter', () => clearInterval(autoScroll));
    track.addEventListener('mouseleave', () => {
        autoScroll = setInterval(() => {
            index++;
            if (index >= items.length) index = 0;
            updateCarousel();
        }, 3500);
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
});

// EFECTO DE NÚMEROS INCREMENTALES (Para historias reales)
const animateNumbers = () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const count = +stat.innerText;
        const speed = target / 100;
        if (count < target) {
            stat.innerText = Math.ceil(count + speed);
            setTimeout(animateNumbers, 20);
        } else {
            stat.innerText = target;
        }
    });
};