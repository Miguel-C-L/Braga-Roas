/* ==========================================================
   BRAGA, ROAS ADVOGADOS
   script.js
   JavaScript ES6 Vanilla
========================================================== */

'use strict';

/* ==========================================================
   SELETORES
========================================================== */

const header = document.getElementById('header');

const backToTop = document.getElementById('backToTop');

const mobileButton = document.getElementById('mobileButton');

const mobileMenu = document.getElementById('mobileMenu');

const mobileLinks = document.querySelectorAll('#mobileMenu a');

const preloader = document.getElementById('preloader');

const counters = document.querySelectorAll('.counter');

const reveals = document.querySelectorAll(
    '.reveal, .fade-left, .fade-right'
);

const contactForm = document.getElementById('contactForm');

const formMessage = document.getElementById('formMessage');

const testimonialTrack = document.querySelector('.testimonial-track');

const currentYear = document.getElementById('currentYear');

/* ==========================================================
   PRELOADER
========================================================== */

window.addEventListener('load', () => {

    preloader.style.opacity = '0';

    setTimeout(() => {

        preloader.style.display = 'none';

    }, 500);

});

/* ==========================================================
   HEADER
========================================================== */

function updateHeader(){

    if(window.scrollY > 60){

        header.classList.add('scrolled');

    }else{

        header.classList.remove('scrolled');

    }

}

window.addEventListener('scroll', updateHeader);

updateHeader();

/* ==========================================================
   BACK TO TOP
========================================================== */

function updateBackToTop(){

    if(window.scrollY > 500){

        backToTop.classList.add('show');

    }else{

        backToTop.classList.remove('show');

    }

}

window.addEventListener('scroll', updateBackToTop);

backToTop.addEventListener('click', () => {

    window.scrollTo({

        top:0,

        behavior:'smooth'

    });

});

/* ==========================================================
   MENU MOBILE
========================================================== */

mobileButton.addEventListener('click', () => {

    mobileMenu.classList.toggle('active');

    mobileButton.classList.toggle('active');

});

mobileLinks.forEach(link => {

    link.addEventListener('click', () => {

        mobileMenu.classList.remove('active');

        mobileButton.classList.remove('active');

    });

});

/* ==========================================================
   SCROLL SUAVE
========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if(target){

            target.scrollIntoView({

                behavior:'smooth',

                block:'start'

            });

        }

    });

});

/* ==========================================================
   SCROLL REVEAL
========================================================== */

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add('active');

        }

    });

},{

    threshold:.15

});

reveals.forEach(item => {

    revealObserver.observe(item);

});
/* ==========================================================
   CONTADORES ANIMADOS
========================================================== */

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(!entry.isIntersecting) return;

        const counter = entry.target;

        const target = parseInt(counter.dataset.target);

        const duration = 2000;

        const increment = target / (duration / 16);

        let current = 0;

        function updateCounter(){

            current += increment;

            if(current >= target){

                counter.textContent = target.toLocaleString('pt-BR');

                return;

            }

            counter.textContent = Math.floor(current).toLocaleString('pt-BR');

            requestAnimationFrame(updateCounter);

        }

        updateCounter();

        counterObserver.unobserve(counter);

    });

},{

    threshold:.5

});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});

/* ==========================================================
   CARROSSEL DE DEPOIMENTOS
========================================================== */

if(testimonialTrack){

    let currentSlide = 0;

    const testimonials = document.querySelectorAll('.testimonial');

    function getVisibleSlides(){

        if(window.innerWidth <= 768){

            return 1;

        }

        if(window.innerWidth <= 992){

            return 2;

        }

        return 3;

    }

    function moveSlider(){

        const visible = getVisibleSlides();

        const total = testimonials.length;

        const maxSlide = Math.max(total - visible,0);

        if(currentSlide >= maxSlide){

            currentSlide = 0;

        }else{

            currentSlide++;

        }

        const percentage = 100 / visible;

        testimonialTrack.style.transform =
            `translateX(-${currentSlide * percentage}%)`;

    }

    setInterval(moveSlider,5000);

    window.addEventListener('resize',moveSlider);

}

/* ==========================================================
   PARALLAX HERO
========================================================== */

const hero = document.querySelector('.hero');

window.addEventListener('scroll',()=>{

    if(hero){

        hero.style.backgroundPositionY =
            `${window.scrollY * 0.35}px`;

    }

});

/* ==========================================================
   FORMULÁRIO
========================================================== */

if(contactForm){

    contactForm.addEventListener('submit',function(e){

        e.preventDefault();

        const nome =
            document.getElementById('nome').value.trim();

        const email =
            document.getElementById('email').value.trim();

        const telefone =
            document.getElementById('telefone').value.trim();

        const mensagem =
            document.getElementById('mensagem').value.trim();

        if(

            nome === '' ||

            email === '' ||

            telefone === '' ||

            mensagem === ''

        ){

            formMessage.style.color = '#d62828';

            formMessage.textContent =
                'Preencha todos os campos obrigatórios.';

            return;

        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){

            formMessage.style.color='#d62828';

            formMessage.textContent =
                'Informe um e-mail válido.';

            return;

        }

        formMessage.style.color='#1d7a1d';

        formMessage.textContent =
            'Mensagem enviada com sucesso!';

        setTimeout(()=>{

            contactForm.submit();

        },1200);

    });

}

/* ==========================================================
   ANO AUTOMÁTICO
========================================================== */

if(currentYear){

    currentYear.textContent =
        new Date().getFullYear();

}

/* ==========================================================
   MODO ESCURO (PREPARADO)
========================================================== */

const themeButton =
    document.getElementById('themeToggle');

if(themeButton){

    themeButton.addEventListener('click',()=>{

        document.body.classList.toggle('dark');

        localStorage.setItem(

            'theme',

            document.body.classList.contains('dark')
            ? 'dark'
            : 'light'

        );

    });

}

if(localStorage.getItem('theme') === 'dark'){

    document.body.classList.add('dark');

}

/* ==========================================================
   PERFORMANCE
========================================================== */

window.addEventListener(

    'pageshow',

    ()=>{

        updateHeader();

        updateBackToTop();

    }

);

/* ==========================================================
   LAZY ANIMATION
========================================================== */

document.querySelectorAll('img').forEach(image=>{

    image.loading='lazy';

});

/* ==========================================================
   DESABILITA BOTÃO DURANTE ENVIO
========================================================== */

if(contactForm){

    const submitButton =
        contactForm.querySelector('button');

    contactForm.addEventListener('submit',()=>{

        submitButton.disabled = true;

        submitButton.textContent =
            'Enviando...';

    });

}

/* ==========================================================
   FIM DO SCRIPT
========================================================== */