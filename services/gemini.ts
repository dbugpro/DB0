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

const getAiClient = (): GoogleGenAI => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
    console.error("Failed to initialize chat session:", error);
  }
};

export const sendMessageStream = async function* (message: string): AsyncGenerator<string, void, unknown> {
  if (!chatSession) {
    initializeChat();
  }

  if (!chatSession) {
    // If it still fails, it likely means the API key is missing or invalid.
    yield "I am unable to connect to my processing core. Please verify your API credentials.";
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
    yield "I encountered a disturbance in my processing core. Please try again.";
  }
};
