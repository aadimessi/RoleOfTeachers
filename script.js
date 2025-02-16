// ✅ Initialize Firebase (Add your Firebase config here)
const firebaseConfig = {
            apiKey: "AIzaSyAdvbkZaLSJsJlaAkURHACbt2cJtemBa5U",
            authDomain: "quiz-app-e8d1d.firebaseapp.com",
            projectId: "quiz-app-e8d1d",
            storageBucket: "quiz-app-e8d1d.firebasestorage.app",
            messagingSenderId: "421848385039",
            appId: "1:421848385039:web:cbb560cf9d839752ce457a",
            measurementId: "G-MBCSZVWMZP"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // Get Firestore reference

// ✅ Global variables
let questions = [];
let currentQuestionIndex = 0;
let selectedOption = null;
let score = 0;

// ✅ Function to fetch questions from Firebase
async function loadQuestions() {
    try {
        console.log("🔄 Fetching questions from Firebase...");
        
        const snapshot = await db.collection("quiz_questions").get();
        if (snapshot.empty) {
            document.querySelector(".quiz-container").innerHTML = `<h2>No questions available. Please ask your teacher to set the questions.</h2>`;
            return;
        }

        // ✅ Store fetched questions in the global array
        questions = snapshot.docs.map(doc => doc.data());
        console.log("✅ Fetched Questions:", questions);

        // ✅ Load the first question after fetching
        currentQuestionIndex = 0;
        loadQuestion();
    } catch (error) {
        console.error("❌ Error fetching questions:", error);
    }
}

// ✅ Function to load a question
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

// ✅ Call Firebase function when page loads
window.onload = function () {
    console.log("🔄 Initializing Quiz...");
    loadQuestions(); // 🔥 Fetch from Firebase instead of localStorage
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
