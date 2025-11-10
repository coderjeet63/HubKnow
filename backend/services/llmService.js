const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize Gemini with the updated model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // ← updated

async function summarizeWithGemini(content) {
  const prompt = `Summarize the following article content in three concise bullet points:\n\n${content}`;
  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("❌ Error summarizing with Gemini:", error);
    return "Failed to summarize content using Gemini.";
  }
}

// --- Swappable Logic ---
async function summarizeWithLLM(content, provider = 'gemini') {
  switch (provider.toLowerCase()) {
    case 'gemini':
      return await summarizeWithGemini(content);
    case 'openai':
      return await summarizeWithOpenAI(content);
    default:
      throw new Error(`Unsupported LLM provider: ${provider}. Use 'gemini' or 'openai'.`);
  }
}

module.exports = { summarizeWithLLM };
