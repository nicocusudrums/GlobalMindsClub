
// INICIALIZAR EMAILJS
emailjs.init("D7DpJsArACpx3YiNW"); // tu Public Key de EmailJS

// MENU HAMBURGUESA
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// FORMULARIO EMAILJS
const form = document.getElementById('contact-form');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    emailjs.sendForm('service_rt1jtqh', 'template_rhnceu3', this)
        .then(() => {
            alert('¡Mensaje enviado! Gracias por contactarnos.');
            form.reset();
        }, (error) => {
            alert('Error al enviar el mensaje: ' + error.text);
        });
});

// SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// NAVBAR DINÁMICO
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(10, 37, 64, 0.95)";
        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.3)";
    } else {
        navbar.style.background = "rgba(10, 37, 64, 0.85)";
        navbar.style.boxShadow = "none";
    }
});

// SCROLL ANIMATIONS
const reveals = document.querySelectorAll('section:not(#contact), .service, .destination');

// Hacemos que #contact esté activo siempre
const contactSection = document.querySelector('#contact');
contactSection.classList.add('active');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85; // ajuste de activación
    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < triggerBottom) el.classList.add('active');
    });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

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
    let offset = window.scrollY;
    hero.style.backgroundPositionY = offset * 0.5 + "px";
});

// CARRUSEL FUNCIONAL
window.addEventListener('load', () => {
    const track = document.querySelector('.carousel-track');
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