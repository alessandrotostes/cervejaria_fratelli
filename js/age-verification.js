// Script para verificação de idade
document.addEventListener("DOMContentLoaded", function () {
  // 1. Verificar se o usuário já confirmou a idade anteriormente
  const ageVerified = localStorage.getItem("ageVerified");

  // Se já verificou, não faz nada e retorna
  if (ageVerified === "true") {
    return;
  }

  // 2. Determinar o caminho correto da imagem do logo
  // Se estivermos dentro da pasta /pages/, precisamos voltar um nível (../)
  // Verifica se a URL contém "/pages/"
  const isPagesDir = window.location.pathname.includes("/pages/");
  // Verifica se estamos no GitHub Pages (geralmente tem o nome do repositório no caminho)
  // Ajuste básico para garantir que funcione em subpastas
  const imgPrefix = isPagesDir ? "../" : "";
  const logoPath = `${imgPrefix}images/logo.jpg`;

  // 3. Criar o HTML do modal dinamicamente
  const ageVerificationModal = document.createElement("div");
  ageVerificationModal.className = "age-verification-overlay";

  ageVerificationModal.innerHTML = `
      <div class="age-verification-container">
          <div class="age-verification-logo">
              <img src="${logoPath}" alt="Cervejaria Fratelli">
          </div>
          
          <div class="age-verification-content">
              <h2 class="age-verification-title">Você tem mais de 18 anos?</h2>
              <p class="age-verification-text">
                  Este site contém informações sobre bebidas alcoólicas e é destinado apenas para maiores de idade.
              </p>
              <div class="age-verification-buttons">
                  <button class="age-btn age-btn-no" id="ageButtonNo">Não</button>
                  <button class="age-btn age-btn-yes" id="ageButtonYes">Sim, tenho</button>
              </div>
          </div>

          <div class="age-verification-denied" id="ageDenied">
              <h2 class="age-verification-denied-title">Acesso Restrito</h2>
              <p class="age-verification-denied-text">
                  Desculpe, você precisa ter mais de 18 anos para acessar este conteúdo.
              </p>
              <a href="https://www.google.com" class="age-btn age-btn-no" style="display:inline-block; margin-top:20px; text-decoration:none;">Sair do Site</a>
          </div>
      </div>
  `;

  // 4. Adicionar o modal ao final do body
  document.body.appendChild(ageVerificationModal);

  // 5. Travar a rolagem da página
  document.body.style.overflow = "hidden";

  // 6. Lógica do Botão SIM
  document
    .getElementById("ageButtonYes")
    .addEventListener("click", function () {
      // Salvar no localStorage
      localStorage.setItem("ageVerified", "true");

      // Animação de saída
      ageVerificationModal.style.transition = "opacity 0.5s ease";
      ageVerificationModal.style.opacity = "0";

      // Remover do DOM após animação
      setTimeout(() => {
        ageVerificationModal.remove();
        document.body.style.overflow = "auto"; // Destrava a rolagem
      }, 500);
    });

  // 7. Lógica do Botão NÃO
  document.getElementById("ageButtonNo").addEventListener("click", function () {
    const contentDiv = document.querySelector(".age-verification-content");
    const deniedDiv = document.getElementById("ageDenied");

    // Some com o conteúdo atual
    contentDiv.style.display = "none";

    // Mostra a mensagem de negado
    deniedDiv.style.display = "block";
  });
});
