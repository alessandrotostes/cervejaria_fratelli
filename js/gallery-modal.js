// Script para o carrossel modal personalizado da galeria
document.addEventListener("DOMContentLoaded", function () {
  // Criar o modal para o carrossel
  const modalHTML = `
        <div id="galleryModal" class="gallery-modal">
            <div class="gallery-modal-content">
                <span class="gallery-modal-close">&times;</span>
                <div class="gallery-modal-container">
                    <img id="galleryModalImg" class="gallery-modal-img">
                    <div class="gallery-modal-caption"></div>
                </div>
                <a class="gallery-modal-prev">&#10094;</a>
                <a class="gallery-modal-next">&#10095;</a>
            </div>
        </div>
    `;

  // Adicionar o modal ao body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Selecionar elementos do DOM
  const modal = document.getElementById("galleryModal");
  const modalImg = document.getElementById("galleryModalImg");
  const modalCaption = document.querySelector(".gallery-modal-caption");
  const closeBtn = document.querySelector(".gallery-modal-close");
  const prevBtn = document.querySelector(".gallery-modal-prev");
  const nextBtn = document.querySelector(".gallery-modal-next");

  // Variáveis para controlar o carrossel
  let currentCategory = "";
  let currentImages = [];
  let currentIndex = 0;

  // Função para abrir o modal
  function openModal(img, category) {
    // Definir a categoria atual
    currentCategory = category;

    // Coletar todas as imagens da mesma categoria
    const categoryItems = document.querySelectorAll(
      `.gallery-item[data-category="${category}"]`
    );
    currentImages = [];

    categoryItems.forEach((item) => {
      const imgElement = item.querySelector(".gallery-img");
      const imgSrc = imgElement.getAttribute("src");
      const imgAlt = imgElement.getAttribute("alt");
      const imgTitle =
        item.querySelector("a").getAttribute("data-title") || imgAlt;

      currentImages.push({
        src: imgSrc,
        title: imgTitle,
      });
    });

    // Encontrar o índice da imagem atual
    currentIndex = currentImages.findIndex((image) => image.src === img.src);

    // Exibir a imagem atual
    modalImg.src = img.src;
    modalCaption.textContent = currentImages[currentIndex].title;

    // Mostrar o modal com animação
    modal.style.display = "flex";
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);

    // Impedir o scroll do body
    document.body.style.overflow = "hidden";
  }

  // Função para fechar o modal
  function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
      // Permitir o scroll novamente
      document.body.style.overflow = "auto";
    }, 300);
  }

  // Função para navegar para a próxima imagem
  function nextImage() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    modalImg.src = currentImages[currentIndex].src;
    modalCaption.textContent = currentImages[currentIndex].title;
    animateImageChange();
  }

  // Função para navegar para a imagem anterior
  function prevImage() {
    currentIndex =
      (currentIndex - 1 + currentImages.length) % currentImages.length;
    modalImg.src = currentImages[currentIndex].src;
    modalCaption.textContent = currentImages[currentIndex].title;
    animateImageChange();
  }

  // Função para animar a troca de imagens
  function animateImageChange() {
    modalImg.classList.add("changing");
    setTimeout(() => {
      modalImg.classList.remove("changing");
    }, 300);
  }

  // Adicionar event listeners para todas as imagens da galeria
  document.querySelectorAll(".gallery-img-container").forEach((container) => {
    container.addEventListener("click", function (e) {
      e.preventDefault();
      const img = this.querySelector(".gallery-img");
      const category =
        this.closest(".gallery-item").getAttribute("data-category");
      openModal(img, category);
    });
  });

  // Event listeners para navegação do modal
  closeBtn.addEventListener("click", closeModal);
  prevBtn.addEventListener("click", prevImage);
  nextBtn.addEventListener("click", nextImage);

  // Fechar o modal ao clicar fora da imagem
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Navegação com teclado
  document.addEventListener("keydown", function (e) {
    if (modal.style.display === "flex") {
      if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "Escape") {
        closeModal();
      }
    }
  });
});
