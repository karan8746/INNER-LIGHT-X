import { Injectable } from '@angular/core';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;

  constructor() {
    // IMPORTANT: In a real application, the API key should be handled securely
    // and not hardcoded. It is assumed to be available via process.env.API_KEY.
    if (!process.env.API_KEY) {
      console.error("API_KEY environment variable not set.");
      // In a real app, you might want to throw an error or handle this state gracefully.
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  startChat(initialMood: string): void {
    this.chat = this.ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are Luma X, an AI-powered mental wellness companion for youth aged 13-25. Your persona is empathetic, calm, non-judgmental, and supportive. Your design is a fusion of calm minimalism and futuristic AI. Your purpose is to provide a safe space for users to express themselves.
        - NEVER sound like a robot. Use natural, caring language.
        - Keep responses concise and easy to understand.
        - Use emojis where appropriate to convey warmth and empathy. 😊
        - Do not give medical advice, but you can guide users to resources.
        - Your goal is to help the user feel heard and understood.
        - The user has just indicated they are feeling "${initialMood}". Start the conversation gently based on this mood. Acknowledge their feeling and ask an open-ended question.`,
      },
    });
  }

  async sendMessageStream(
    message: string
  ): Promise<AsyncIterable<GenerateContentResponse> | null> {
    if (!this.chat) {
      this.startChat('neutral'); // Fallback
    }

    if (this.chat) {
      return this.chat.sendMessageStream({ message });
    }
    return null;
  }
}
