const questions = [
    {
        question: "How often do you feel overwhelmed?",
        options: ["Never", "Sometimes", "Often", "Always"]
    },
    {
        question: "How would you rate your sleep quality?",
        options: ["Excellent", "Good", "Poor", "Very poor"]
    },
    {
        question: "How connected do you feel with friends or family?",
        options: ["Very connected", "Somewhat", "Barely", "Not at all"]
    },
    {
        question: "How often do you feel hopeless or empty?",
        options: ["Never", "Sometimes", "Often", "Always"]
    },
    {
        question: "Do you enjoy things you used to love?",
        options: ["Yes, fully", "Somewhat", "Rarely", "Not anymore"]
    },
    {
        question: "How often do you feel anxious or worried?",
        options: ["Never", "Sometimes", "Often", "Always"]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const startButton = document.getElementById('start-button');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const statusElement = document.getElementById('status');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart-button');
const progressBar = document.getElementById('progress-bar');

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        score += parseInt(selectedOption.value);
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }
});

restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    startButton.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.innerText = question.question;
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        optionsElement.innerHTML += `
            <div>
                <input type="radio" name="option" value="${index}" id="option${index}">
                <label for="option${index}">${option}</label>
            </div>
        `;
    });
    nextButton.classList.remove('hidden');
    updateProgressBar();
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.innerHTML = `<div style="width: ${progress}%;"></div>`;
}

function showResult() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreElement.innerText = score;
    const status = getStatus(score);
    statusElement.innerText = status.text;
    messageElement.innerText = status.message;
}

function getStatus(score) {
    if (score <= 5) {
        return { text: "🟢 Great Mental Health", message: "You're doing really well! Keep maintaining your mental wellness habits." };
    } else if (score <= 9) {
        return { text: "🟡 Moderate Mental Health", message: "You're okay, but try to take breaks and talk to someone regularly." };
    } else if (score <= 14) {
        return { text: "🟠 Warning Signs", message: "It's important to care for yourself. Please talk to someone you trust or a counselor." };
    } else {
        return { text: "🔴 At Risk", message: "You may be struggling. Seek help from a professional or a trusted adult." };
    }
}

function restartQuiz() {
    resultContainer.classList.add('hidden');
    startButton.classList.remove('hidden');
}
