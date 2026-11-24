



/* =========================================
  CONFIGURAÇÕES DA LQTech
========================================= */




// Coloque o número do WhatsApp da assistência.
// Formato: 55 + DDD + número, sem espaços ou símbolos.
const whatsappLotech = "+55 81 8300-0302";




// Links da empresa
const linkInstagram = "https://www.instagram.com/lqtech.assistencia?fqnt=dWVpeHA5OWFyNHh3";
const linkMaps = "https://maps.app.goo.gl/wD5GawPpvycUkfyc9?g_st=aw";








/* =========================================
  MENU MOBILE
========================================= */




const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");




if (menuToggle && mainNav) {
   menuToggle.addEventListener("click", () => {
       const menuAberto = mainNav.classList.toggle("active");




       menuToggle.classList.toggle("active", menuAberto);
       menuToggle.setAttribute("aria-expanded", menuAberto);




       menuToggle.textContent = menuAberto ? "✕" : "☰";
   });




   // Fecha o menu ao clicar em um link
   mainNav.querySelectorAll("a").forEach(link => {
       link.addEventListener("click", () => {
           mainNav.classList.remove("active");
           menuToggle.classList.remove("active");
           menuToggle.setAttribute("aria-expanded", "false");
           menuToggle.textContent = "☰";
       });
   });




   // Fecha o menu ao clicar fora dele
   document.addEventListener("click", event => {
       const clicouNoMenu = mainNav.contains(event.target);
       const clicouNoBotao = menuToggle.contains(event.target);




       if (!clicouNoMenu && !clicouNoBotao) {
           mainNav.classList.remove("active");
           menuToggle.classList.remove("active");
           menuToggle.setAttribute("aria-expanded", "false");
           menuToggle.textContent = "☰";
       }
   });
}








/* =========================================
  WHATSAPP
========================================= */




function abrirWhatsApp(mensagem) {
   const numero = whatsappLotech.replace(/\D/g, "");




   if (!numero || numero === "+55 81 8300-0302") {
       alert("Configure o número de WhatsApp da LQTech no arquivo script.js.");
       return;
   }




   const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;




   window.open(url, "_blank", "noopener,noreferrer");
}




// Botões gerais do WhatsApp
document.querySelectorAll("[data-whatsapp]").forEach(botao => {
   botao.addEventListener("click", event => {
       event.preventDefault();




       const mensagem =
           botao.dataset.message ||
           "Olá! Gostaria de mais informações sobre os serviços da LQTech Assistência.";




       abrirWhatsApp(mensagem);
   });
});








/* =========================================
  GOOGLE MAPS
========================================= */




document.querySelectorAll("[data-maps]").forEach(link => {
   link.setAttribute("href", linkMaps);
   link.setAttribute("target", "_blank");
   link.setAttribute("rel", "noopener noreferrer");
});








/* =========================================
  INSTAGRAM
========================================= */




document.querySelectorAll("[data-instagram]").forEach(link => {
   link.setAttribute("href", linkInstagram);
   link.setAttribute("target", "_blank");
   link.setAttribute("rel", "noopener noreferrer");
});








/* =========================================
  ANO AUTOMÁTICO NO RODAPÉ
========================================= */




const yearElement = document.getElementById("year");




if (yearElement) {
   yearElement.textContent = new Date().getFullYear();
}








/* =========================================
  MODAL DE AGENDAMENTO
========================================= */




const bookingModal = document.getElementById("bookingModal");
const closeBooking = document.getElementById("closeBooking");
const bookingForm = document.getElementById("bookingForm");
const selectedService = document.getElementById("selectedService");




const bookingDate = document.getElementById("bookingDate");




let servicoAtual = "Avaliação de aparelho";




// Define a data mínima como hoje
if (bookingDate) {
   const hoje = new Date();
   const ano = hoje.getFullYear();
   const mes = String(hoje.getMonth() + 1).padStart(2, "0");
   const dia = String(hoje.getDate()).padStart(2, "0");




   bookingDate.min = `${ano}-${mes}-${dia}`;
}








// Abre o formulário ao clicar em Consultar reparo
document.querySelectorAll("[data-service]").forEach(botao => {
   botao.addEventListener("click", event => {
       event.preventDefault();




       servicoAtual = botao.dataset.service || "Avaliação de aparelho";




       if (selectedService) {
           selectedService.textContent = servicoAtual;
       }




       if (bookingModal) {
           bookingModal.classList.add("active");
           bookingModal.setAttribute("aria-hidden", "false");
           document.body.classList.add("booking-open");




           const campoNome = document.getElementById("bookingName");




           if (campoNome) {
               setTimeout(() => campoNome.focus(), 150);
           }
       }
   });
});








// Fecha o formulário
function fecharAgendamento() {
   if (!bookingModal) return;




   bookingModal.classList.remove("active");
   bookingModal.setAttribute("aria-hidden", "true");
   document.body.classList.remove("booking-open");
}




if (closeBooking) {
   closeBooking.addEventListener("click", fecharAgendamento);
}








// Fecha ao clicar fora do formulário
if (bookingModal) {
   bookingModal.addEventListener("click", event => {
       if (event.target === bookingModal) {
           fecharAgendamento();
       }
   });
}








// Fecha ao apertar ESC
document.addEventListener("keydown", event => {
   if (event.key === "Escape") {
       fecharAgendamento();
   }
});








/* =========================================
  ENVIO DO AGENDAMENTO PELO WHATSAPP
========================================= */




if (bookingForm) {
   bookingForm.addEventListener("submit", event => {
       event.preventDefault();




       const nome = document.getElementById("bookingName")?.value.trim();
       const telefone = document.getElementById("bookingPhone")?.value.trim();
       const aparelho = document.getElementById("bookingDevice")?.value.trim();
       const data = document.getElementById("bookingDate")?.value;
       const horario = document.getElementById("bookingTime")?.value;
       const problema = document.getElementById("bookingProblem")?.value.trim();




       if (!nome || !telefone || !aparelho || !data || !horario) {
           alert("Por favor, preencha todos os campos obrigatórios.");
           return;
       }




       // Evita datas anteriores ao dia atual
       const dataSelecionada = new Date(`${data}T00:00:00`);
       const hoje = new Date();
       hoje.setHours(0, 0, 0, 0);




       if (dataSelecionada < hoje) {
           alert("Escolha uma data igual ou posterior a hoje.");
           return;
       }




       // Formata a data para o padrão brasileiro
       const dataFormatada = dataSelecionada.toLocaleDateString("pt-BR");




       const mensagem = `
Olá! Gostaria de solicitar um agendamento na LQTech Assistência.




*DADOS DO CLIENTE*
Nome: ${nome}
Telefone: ${telefone}




*DADOS DO APARELHO*
Modelo: ${aparelho}
Serviço: ${servicoAtual}




*AGENDAMENTO*
Data desejada: ${dataFormatada}
Horário desejado: ${horario}




*DESCRIÇÃO DO PROBLEMA*
${problema || "Não informado"}




Aguardo a confirmação do atendimento. Obrigado!
       `.trim();




       abrirWhatsApp(mensagem);
   });
}











