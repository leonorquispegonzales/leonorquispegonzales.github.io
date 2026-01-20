
// assets/js/script.js
document.addEventListener('DOMContentLoaded', function() {
  // Navegación móvil
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      
      // Actualizar enlace activo
      document.querySelectorAll('.nav-link').forEach(item => {
        item.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
  
  // Cambiar navegación activa al hacer scroll
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Carrusel de imágenes
  const carousel = document.querySelector('.carousel');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  
  // Número de imágenes
  const totalImages = 28;
  let currentIndex = 0;
  
  // Crear imágenes del carrusel
  for (let i = 1; i <= totalImages; i++) {
    const img = document.createElement('img');
    img.src = `assets/images/asset${i}.webp`;
    img.alt = `Proyecto ${i} - Ing. Leonor Quispe Gonzales`;
    img.dataset.index = i - 1;
    carousel.appendChild(img);
    
    // Crear indicadores
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (i === 1) indicator.classList.add('active');
    indicator.dataset.index = i - 1;
    indicatorsContainer.appendChild(indicator);
  }
  
  const images = document.querySelectorAll('.carousel img');
  const indicators = document.querySelectorAll('.indicator');
  
  // Función para actualizar carrusel
  function updateCarousel() {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    
    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
  
  // Eventos para botones
  prevBtn.addEventListener('click', function() {
    currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
    updateCarousel();
  });
  
  nextBtn.addEventListener('click', function() {
    currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  });
  
  // Eventos para indicadores
  indicators.forEach(indicator => {
    indicator.addEventListener('click', function() {
      currentIndex = parseInt(this.dataset.index);
      updateCarousel();
    });
  });
  
  // Auto-avance del carrusel
  let autoSlide = setInterval(() => {
    currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  }, 5000);
  
  // Pausar auto-avance al interactuar
  carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
  carousel.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
      updateCarousel();
    }, 5000);
  });
  
  // Modal para imágenes
  const modal = document.getElementById('imageModal');
  const modalImage = document.querySelector('.modal-image');
  const closeModal = document.querySelector('.close-modal');
  
  // Abrir modal al hacer clic en una imagen
  images.forEach(img => {
    img.addEventListener('click', function() {
      modal.style.display = 'flex';
      modalImage.src = this.src;
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Cerrar modal
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  // Cerrar modal al hacer clic fuera de la imagen
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Efecto de aparición al hacer scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);
  
  // Observar elementos para animación
  document.querySelectorAll('.timeline-item, .cargo-card, .recognition-card, .plan-card').forEach(el => {
    observer.observe(el);
  });
});
