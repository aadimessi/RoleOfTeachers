import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ✅ 1. Initialize Firebase (Add your Firebase config)
const firebaseConfig = {
            apiKey: "AIzaSyAdvbkZaLSJsJlaAkURHACbt2cJtemBa5U",
            authDomain: "quiz-app-e8d1d.firebaseapp.com",
            projectId: "quiz-app-e8d1d",
            storageBucket: "quiz-aplet questions = [];
let currentQuestionIndex = 0;
let selectedOption = null;
let score = 0;

// ✅ 1. Load Questions from Firestore
async function loadQuestions() {
    try {
        console.log("🔄 Fetching questions from Firebase...");
        
        const snapshot = await db.collection("quizQuestions").get();
        
        if (snapshot.empty) {
            console.warn("⚠️ No questions found in Firestore.");
            document.querySelector(".quiz-container").innerHTML = `<h2>No questions available. Please ask your teacher to set the questions.</h2>`;
            return;
        }

        // ✅ Store fetched questions in the global array
        questions = snapshot.docs.map(doc => doc.data());

        console.log("✅ Fetched Questions:", questions);

        if (questions.length === 0) {
            console.error("⚠️ Error: No questions were loaded from Firestore.");
            return;
        }

        // ✅ Load the first question
        currentQuestionIndex = 0;
        loadQuestion();
    } catch (error) {
        console.error("❌ Error fetching questions:", error);
    }
}

// ✅ 2. Load a Question
function loadQuestion() {
    console.log("Current Question Index:", currentQuestionIndex);

    if (!questions || questions.length === 0) {
        document.querySelector(".quiz-container").innerHTML = `<h2>No questions available. Please ask your teacher to set the questions.</h2>`;
        return;
    }

    if (currentQuestionIndex >= questions.length) {
        showFinalScore();
        return;
    }

    let currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion || !currentQuestion.question) {
        console.error("❌ Error: Question data is missing!", currentQuestion);
        return;
    }

    let questionElement = document.getElementById('question');
    let optionsContainer = document.getElementById('options');

    questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    optionsContainer.innerHTML = ""; // Clear previous options
    selectedOption = null; // Reset selected option

    currentQuestion.options.forEach(optionText => {
        let button = document.createElement('button');
        button.innerText = optionText;
        button.classList.add('option');
        
        button.onclick = function() {
            document.querySelectorAll('.option').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedOption = optionText;  // ✅ Capture the selected option
            console.log("✅ Selected Option:", selectedOption);
        };

        optionsContainer.appendChild(button);
    });

    document.getElementById('result').innerText = "";
}

function checkAnswer() {
    let currentQuestion = questions[currentQuestionIndex];

    if (!selectedOption) {
        alert("Please select an option!");
        return;
    }

    console.log("🚀 Selected Option (raw):", selectedOption);
    console.log("🏆 Correct Answer (raw):", currentQuestion.correctAnswer);

    // Normalize strings: trim spaces and make them lowercase
    let normalizedSelectedOption = selectedOption.trim().toLowerCase();
    let normalizedCorrectAnswer = currentQuestion.correctAnswer.trim().toLowerCase();

    console.log("🔍 Selected Option (normalized):", normalizedSelectedOption);
    console.log("✅ Correct Answer (normalized):", normalizedCorrectAnswer);

    if (normalizedSelectedOption === normalizedCorrectAnswer) {
        score++;
        console.log("🎉 Correct!");
    } else {
        console.log("❌ Incorrect.");
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}


// ✅ 4. Show Final Score
function showFinalScore() {
    document.querySelector(".quiz-container").innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your Score: ${score} / ${questions.length}</p>
    `;
}
p-e8d1d.firebasestorage.app",
            messagingSenderId: "421848385039",
            appId: "1:421848385039:web:cbb560cf9d839752ce457a",
            measurementId: "G-MBCSZVWMZP"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // Firestore reference

// ✅ 2. Declare Global Variables
let questions = [];
let currentQuestionIndex = 0;
let selectedOption = null;
let score = 0;

// ✅ 3. Fetch Questions from Firestore (Your function here)
import { getDocs, collection } from "firebase/firestore";  // ✅ Import Firestore functions

async function loadQuestions() {
    try {
        console.log("🔄 Fetching questions from Firebase...");

        const querySnapshot = await getDocs(collection(db, "quizQuestions")).get();  // ✅ Use getDocs()
        
        if (querySnapshot.empty) {
            console.warn("⚠️ No questions found in Firestore.");
            document.querySelector(".quiz-container").innerHTML = `<h2>No questions available. Please ask your teacher to set the questions.</h2>`;
            return;
        }

        // ✅ Store fetched questions in the global array
        questions = querySnapshot.docs.map(doc => doc.data());
        console.log("✅ Fetched Questions:", questions);

        if (questions.length === 0) {
            console.error("⚠️ Error: No questions were loaded from Firestore.");
            return;
        }

        // ✅ Load the first question
        currentQuestionIndex = 0;
        loadQuestion();
    } catch (error) {
        console.error("❌ Error fetching questions:", error);
    }
}

// ✅ 4. Function to Load a Question
function loadQuestion() {
    console.log("Current Question Index:", currentQuestionIndex);

    if (!questions || questions.length === 0) {
        document.querySelector(".quiz-container").innerHTML = `<h2>No questions available. Please ask your teacher to set the questions.</h2>`;
        return;
    }

    if (currentQuestionIndex >= questions.length) {
        showFinalScore();
        return;
    }

    let currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion || !currentQuestion.question) {
        console.error("❌ Error: Question data is missing!", currentQuestion);
        return;
    }

    let questionElement = document.getElementById('question');
    let optionsContainer = document.getElementById('options');

    questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    optionsContainer.innerHTML = ""; // Clear previous options

    currentQuestion.options.forEach(optionText => {
        let button = document.createElement('button');
        button.innerText = optionText;
        button.classList.add('option');
        button.onclick = function() {
            document.querySelectorAll('.option').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedOption = optionText;
        };
        optionsContainer.appendChild(button);
    });

    document.getElementById('result').innerText = "";
}

// ✅ 5. Load Questions when Page Loads
window.onload = function () {
    console.log("🔄 Initializing Quiz...");
    loadQuestions(); // Fetch from Firebase instead of localStorage
};

function submitAnswer() {
    if (!selectedOption) {
        document.getElementById('result').innerText = "Please select an option!";
        return;
    }

    let currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.correct) {
        score++;
        document.getElementById('result').innerText = "✅ Correct!";
        document.getElementById('result').style.color = "green";
    } else {
        document.getElementById('result').innerText = `❌ Wrong! The correct answer is: ${currentQuestion.correct}`;
        document.getElementById('result').style.color = "red";
    }

    // Move to the next question after a short delay
    setTimeout(() => {
        currentQuestionIndex++;
        selectedOption = null;
        loadQuestion();
    }, 1000);
}

function showFinalScore() {
    setTimeout(() => {
        alert(`🎉 Quiz Completed!\nYour Score: ${score} / ${questions.length}`);

        // Optional: Redirect to another page
        window.location.href = "thankyou.html";  

        // Optional: Close the window (depends on browser settings)
        let userConfirmed = confirm("Click OK to close the page.");
        if (userConfirmed) {
            window.open('', '_self').close();
        }
    }, 500);
}

// Ensure the first question loads when the page loads
window.onload = function() {
    console.log("🔄 Initializing Quiz...");
    loadQuestion();
};
