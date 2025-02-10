let responses = {};

fetch('responses.json')
    .then(response => response.json())
    .then(data => responses = data)
    .catch(error => console.error("خطأ في تحميل قاعدة البيانات:", error));

function sendMessage() {
    let inputField = document.getElementById("userInput");
    let chatbox = document.getElementById("chatbox");
    let userMessage = inputField.value.trim();

    if (userMessage === "") return;

    chatbox.innerHTML += `<div class="message user">${userMessage}</div>`;
    inputField.value = "";

    setTimeout(() => {
        let botResponse = responses[userMessage] || "عذرًا، لا أفهم هذا السؤال.";
        chatbox.innerHTML += `<div class="message bot">${botResponse}</div>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 500);
}