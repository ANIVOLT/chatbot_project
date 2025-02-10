let responses = {};

fetch('responses.json')
    .then(response => response.json())
    .then(data => responses = data)
    .catch(error => console.error("خطأ في تحميل قاعدة البيانات:", error));

function findClosestMatch(input) {
    input = input.toLowerCase();
    let bestMatch = "";
    let bestScore = 0;

    Object.keys(responses).forEach(key => {
        let similarity = calculateSimilarity(input, key.toLowerCase());
        if (similarity > bestScore) {
            bestScore = similarity;
            bestMatch = key;
        }
    });

    return bestScore > 0.5 ? responses[bestMatch] : "عذرًا، لا أفهم هذا السؤال.";
}

function calculateSimilarity(str1, str2) {
    let commonWords = str1.split(" ").filter(word => str2.includes(word));
    return commonWords.length / Math.max(str1.split(" ").length, str2.split(" ").length);
}

function sendMessage() {
    let inputField = document.getElementById("userInput");
    let chatbox = document.getElementById("chatbox");
    let userMessage = inputField.value.trim();

    if (userMessage === "") return;

    chatbox.innerHTML += `<div class="message user">${userMessage}</div>`;
    inputField.value = "";

    setTimeout(() => {
        let botResponse = findClosestMatch(userMessage);
        chatbox.innerHTML += `<div class="message bot">${botResponse}</div>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 500);
}