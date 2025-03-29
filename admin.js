let questions = JSON.parse(localStorage.getItem("questions")) || [];

function addQuestion() {
    const questionText = document.getElementById('question-input').value;
    const option1 = document.getElementById('option1').value;
    const option2 = document.getElementById('option2').value;
    const option3 = document.getElementById('option3').value;
    const option4 = document// Firebase Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

        const firebaseConfig = {
            apiKey: "AIzaSyAdvbkZaLSJsJlaAkURHACbt2cJtemBa5U",
            authDomain: "quiz-app-e8d1d.firebaseapp.com",
            projectId: "quiz-app-e8d1d",
            storageBucket: "quiz-app-e8d1d.appspot.com",
            messagingSenderId: "421848385039",
            appId: "1:421848385039:web:cbb560cf9d839752ce457a"
        };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addQuestion() {
    const questionText = document.getElementById('question-input').value;
    const option1 = document.getElementById('option1').value;
    const option2 = document.getElementById('option2').value;
    const option3 = document.getElementById('option3').value;
    const option4 = document.getElementById('option4').value;
    const correctAnswer = document.getElementById('correct-answer').value;

    if (questionText && option1 && option2 && option3 && option4 && correctAnswer) {
        try {
            await addDoc(collection(db, "quizQuestions"), {
                question: questionText,
                options: [option1, option2, option3, option4],
                correct: correctAnswer
            });

            alert("✅ Question added to Firebase!");
        } catch (error) {
            console.error("❌ Error adding question:", error);
            alert("Failed to save question.");
        }
    } else {
        alert("⚠️ Please fill in all fields!");
    }
}

// Display Questions from Firebase
async function displayQuestions() {
    const questionList = document.getElementById("question-list");
    questionList.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "quizQuestions"));
    querySnapshot.forEach((doc) => {
        let li = document.createElement("li");
        li.innerText = `${doc.data().question}`;
        questionList.appendChild(li);
    });
}

// Call displayQuestions when the page loads
window.onload = displayQuestions;
.getElementById('option4').value;
    const correctAnswer = document.getElementById('correct-answer').value;

    if (questionText && option1 && option2 && option3 && option4 && correctAnswer) {
        questions.push({
            question: questionText,
            options: [option1, option2, option3, option4],
            correct: correctAnswer
        });

        localStorage.setItem("questions", JSON.stringify(questions));

        // Clear input fields
        document.getElementById('question-input').value = "";
        document.getElementById('option1').value = "";
        document.getElementById('option2').value = "";
        document.getElementById('option3').value = "";
        document.getElementById('option4').value = "";
        document.getElementById('correct-answer').value = "";

        displayQuestions();
        alert("Question added successfully!");
    } else {
        alert("Please fill in all fields!");
    }
}

function displayQuestions() {
    const questionList = document.getElementById("question-list");
    questionList.innerHTML = "";
    questions.forEach((q, index) => {
        let li = document.createElement("li");
        li.innerText = `${index + 1}. ${q.question}`;
        questionList.appendChild(li);
    });
}

function clearQuestions() {
    localStorage.removeItem("questions");
    questions = [];
    displayQuestions();
    alert("All questions cleared!");
}

window.onload = displayQuestions;
