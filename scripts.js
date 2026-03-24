// =========================
// INIT EMAILJS
// =========================
emailjs.init("D7DpJsArACpx3YiNW");

// =========================
// MENU
// =========================
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

// =========================
// FORM (UX MEJORADA)
// =========================
const form = document.getElementById('contact-form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    emailjs.sendForm('service_rt1jtqh', 'template_rhnceu3', this)
        .then(() => {
            showMessage("Mensaje enviado correctamente 🚀", "success");
            form.reset();
        })
        .catch(() => {
            showMessage("Error al enviar. Intenta nuevamente.", "error");
        });
});

function showMessage(text, type) {
    let msg = document.createElement('p');
    msg.textContent = text;
    msg.className = type;
    form.appendChild(msg);

    setTimeout(() => msg.remove(), 4000);
}

// =========================
// SCROLL SUAVE
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// =========================
// NAVBAR SCROLL (CLASE)
// =========================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// =========================
// SCROLL ANIMATIONS (MEJOR)
// =========================
const reveals = document.querySelectorAll('section, .service, .destination');

const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.85;

    reveals.forEach((el, index) => {
        const top = el.getBoundingClientRect().top;

        if (top < trigger) {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 100);
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// =========================
// HERO PARALLAX (SUAVE)
// =========================
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        hero.style.backgroundPositionY = window.scrollY * 0.3 + "px";
    });
});

// =========================
// CARRUSEL MEJORADO
// =========================
window.addEventListener('load', () => {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const items = Array.from(track.children);

    let index = 0;

    const update = () => {
        const width = items[0].getBoundingClientRect().width + 20;
        track.style.transform = `translateX(-${index * width}px)`;
    };

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % items.length;
        update();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + items.length) % items.length;
        update();
    });

    let auto = setInterval(() => nextBtn.click(), 4000);

    track.addEventListener('mouseenter', () => clearInterval(auto));
    track.addEventListener('mouseleave', () => {
        auto = setInterval(() => nextBtn.click(), 4000);
    });

    window.addEventListener('resize', update);
    update();
});