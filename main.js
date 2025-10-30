function selectQuiz(num) {
  const quizzes = document.querySelectorAll(".quiz-item");
  quizzes.forEach(q => q.querySelector(".checkmark").style.display = "none");

  const selected = quizzes[num - 1];
  selected.querySelector(".checkmark").style.display = "block";

  // Atualiza progresso (1 de 6 = 16.67%)
  const progress = (num / quizzes.length) * 100;
  document.querySelector(".progress-bar").style.width = progress + "%";
  document.querySelector(".progress-text").innerText = progress.toFixed(2) + "%";
}

localStorage.setItem("resultado_pergunta1", resultado); // na pergunta 1
localStorage.setItem("resultado_pergunta2", resultado); // na pergunta 2
localStorage.setItem("resultado_pergunta3", resultado); // e assim por diante

