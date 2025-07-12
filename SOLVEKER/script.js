const questions = [
  {
    question: "Who is a G.O.A.T?",
    answers: [
      { text: "RONALDO", correct: true },
      { text: "MESSI", correct: false },
      { text: "NEYMAR.JR", correct: false },
      { text: "LAMINE YAMAL", correct: false }
    ]
  },
  {
    question: "How many goals has Ronaldo scored?",
    answers: [
      { text: "1000+", correct: true },
      { text: "940", correct: false },
      { text: "900", correct: false },
      { text: "890", correct: false }
    ]
  },
  {
    question: "What is the value of pi?",
    answers: [
      { text: "2.25", correct: false },
      { text: "3.14", correct: true },
      { text: "5.30", correct: false },
      { text: "0", correct: false }
    ]
  }
];

const questionElement = document.querySelector("#questions h2");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    const li = document.createElement("li");
    li.appendChild(button);
    answerButtons.appendChild(li);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
  resultElement.classList.add("hide");
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    score++;
    selectedBtn.style.backgroundColor = "#2ecc71";
  } else {
    selectedBtn.style.backgroundColor = "#e74c3c";
  }

  Array.from(answerButtons.children).forEach(li => {
    const btn = li.firstChild;
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.style.backgroundColor = "#2ecc71";
    }
  });

  nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  resultElement.innerText = `You scored ${score} out of ${questions.length}!`;
  resultElement.classList.remove("hide");
  nextButton.innerText = "Play Again";
  nextButton.style.display = "inline-block";
  nextButton.onclick = startQuiz;
}

startQuiz();