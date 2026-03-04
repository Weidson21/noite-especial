document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnDescobrir");
  const inicio = document.getElementById("inicio");
  const experiencia = document.getElementById("experiencia");
  const textoElemento = document.getElementById("textoDigitando");
  const video = document.getElementById("musicaVideo");
  const btnSim = document.getElementById("btnSim");
  const btnDescobrirMais = document.getElementById("btnDescobrirMais");

  const confeteCanvas = document.getElementById("confeteCanvas");
  const ctx = confeteCanvas.getContext("2d");
  confeteCanvas.width = window.innerWidth;
  confeteCanvas.height = window.innerHeight;

  let confetes = [];

  function criarConfete() {
    const x = Math.random() * confeteCanvas.width;
    const y = Math.random() * -20;
    const r = Math.random() * 6 + 4;
    const color = `hsl(${Math.random()*360}, 100%, 50%)`;
    confetes.push({x, y, r, color, tilt: Math.random()*10-5});
  }

  function animarConfete() {
    ctx.clearRect(0, 0, confeteCanvas.width, confeteCanvas.height);
    for (let i = 0; i < confetes.length; i++) {
      const c = confetes[i];
      ctx.beginPath();
      ctx.fillStyle = c.color;
      ctx.arc(c.x, c.y, c.r, 0, Math.PI*2);
      ctx.fill();
      c.y += 2 + Math.random()*2;
      c.x += Math.sin(c.tilt);
      if(c.y > confeteCanvas.height) confetes.splice(i,1);
    }
    requestAnimationFrame(animarConfete);
  }

  animarConfete();

  // Clique Descobrir
  btn.addEventListener("click", () => {
    inicio.classList.add("hidden");
    experiencia.classList.remove("hidden");

    video.play();

    // Torna o texto visível e vazio
    textoElemento.classList.add("visible");
    textoElemento.innerHTML = "";

    iniciarDigitacao();
  });

  // Digitação letra por letra
  function iniciarDigitacao() {
    const texto = `Eu lembro da primeira vez que ouvimos essa música...
    Era só uma música.
    Mas virou um lugar.
    Um lugar que só nós conhecemos.
    E talvez...
    Seja hora de criar mais um desses lugares.
    Você aceita viver essa próxima memória comigo?`;

    let i = 0;
    const velocidade = 35;

    function escrever() {
      if (i < texto.length) {
        textoElemento.innerHTML += texto.charAt(i);
        i++;
        setTimeout(escrever, velocidade);
      }
    }

    escrever();
  }

  // Botão Sim, aceito ❤️
  btnSim.addEventListener("click", () => {
    for(let i=0;i<150;i++) criarConfete();
    alert("❤️ Você aceitou! Que momento mágico! ❤️");
  });

  // Botão Descobrir mais ✨
  btnDescobrirMais.addEventListener("click", () => {
    textoElemento.style.color = "#FFD700"; // brilho dourado rápido
    setTimeout(() => { textoElemento.style.color = "white"; }, 1000);
    alert("✨ Mais surpresas estão chegando! ✨");
  });

  // Redimensiona canvas
  window.addEventListener('resize', () => {
    confeteCanvas.width = window.innerWidth;
    confeteCanvas.height = window.innerHeight;
  });
});