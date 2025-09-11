// Banco de perguntas
const perguntas = [
  {
    enunciado: "O que é Inteligência Artificial (IA)?",
    alternativas: [
      { texto: "Um sistema que simula a inteligência humana em máquinas.", correta: true, explicacao: "IA é a tecnologia que simula a inteligência humana para executar tarefas como aprender, reconhecer padrões e tomar decisões, sem ter consciência própria." },
      { texto: "Um tipo de vírus que afeta apenas robôs.", correta: false, explicacao: "Um vírus é um software malicioso que invade sistemas, não descreve IA." }
    ]
  },
  {
    enunciado: "Qual dessas tarefas pode ser feita por uma IA?",
    alternativas: [
      { texto: "Pintar um quadro com sentimentos humanos.", correta: false, explicacao: "IA não tem sentimentos, só pode simular padrões." },
      { texto: "Reconhecer rostos em imagens automaticamente.", correta: true, explicacao: "IA é amplamente usada em reconhecimento facial." }
    ]
  },
  {
    enunciado: "O ChatGPT é um exemplo de quê?",
    alternativas: [
      { texto: "Uma IA especializada em linguagem natural.", correta: true, explicacao: "O ChatGPT é um modelo de linguagem treinado para compreender e gerar textos." },
      { texto: "Um programa para criar vídeos 3D.", correta: false, explicacao: "O ChatGPT trabalha apenas com texto e linguagem." }
    ]
  },
  {
    enunciado: "IA pode aprender com dados. Isso significa que ela:",
    alternativas: [
      { texto: "Fica mais inteligente toda vez que é reiniciada.", correta: false, explicacao: "Reiniciar não ensina nada para uma IA." },
      { texto: "Melhora seu desempenho analisando padrões nos dados.", correta: true, explicacao: "Ela aprende com dados, ajustando seus modelos." }
    ]
  },
  {
    enunciado: "Qual das opções é um risco possível do uso irresponsável da IA?",
    alternativas: [
      { texto: "Tornar as pessoas mais felizes automaticamente.", correta: false, explicacao: "IA não pode garantir felicidade humana." },
      { texto: "Tomar decisões injustas ou enviesadas.", correta: true, explicacao: "Dados enviesados podem gerar discriminação." }
    ]
  },
  {
    enunciado: "IA precisa ser treinada. Isso quer dizer que:",
    alternativas: [
      { texto: "Ela aprende sozinha sem qualquer informação anterior.", correta: false, explicacao: "IA precisa de dados para aprender." },
      { texto: "Ela precisa de dados e exemplos para aprender.", correta: true, explicacao: "IA só aprende recebendo dados e exemplos." }
    ]
  }
];

let progresso = 0;
let acertos = 0;
let respostas = Array(perguntas.length).fill(null);

// Inicializa botões no menu
function carregarMenu() {
  const container = document.getElementById("question-buttons");
  container.innerHTML = "";
  perguntas.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.innerText = i + 1;
    btn.classList.add("question-btn");
    if (respostas[i] === true) btn.classList.add("correct");
    if (respostas[i] === false) btn.classList.add("wrong");
    btn.onclick = () => abrirPergunta(i);
    container.appendChild(btn);
  });
  atualizarProgresso();
}

// Atualiza progresso
function atualizarProgresso() {
  const total = perguntas.length;
  progresso = (acertos / total) * 100;
  document.getElementById("progress-bar").style.width = `${progresso}%`;
  document.getElementById("progress-text").innerText = `${progresso.toFixed(2)}%`;
}

// Abre uma pergunta
function abrirPergunta(index) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("quiz").classList.add("active");

  const pergunta = perguntas[index];
  document.getElementById("quiz-title").innerText = `Pergunta ${index + 1} de ${perguntas.length}`;
  document.getElementById("quiz-question").innerText = pergunta.enunciado;

  const opcoes = document.getElementById("quiz-options");
  opcoes.innerHTML = "";
  pergunta.alternativas.forEach((alt, i) => {
    const btn = document.createElement("button");
    btn.innerText = alt.texto;
    btn.onclick = () => responder(index, alt);
    opcoes.appendChild(btn);
  });

  document.getElementById("quiz-feedback").innerText = "";
}

// Responde a pergunta
function responder(index, alternativa) {
  respostas[index] = alternativa.correta;
  if (alternativa.correta) acertos++;

  const feedback = document.getElementById("quiz-feedback");
  feedback.innerText = alternativa.explicacao;

  const botoes = document.querySelectorAll("#quiz-options button");
  botoes.forEach((b, i) => {
    if (perguntas[index].alternativas[i].correta) b.classList.add("correct-option");
    else b.classList.add("wrong-option");
    b.disabled = true;
  });

  carregarMenu();
}

// Volta ao menu
function voltarMenu() {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("menu").classList.add("active");
}

// Finaliza quiz
document.getElementById("finalizar").onclick = () => {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("resultado").classList.add("active");

  const total = perguntas.length;
  const score = `${acertos} de ${total}`;
  document.getElementById("score").innerText = `Você acertou ${score} questões`;

  const percent = (acertos / total) * 100;
  document.getElementById("final-progress-bar").style.width = `${percent}%`;
  document.getElementById("final-progress-text").innerText = `${percent.toFixed(2)}%`;

  let mensagem = "";
  if (acertos <= 2) mensagem = "Iniciante em IA 🤖 — Ainda há muito a explorar!";
  else if (acertos <= 4) mensagem = "Bom entendedor 💡 — Você já sabe bastante, mas pode melhorar!";
  else if (acertos == 5) mensagem = "Quase mestre 🚀 — Está no caminho certo!";
  else mensagem = "Mestre da IA 🏆 — Você acertou tudo!";
  document.getElementById("mensagem-final").innerText = mensagem;

  // Resumo de erros
  const resumo = document.getElementById("resumo");
  resumo.innerHTML = "";
  perguntas.forEach((p, i) => {
    const item = document.createElement("p");
    const icone = respostas[i] ? "✅" : "❌";
    const correta = p.alternativas.find(a => a.correta).texto;
    item.innerText = `${icone} Pergunta ${i + 1}: ${p.enunciado}\n→ Resposta correta: ${correta}`;
    resumo.appendChild(item);
  });
};

// Refaz quiz
function refazerQuiz() {
  progresso = 0;
  acertos = 0;
  respostas.fill(null);
  carregarMenu();
  voltarMenu();
}

// Inicia
carregarMenu();
