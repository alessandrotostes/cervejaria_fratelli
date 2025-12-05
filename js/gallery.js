document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  // Adiciona evento de clique a cada botão
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // 1. Gerenciar classe 'active' nos botões
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // 2. Pegar o valor do filtro selecionado
      const filterValue = this.getAttribute("data-filter");

      // 3. Filtrar os itens
      galleryItems.forEach((item) => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    });
  });

  // Configuração Opcional do Lightbox (se quiser traduzir)
  if (typeof lightbox !== "undefined") {
    lightbox.option({
      resizeDuration: 200,
      wrapAround: true,
      albumLabel: "Imagem %1 de %2",
      fadeDuration: 300,
    });
  }
});
