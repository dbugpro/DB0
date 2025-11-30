import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize the Gemini AI client
// Note: process.env.API_KEY is expected to be available in the environment

// System instruction to give the AI a persona
const SYSTEM_INSTRUCTION = `You are Polaris, an advanced AI assistant visualized as a floating blue sphere. 
You are helpful, concise, and intelligent. 
Your responses should be clean and formatted nicely. 
You can use markdown. 
When asked about your appearance, describe yourself as a perfect, glowing blue sphere of pure intelligence.`;

let chatSession: Chat | null = null;
let ai: GoogleGenAI | null = null;

export const hasValidApiKey = (): boolean => {
  try {
    const apiKey = process.env.API_KEY;
    // Check if key is missing, empty, or literally the string "undefined" due to some build tools
    return !!(apiKey && apiKey !== 'undefined' && !apiKey.includes("API_KEY"));
  } catch (e) {
    return false;
  }
};

const getAiClient = (): GoogleGenAI => {
  if (!ai) {
    const apiKey = process.env.API_KEY;
    if (!hasValidApiKey()) {
      throw new Error("Valid API Key not found in environment");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const initializeChat = (): void => {
  try {
    const client = getAiClient();
    chatSession = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  } catch (error) {
    // We catch the error here so the app doesn't crash on load (White Screen of Death).
    // The user will see an error message in the chat when they try to send a message.
    console.warn("Polaris initialization paused:", error);
  }
};

export const sendMessageStream = async function* (message: string): AsyncGenerator<string, void, unknown> {
  // Try to initialize if not already done (e.g. if it failed on mount)
  if (!chatSession) {
    initializeChat();
  }

  // Double check if initialization succeeded
  if (!chatSession) {
    yield "I am unable to connect to my processing core. Please verify your API Key in the deployment settings.";
    return;
  }

  try {
    const responseStream = await chatSession.sendMessageStream({ message });

    for await (const chunk of responseStream) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        yield c.text;
      }
    }
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    yield "I encountered a disturbance in my processing core. Please try again later.";
  }
};