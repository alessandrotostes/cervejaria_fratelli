document.addEventListener("DOMContentLoaded", function () {
  // --- LÓGICA DOS FILTROS DA GALERIA (Esta parte foi mantida) ---
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryCategories = document.querySelectorAll(
    "#galeria > .container > .row[id]"
  );

  // Função para navegação suave ao clicar no filtro
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

  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        const filter = this.getAttribute("data-filter");

        if (filter === "all") {
          galleryCategories.forEach((category) => {
            category.style.display = "flex";
          });
          scrollToSection("galeria");
        } else {
          galleryCategories.forEach((category) => {
            category.style.display = "none";
          });

          const selectedCategory = document.getElementById(filter);
          if (selectedCategory) {
            selectedCategory.style.display = "flex";
            scrollToSection(filter);
          }
        }
      });
    });
  }

  // --- LÓGICA DE ANIMAÇÃO (Mantida) ---
  const galleryItems = document.querySelectorAll(".gallery-item");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.classList.add("animated", "fadeInUp");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  galleryItems.forEach((item) => {
    observer.observe(item);
  });
});
