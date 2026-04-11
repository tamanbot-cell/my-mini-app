const API_URL = "https://taman964-api-handler.hf.space/send_code";

// ئەمە فەرمانی دوگمەی یەکەمە (Confirm)
function showStep1() {
    console.log("Confirm clicked");
    const welcomeScreen = document.getElementById('welcome-screen');
    const step1 = document.getElementById('step1');
    
    if (welcomeScreen && step1) {
        welcomeScreen.style.display = 'none';
        step1.style.display = 'block';
    } else {
        // ئەگەر IDـەکان وەک ئەوە نەبن، ئەم ڕێگەیە هەموو شاشەکان دەگۆڕێت
        document.body.innerHTML = document.getElementById('step1').innerHTML;
    }
}

// ئەمە فەرمانی دوگمەی دووەمە (OK)
async function sendData() {
    try {
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: user ? user.id : "Unknown",
                username: user ? user.username : "Guest",
                status: "Clicked OK"
            })
        });
        
        // پیشاندانی لاپەڕەی کۆد
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    } catch (e) {
        // تەنانەت ئەگەر ئینتەرنێتیش نەبوو، با بچێتە لاپەڕەی کۆدەکە
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    }
}
