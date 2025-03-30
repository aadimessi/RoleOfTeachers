// 🔹 Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
    const options = [
        document.getElementById('option1').value.trim(),
        document.getElementById('option2').value.trim(),
        document.getElementById('option3').value.trim(),
        document.getElementById('option4').value.trim()
    ];
    const correctAnswerIndex = document.getElementById('correct-answer').value;
    const correctAnswer = options[correctAnswerIndex]; // Store correct answer as text
    const saveButton = document.getElementById("saveQuestionBtn");

    if (!questionText || options.includes("")) {
        alert("⚠️ Please fill in all fields!");
        return;
    }

    saveButton.disabled = true; // Disable button to prevent multiple submissions

    try {
        await addDoc(collection(db, "quizQuestions"), {
            question: questionText,
            options: options,
            correctAnswer: correctAnswer
        });

        alert("✅ Question added successfully!");
        clearInputFields();
        displayQuestions(); // Refresh displayed questions
    } catch (error) {
        console.error("❌ Error adding question:", error);
        alert("Failed to save question.");
    } finally {
        saveButton.disabled = false; // Re-enable button
    }
}

// 🔹 Function to Display Questions from Firebase
async function displayQuestions() {
    const questionList = document.getElementById("question-list");
    questionList.innerHTML = "Loading...";

    try {
        const querySnapshot = await getDocs(collection(db, "quizQuestions"));
        questionList.innerHTML = "";

        querySnapshot.forEach((docSnap) => {
            const questionData = docSnap.data();
            const questionId = docSnap.id;
            let li = document.createElement("li");
            li.innerHTML = `${questionData.question} <button onclick="deleteQuestion('${questionId}')">❌ Delete</button>`;
            questionList.appendChild(li);
        });
    } catch (error) {
        console.error("❌ Error loading questions:", error);
        questionList.innerHTML = "Failed to load questions.";
    }
}

// 🔹 Function to Delete a Question from Firestore
async function deleteQuestion(id) {
    if (!confirm("Are you sure you want to delete this question?")) return;

    try {
        await deleteDoc(doc(db, "quizQuestions", id));
        alert("🗑️ Question deleted successfully!");
        displayQuestions(); // Refresh the list
    } catch (error) {
        console.error("❌ Error deleting question:", error);
        alert("Failed to delete question.");
    }
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
