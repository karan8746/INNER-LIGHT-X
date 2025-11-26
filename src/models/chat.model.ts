export type MessageAuthor = 'user' | 'ai' | 'system';

export interface ChatMessage {
  id: string;
  author: MessageAuthor;
  content: string;
}