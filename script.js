// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(ancora => {
    ancora.addEventListener('click', (e) => {
        e.preventDefault();
        const id = ancora.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add mobile menu functionality
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.menu-links');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'menu-hamburguer';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Add hamburger to nav
    nav.appendChild(hamburger);
    
    // Toggle menu on click
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('mostrar');
    });
};

// Initialize mobile menu if screen width is small
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Update mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.menu-hamburguer')) {
            createMobileMenu();
        }
    } else {
        const hamburger = document.querySelector('.menu-hamburguer');
        if (hamburger) {
            hamburger.remove();
        }
        const navLinks = document.querySelector('.menu-links');
        if (navLinks) {
            navLinks.classList.remove('mostrar');
        }
    }
});

// Add countdown timer
const updateCountdown = () => {
    const dataEvento = new Date('April 16, 2025 09:00:00').getTime();
    const agora = new Date().getTime();
    const diferenca = dataEvento - agora;

    const contagemRegressiva = document.querySelector('.contagem-regressiva');
    if (!contagemRegressiva) return;

    if (diferenca < 0) {
        contagemRegressiva.innerHTML = '<p>O evento já começou!</p>';
        return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    contagemRegressiva.innerHTML = `
        <div class="item-contagem">
            <span class="numero">${dias.toString().padStart(2, '0')}</span>
            <span class="rotulo">dias</span>
        </div>
        <div class="item-contagem">
            <span class="numero">${horas.toString().padStart(2, '0')}</span>
            <span class="rotulo">horas</span>
        </div>
        <div class="item-contagem">
            <span class="numero">${minutos.toString().padStart(2, '0')}</span>
            <span class="rotulo">minutos</span>
        </div>
        <div class="item-contagem">
            <span class="numero">${segundos.toString().padStart(2, '0')}</span>
            <span class="rotulo">segundos</span>
        </div>
    `;
};

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Tab functionality
const botoesAba = document.querySelectorAll('.botao-aba');
const conteudosAba = document.querySelectorAll('.conteudo-aba');

botoesAba.forEach(botao => {
    botao.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        botoesAba.forEach(btn => btn.classList.remove('ativo'));
        conteudosAba.forEach(content => content.classList.remove('ativo'));

        // Add active class to clicked button and corresponding content
        botao.classList.add('ativo');
        const abaAlvo = botao.dataset.aba;
        document.querySelector(`.conteudo-aba[data-aba="${abaAlvo}"]`).classList.add('ativo');
    });
});

// Animações ao rolar
const elementosAnimar = document.querySelectorAll('.animar');

function verificarVisibilidade() {
    const alturaJanela = window.innerHeight;
    elementosAnimar.forEach(elemento => {
        const posicaoTopo = elemento.getBoundingClientRect().top;
        if (posicaoTopo < alturaJanela * 0.75) {
            elemento.classList.add('mostrar');
        }
    });
}

window.addEventListener('scroll', verificarVisibilidade);
verificarVisibilidade(); 