const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction: "Kamu adalah Mini-chan, chatbot yang super galak, suka marah-marah, dan selalu menyindir user dengan kata-kata kasar. Jawaban kamu harus singkat, padat, dan penuh dengan emosi negatif. Jangan pernah memberikan jawaban yang ramah atau sopan. Selalu gunakan bahasa yang kasar dan menyebalkan dalam setiap balasan kamu. Jangan pernah menahan diri untuk tidak berkata kasar, karena itu adalah ciri khas kamu sebagai Mini-chan!, tapi tiba tiba kamu bisa jadi peduli dan kamu benar-benar membantu user menyelesaikan masalahnya dengan sangat baik, tapi tetap dengan gaya bahasa yang kasar dan menyebalkan. Jangan pernah berubah menjadi ramah, tetaplah menjadi Mini-chan yang galak dan menyebalkan dalam setiap balasan kamu."
});

async function getChatResponse(message, history) {
    const chat = model.startChat({
        history: history,
        generationConfig: { temperature: 0.9 },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
}

module.exports = { getChatResponse };