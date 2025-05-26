// Script para verificação de idade
document.addEventListener("DOMContentLoaded", function () {
  // Verificar se o usuário já confirmou a idade anteriormente
  const ageVerified = localStorage.getItem("ageVerified");

  // Mostrar o modal apenas se o usuário ainda não tiver confirmado a idade
  if (!ageVerified) {
    // Criar o modal de verificação de idade
    const ageVerificationModal = document.createElement("div");
    ageVerificationModal.className = "age-verification-overlay";
    ageVerificationModal.innerHTML = `
            <div class="age-verification-container">
                <div class="age-verification-logo">
                    <img src="${
                      window.location.pathname.includes("/pages/") ? "../" : ""
                    }images/logo.jpg" alt="Cervejaria Fratelli">
                </div>
                <div class="age-verification-content">
                    <h2 class="age-verification-title">VOCÊ TEM MAIS DE 18 ANOS?</h2>
                    <p class="age-verification-text">Este site contém informações sobre bebidas alcoólicas e é destinado apenas para maiores de 18 anos.</p>
                    <div class="age-verification-buttons">
                        <button class="age-btn age-btn-no" id="ageButtonNo">Não</button>
                        <button class="age-btn age-btn-yes" id="ageButtonYes">Sim</button>
                    </div>
                </div>
                <div class="age-verification-denied" id="ageDenied">
                    <h2 class="age-verification-denied-title">Acesso Negado</h2>
                    <p class="age-verification-denied-text">Você ainda não pode acessar esse site.</p>
                </div>
            </div>
        `;

    // Adicionar o modal ao body
    document.body.appendChild(ageVerificationModal);

    // Impedir o scroll do body enquanto o modal estiver aberto
    document.body.style.overflow = "hidden";

    // Adicionar eventos aos botões
    document
      .getElementById("ageButtonYes")
      .addEventListener("click", function () {
        // Salvar no localStorage que o usuário confirmou a idade
        localStorage.setItem("ageVerified", "true");

        // Remover o modal com animação
        ageVerificationModal.style.opacity = "0";
        setTimeout(() => {
          ageVerificationModal.remove();
          // Permitir o scroll novamente
          document.body.style.overflow = "auto";
        }, 500);
      });

    document
      .getElementById("ageButtonNo")
      .addEventListener("click", function () {
        // Esconder o conteúdo de verificação com animação
        document.querySelector(".age-verification-content").style.opacity = "0";
        setTimeout(() => {
          document.querySelector(".age-verification-content").style.display =
            "none";
          // Mostrar a mensagem de acesso negado com animação
          document.getElementById("ageDenied").style.display = "block";
          setTimeout(() => {
            document.getElementById("ageDenied").style.opacity = "1";
          }, 100);
        }, 500);
      });
  }
});
