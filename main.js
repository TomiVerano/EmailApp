// // Replace this with your actual API Gateway invoke URL
// const apiUrl = "https://iw650z8cg0.execute-api.eu-north-1.amazonaws.com/prod";
//
// const responseBox = document.getElementById("response");
//
// document.getElementById("submit").addEventListener("click", async () => {
//     const name = document.getElementById("name").value.trim();
//     const phone = document.getElementById("phone").value.trim();
//     const email = document.getElementById("email").value.trim();
//
//     if (!name || !phone || !email) {
//         alert("Please enter name, email and phone.");
//         return;
//     }
//
//     const payload = { name, phone, email };
//     responseBox.textContent = "⏳ Sending request...";
//
//     try {
//         const res = await fetch(apiUrl, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload)
//         });
//
//         const text = await res.text();
//         console.log("Server response:", text);
//         responseBox.textContent = "✅ Your email has been saved.";
//     } catch (err) {
//         responseBox.textContent = "❌ Error: " + err.message;
//     }
// });

// Replace this with your actual API Gateway invoke URL
const apiUrl = "https://iw650z8cg0.execute-api.eu-north-1.amazonaws.com/prod";

document.getElementById("submit").addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !phone || !email) {
        alert("Please enter name, email and phone.");
        return;
    }

    const payload = { name, phone, email };

    try {
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            // Redirect to thankyou.html (same directory)
            window.location.href = "thank-you.html";
        } else {
            const text = await res.text();
            alert("❌ Error: " + text);
        }
    } catch (err) {
        alert("❌ Error: " + err.message);
    }
});

