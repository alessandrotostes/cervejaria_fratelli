// Script modernizado para a galeria interativa
document.addEventListener("DOMContentLoaded", function () {
  // Filtros da galeria com navegação suave
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const galleryCategories = document.querySelectorAll(".gallery-category");

  // Inicializar Lightbox para galeria
  if (typeof lightbox !== "undefined") {
    lightbox.option({
      resizeDuration: 300,
      wrapAround: true,
      albumLabel: "Imagem %1 de %2",
      fadeDuration: 300,
      showImageNumberLabel: true,
      alwaysShowNavOnTouchDevices: true,
    });
  }

  // Função para navegação suave
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const sectionTop =
        section.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight -
        20;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    }
  }

  // Adicionar eventos aos botões de filtro
  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remover classe active de todos os botões
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        // Adicionar classe active ao botão clicado
        this.classList.add("active");

        const filter = this.getAttribute("data-filter");

        // Se for "all", mostrar todas as categorias
        if (filter === "all") {
          galleryCategories.forEach((category) => {
            category.style.display = "block";
          });
          // Rolar para o topo da galeria
          scrollToSection("galeria");
        } else {
          // Esconder todas as categorias
          galleryCategories.forEach((category) => {
            category.style.display = "none";
          });

          // Mostrar apenas a categoria selecionada
          const selectedCategory = document.getElementById(filter);
          if (selectedCategory) {
            selectedCategory.style.display = "block";
            // Rolar para a categoria selecionada
            scrollToSection(filter);
          }
        }
      });
    });
  }

  // Adicionar efeito de hover e clique nas imagens da galeria
  galleryItems.forEach((item) => {
    // Adicionar efeito de hover
    item.addEventListener("mouseenter", function () {
      this.classList.add("hover");
    });

    item.addEventListener("mouseleave", function () {
      this.classList.remove("hover");
    });

    // Adicionar efeito de clique para dispositivos móveis
    item.addEventListener(
      "touchstart",
      function () {
        this.classList.add("touch-active");
      },
      { passive: true }
    );

    item.addEventListener(
      "touchend",
      function () {
        setTimeout(() => {
          this.classList.remove("touch-active");
        }, 300);
      },
      { passive: true }
    );
  });

  // Adicionar navegação com teclado para o lightbox
  document.addEventListener("keydown", function (e) {
    if (document.querySelector(".lb-container")) {
      if (e.key === "ArrowRight") {
        document.querySelector(".lb-next").click();
      } else if (e.key === "ArrowLeft") {
        document.querySelector(".lb-prev").click();
      } else if (e.key === "Escape") {
        document.querySelector(".lb-close").click();
      }
    }
  });

  // Adicionar animação de entrada para os itens da galeria
  const animateGalleryItems = function () {
    galleryItems.forEach((item, index) => {
      if (isElementInViewport(item) && !item.classList.contains("animated")) {
        // Adicionar atraso baseado no índice para efeito cascata
        setTimeout(() => {
          item.style.opacity = 1; // Explicitly set opacity to 1
          item.classList.add("animated", "fadeInUp");
        }, (index % 3) * 100); // Atraso diferente para cada coluna
      }
    });
  };

  // Verificar se elemento está visível na viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
      rect.bottom >= 0
    );
  }

  // Executar animação inicial e ao rolar
  animateGalleryItems();
  window.addEventListener("scroll", animateGalleryItems);

  // Adicionar funcionalidade de zoom nas imagens
  const galleryImages = document.querySelectorAll(".gallery-img");

  galleryImages.forEach((img) => {
    img.addEventListener("click", function (e) {
      // Impedir que o clique propague para outros elementos
      e.stopPropagation();

      // Encontrar o link do lightbox associado e clicar nele
      const lightboxLink =
        this.closest(".gallery-item").querySelector("a[data-lightbox]");
      if (lightboxLink) {
        lightboxLink.click();
      }
    });
  });
});
