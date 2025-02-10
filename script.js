async function sendMessage() {
    let inputField = document.getElementById("userInput");
    let chatbox = document.getElementById("chatbox");
    let userMessage = inputField.value.trim();

    if (userMessage === "") return;

    chatbox.innerHTML += `<div class="message user">${userMessage}</div>`;
    inputField.value = "";

    let botResponse = await getFatwa(userMessage);
    
    setTimeout(() => {
        chatbox.innerHTML += `<div class="message bot">${botResponse}</div>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 1000);
}

async function getFatwa(query) {
    let sites = [
        "https://www.islamweb.net/ar/search/index.php?page=1&srchwords=",
        "https://binbaz.org.sa/search?query=",
        "https://binothaimeen.net/content/Search?search_text=",
        "https://islamqa.info/ar/search?q="
    ];
    
    let responses = [];

    for (let site of sites) {
        let searchUrl = site + encodeURIComponent(query);
        try {
            let response = await fetch(searchUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
            let text = await response.text();
            
            let firstMatch = text.match(/<h2[^>]*><a href="([^"]+)"[^>]*>(.*?)<\/a>/);
            if (firstMatch) {
                responses.push(`<a href="${firstMatch[1]}" target="_blank">${firstMatch[2]}</a>`);
            }
        } catch (error) {
            console.log("خطأ في جلب البيانات من:", site);
        }
    }

    return responses.length ? responses.join("<br>") : "لم يتم العثور على إجابة، حاول سؤال العلماء.";
}