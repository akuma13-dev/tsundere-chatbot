const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

// History buat memori Mini-chan
let chatHistory = [];

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const message = userInput.value.trim();
    if (!message) return;

    // 1. Tampilkan pesan user di layar
    appendMessage('user', message);
    userInput.value = '';

    // 2. Tampilkan status "mikir"
    const thinkingDiv = appendMessage('bot', 'Mini-chan lagi mikir... Hmph! 💢');

    try {
        // 3. Kirim ke backend (Node.js)
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: message,
                history: chatHistory 
            })
        });

        const data = await response.json();

        // 4. Update status mikir jadi jawaban asli
        thinkingDiv.textContent = data.text;

        // 5. Simpan ke history biar dia inget konteks chat sebelumnya
        chatHistory.push({ role: "user", parts: [{ text: message }] });
        chatHistory.push({ role: "model", parts: [{ text: data.text }] });

    } catch (error) {
        thinkingDiv.textContent = "Duh, koneksinya ampas banget sih! Baka! 💢";
        console.error(error);
    }
});

function appendMessage(role, text) {
    const div = document.createElement('div');
    div.className = `message ${role}`;
    div.textContent = text;
    chatBox.appendChild(div);
    
    // Auto scroll ke bawah
    chatBox.scrollTop = chatBox.scrollHeight;
    return div;
}