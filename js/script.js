document.addEventListener("DOMContentLoaded", function () {
  // =========================================================
  // 1. NAVBAR & SCROLL SPY (Navegação Inteligente)
  // =========================================================
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  // Adiciona fundo escuro na navbar ao rolar
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  }

  // Destaca o link ativo no menu baseado na seção visível
  function highlightActiveLink() {
    let currentSection = "";
    const scrollPosition = window.scrollY + 150; // Offset para compensar a navbar

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

  window.addEventListener("scroll", () => {
    handleNavbarScroll();
    highlightActiveLink();
  });

  // =========================================================
  // 2. NAVEGAÇÃO SUAVE (Smooth Scroll)
  // =========================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Fecha o menu mobile se estiver aberto
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click();
        }

        // Calcula a posição considerando a altura da navbar fixa
        const navbarHeight = 80;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight +
          10; // Pequeno ajuste visual

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // =========================================================
  // 3. ANIMAÇÕES AO ROLAR (ATUALIZADO PARA O NOVO LAYOUT)
  // =========================================================
  // Aqui listamos todas as classes do novo layout que devem animar ao aparecer
  const elementsToAnimate = document.querySelectorAll(
    ".hero-title, .hero-subtitle, .hero-btn, .section-title, .essence-card, .beer-info, .experience-img-wrapper, .sub-heading, .cta-card, .animate-fadeInUp"
  );

  // Garante que todos tenham a classe base de opacidade 0
  elementsToAnimate.forEach((el) => el.classList.add("animate-fadeInUp"));

  const observerOptions = {
    threshold: 0.1, // Dispara quando 10% do elemento estiver visível
    rootMargin: "0px 0px -50px 0px", // Dispara um pouco antes de entrar totalmente
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target); // Para de observar após animar (melhora performance)
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });

  // =========================================================
  // 4. BARRA DE PROGRESSO DE LEITURA
  // =========================================================
  const progressBar = document.querySelector(".progress-bar");
  if (progressBar) {
    window.addEventListener("scroll", () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = scrollPercentage + "%";
    });
  }

  // =========================================================
  // 5. BOTÃO VOLTAR AO TOPO
  // =========================================================
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });
  }

  // =========================================================
  // 6. CARROSSEL DE CHOPPS (Bootstrap Config)
  // =========================================================
  const choppsCarousel = document.getElementById("choppsCarousel");
  if (choppsCarousel) {
    // Inicializa via Bootstrap API para garantir controle
    const carousel = new bootstrap.Carousel(choppsCarousel, {
      interval: 5000,
      wrap: true,
      touch: true, // Garante swipe em mobile
      pause: "hover",
    });

    // Navegação via teclado
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") carousel.prev();
      if (e.key === "ArrowRight") carousel.next();
    });
  }

  // =========================================================
  // 7. ANO AUTOMÁTICO NO RODAPÉ
  // =========================================================
  const yearSpan = document.querySelector(".copyright");
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    if (yearSpan.innerHTML.includes("2025")) {
      yearSpan.innerHTML = yearSpan.innerHTML.replace("2025", currentYear);
    }
  }
});
