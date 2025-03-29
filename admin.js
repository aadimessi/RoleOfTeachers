// 🔹 Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAdvbkZaLSJsJlaAkURHACbt2cJtemBa5U",
    authDomain: "quiz-app-e8d1d.firebaseapp.com",
    projectId: "quiz-app-e8d1d",
    storageBucket: "quiz-app-e8d1d.appspot.com",
    messagingSenderId: "421848385039",
    appId: "1:421848385039:web:cbb560cf9d839752ce457a"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Function to Add Question to Firestore
async function addQuestion() {
    const questionText = document.getElementById('question-input').value.trim();
    const option1 = document.getElementById('option1').value.trim();
    const option2 = document.getElementById('option2').value.trim();
    const option3 = document.getElementById('option3').value.trim();
    const option4 = document.getElementById('option4').value.trim();
    const correctAnswer = document.getElementById('correct-answer').value;

    if (!questionText || !option1 || !option2 || !option3 || !option4) {
        alert("⚠️ Please fill in all fields!");
        return;
    }

    try {
        await addDoc(collection(db, "quizQuestions"), {
            question: questionText,
            options: [option1, option2, option3, option4],
            correct: correctAnswer
        });

        alert("✅ Question added to Firebase!");
        clearInputFields();
        displayQuestions(); // Refresh displayed questions
    } catch (error) {
        console.error("❌ Error adding question:", error);
        alert("Failed to save question.");
    }
}

// 🔹 Function to Display Questions from Firebase
async function displayQuestions() {
    const questionList = document.getElementById("question-list");
    questionList.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "quizQuestions"));
    querySnapshot.forEach((doc) => {
        let li = document.createElement("li");
        li.innerText = doc.data().question;
        questionList.appendChild(li);
    });
}

// 🔹 Function to Clear Input Fields
function clearInputFields() {
    document.getElementById('question-input').value = "";
    document.getElementById('option1').value = "";
    document.getElementById('option2').value = "";
    document.getElementById('option3').value = "";
    document.getElementById('option4').value = "";
    document.getElementById('correct-answer').selectedIndex = 0;
}

// 🔹 Event Listeners
document.getElementById("saveQuestionBtn").addEventListener("click", addQuestion);

// 🔹 Call `displayQuestions` on Page Load
window.onload = displayQuestions;
