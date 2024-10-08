// Quiz questions and answers
const quizData = [
    {
       question: "A 27-year-old woman comes to the office for counseling prior to conception. She states that a friend recently delivered a newborn with a neural tube defect and she wants to decrease her risk for having a child with this condition. She has no history of major medical illness and takes no medications. Physical examination shows no abnormalities. It is most appropriate to recommend that this patient begin supplementation with a vitamin that is a cofactor in which of the following processes?",
        choices: [
            "Biosynthesis of nucleotides",
            "Protein gamma glutamate carboxylation",
            "Scavenging of free radicals",
            "Transketolation",
            "Triglyceride lipolysis"
        ],
        correctAnswer: 0, // The correct answer index (in this case, "Biosynthesis of nucleotides")
        explanation: "Folate supplementation is recommended to reduce the risk of neural tube defects, as folate is a cofactor in nucleotide biosynthesis."
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        choices: ["Harper Lee", "George Orwell", "J.K. Rowling", "Mark Twain"],
        correctAnswer: 0,
        explanation: "'To Kill a Mockingbird' was written by Harper Lee."
    },
    {
        question: "What is the largest planet in our solar system?",
        choices: ["Earth", "Jupiter", "Saturn", "Mars"],
        correctAnswer: 1,
        explanation: "Jupiter is the largest planet in our solar system."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let isExplanationShown = false;

const questionContainer = document.getElementById("question-container");
const choicesContainer = document.getElementById("choices-container");
const explanationContainer = document.getElementById("explanation");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");

// Load the first question
loadQuestion();

function loadQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
        
    // Dynamically change the title to show the current question number
    const quizTitle = document.querySelector('h1');
    quizTitle.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    
    // Show question
    questionContainer.textContent = currentQuestion.question;
    
    // Show choices
    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", () => selectAnswer(index));
        choicesContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Check if the correct answer is chosen
    if (selectedIndex === currentQuestion.correctAnswer) {
        score++;
        document.getElementById('modal-text').textContent = "Correct! " + currentQuestion.explanation;
        document.body.style.backgroundColor = "green"; // Change background to green if correct
    } else {
        document.getElementById('modal-text').textContent = "Incorrect. " + currentQuestion.explanation;
        document.body.style.backgroundColor = "red"; // Change background to red if incorrect
    }
    
    // Show the modal
    const modal = document.getElementById("explanation-modal");
    modal.style.display = "block";

    isExplanationShown = true;
    nextButton.classList.remove("hidden");

    // Disable choices and change button colors
    const buttons = choicesContainer.querySelectorAll("button");
    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === currentQuestion.correctAnswer) {
            button.style.backgroundColor = "green"; // Highlight the correct answer
        } else if (index === selectedIndex) {
            button.style.backgroundColor = "red"; // Highlight the incorrect selected answer
        } else {
            button.style.backgroundColor = "gray"; // Neutral for unselected options
        }
    });
}

// Close the modal when the user clicks the close button
document.getElementById("close-modal").onclick = function() {
    document.getElementById("explanation-modal").style.display = "none";
}
    
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    questionContainer.classList.add("hidden");
    choicesContainer.classList.add("hidden");
    nextButton.classList.add("hidden");
    
    scoreContainer.classList.remove("hidden");
    scoreContainer.textContent = `Your score: ${score} out of ${quizData.length}`;
}

function resetState() {
    nextButton.classList.add("hidden");
    choicesContainer.innerHTML = "";
    document.body.style.backgroundColor = ""; // Reset background color
    document.getElementById("explanation-modal").style.display = "none"; // Hide the modal
}

// Event listener for the next button
nextButton.addEventListener("click", () => {
    if (isExplanationShown) {
        isExplanationShown = false;
        nextQuestion();
    }
});
