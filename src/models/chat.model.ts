export type MessageAuthor = 'user' | 'ai' | 'system';

export interface ChatMessage {
  author: MessageAuthor;
  content: string;
}
