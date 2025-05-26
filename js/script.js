// Script para funcionalidades gerais do site
document.addEventListener("DOMContentLoaded", function () {
  // Animação da navbar ao rolar
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  // Função para animar a navbar ao rolar
  function animateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  }

  // Inicializar a animação da navbar
  animateNavbar();
  window.addEventListener("scroll", animateNavbar);

  // Destacar item do menu ativo ao rolar
  function highlightNavItem() {
    let currentSection = "";
    let scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  // Inicializar o destaque do menu
  highlightNavItem();
  window.addEventListener("scroll", highlightNavItem);

  // Navegação suave ao clicar nos links do menu
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Fechar menu mobile após clicar
        const navbarToggler = document.querySelector(".navbar-toggler");
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click();
        }
      }
    });
  });

  // Animações de entrada para elementos
  const animateElements = document.querySelectorAll(
    ".animate-fadeInUp, .historia-text, .evento-card, .chopp-card, .contato-info"
  );

  function checkAnimations() {
    animateElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight * 0.85) {
        element.classList.add("animated");
      }
    });
  }

  // Inicializar animações
  checkAnimations();
  window.addEventListener("scroll", checkAnimations);

  // Inicializar carrossel de chopps com configurações personalizadas
  const choppsCarousel = document.getElementById("choppsCarousel");
  if (choppsCarousel) {
    const carousel = new bootstrap.Carousel(choppsCarousel, {
      interval: 5000,
      wrap: true,
      touch: true,
    });

    // Adicionar controles de teclado para o carrossel
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        carousel.prev();
      } else if (e.key === "ArrowRight") {
        carousel.next();
      }
    });
  }

  // Efeito de hover para cards de eventos
  const eventoCards = document.querySelectorAll(".evento-card");
  eventoCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.classList.add("evento-card-hover");
    });

    card.addEventListener("mouseleave", function () {
      this.classList.remove("evento-card-hover");
    });
  });

  // Efeito de hover para itens de chopeira
  const chopeiraItems = document.querySelectorAll(".chopeira-item");
  chopeiraItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.classList.add("chopeira-item-hover");
    });

    item.addEventListener("mouseleave", function () {
      this.classList.remove("chopeira-item-hover");
    });
  });

  // Animação para botões de contato
  const whatsappBtns = document.querySelectorAll(".whatsapp-btn");
  whatsappBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.classList.add("pulse");
    });

    btn.addEventListener("mouseleave", function () {
      this.classList.remove("pulse");
    });
  });

  // Detectar dispositivo móvel para ajustes específicos
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  if (isMobile) {
    document.body.classList.add("mobile-device");
  }
});
