
document.documentElement.classList.add('js-enabled');

const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

// Cabeçalho ao fazer scroll
function updateHeader() {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}

updateHeader();

window.addEventListener('scroll', updateHeader, {
  passive: true
});

// Menu para dispositivos móveis
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');

  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? 'Fechar −' : 'Menu +';
});

// Fechar o menu depois de selecionar uma secção
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = 'Menu +';
  });
});

// Animações de entrada das secções
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// Destacar a secção atual na navegação
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, {
  rootMargin: '-35% 0px -55% 0px'
});

sections.forEach(section => {
  activeObserver.observe(section);
});

// Atualizar automaticamente o ano no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Cursor personalizado para rato
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

if (window.matchMedia('(pointer:fine)').matches) {
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let rx = x;
  let ry = y;

  document.addEventListener('mousemove', event => {
    x = event.clientX;
    y = event.clientY;
  });

  function animateCursor() {
    cursor.style.transform = `translate(${x - 4}px, ${y - 4}px)`;

    rx += (x - rx) * 0.14;
    ry += (y - ry) * 0.14;

    ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

// Marquee: garantir que a faixa está sempre preenchida
const marqueeTrack = document.querySelector('.marquee-track');

if (marqueeTrack) {
  // Guardar o conteúdo original para criar repetições idênticas
  const originalItems = Array.from(marqueeTrack.children).map(item =>
    item.cloneNode(true)
  );

  function fillMarquee() {
    // Adicionar conteúdo até existir largura suficiente para a animação
    while (marqueeTrack.scrollWidth < window.innerWidth * 2) {
      originalItems.forEach(item => {
        marqueeTrack.appendChild(item.cloneNode(true));
      });
    }
  }

  fillMarquee();

  // Voltar a verificar se a janela mudar de tamanho
  window.addEventListener('resize', fillMarquee, {
    passive: true
  });
}
