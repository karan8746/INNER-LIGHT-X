import { Component, ChangeDetectionStrategy, input, output, signal, effect, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';
import { ChatMessage } from '../../models/chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  initialMood = input.required<string>();
  viewResources = output<void>();

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  messages = signal<ChatMessage[]>([]);
  userInput = signal('');
  isLoading = signal(false);
  
  private crisisKeywords = ['kill myself', 'suicide', 'self harm', 'hopeless', 'end it all'];

  constructor(private geminiService: GeminiService) {
    // Effect to auto-scroll chat
    effect(() => {
      if (this.messages()) {
        this.scrollToBottom();
      }
    });
  }

  ngOnInit() {
    this.geminiService.startChat(this.initialMood());
    this.startConversation();
  }

  private async startConversation() {
    this.isLoading.set(true);
    this.messages.set([]); // Clear previous messages
    
    const placeholderId = this.generateUniqueId();
    this.messages.update(m => [...m, { id: placeholderId, author: 'ai', content: '' }]);
    
    try {
      const stream = await this.geminiService.sendMessageStream(`The user is feeling ${this.initialMood()}. Start the conversation gently.`);
      
      if (stream) {
        for await (const chunk of stream) {
          const chunkText = chunk.text;
          this.messages.update(msgs => 
            msgs.map(msg => 
              msg.id === placeholderId 
                ? { ...msg, content: msg.content + chunkText } 
                : msg
            )
          );
          this.scrollToBottom();
        }
      }
    } catch (error) {
      console.error("Error during initial conversation stream:", error);
      this.messages.update(msgs => 
        msgs.map(msg => 
          msg.id === placeholderId 
            ? { ...msg, content: "I'm sorry, I'm having a little trouble connecting right now. Please try again in a moment." } 
            : msg
        )
      );
    } finally {
      this.isLoading.set(false);
    }
  }

  async sendMessage(): Promise<void> {
    const messageContent = this.userInput().trim();
    if (!messageContent || this.isLoading()) {
      return;
    }

    // Add user message to chat
    this.messages.update(m => [...m, { id: this.generateUniqueId(), author: 'user', content: messageContent }]);
    this.userInput.set('');
    this.isLoading.set(true);

    // Crisis detection
    if (this.detectCrisis(messageContent)) {
      this.messages.update(m => [...m, { 
        id: this.generateUniqueId(),
        author: 'system', 
        content: "It sounds like you're going through a difficult time. Please know that help is available. You can connect with people who can support you by calling or texting 988 anytime in the US and Canada. In the UK, you can call 111." 
      }]);
      this.isLoading.set(false);
      return;
    }

    const aiPlaceholderId = this.generateUniqueId();
    this.messages.update(m => [...m, { id: aiPlaceholderId, author: 'ai', content: '' }]);
    
    try {
      const stream = await this.geminiService.sendMessageStream(messageContent);
      if (stream) {
        for await (const chunk of stream) {
          const chunkText = chunk.text;
          this.messages.update(msgs => 
            msgs.map(msg => 
              msg.id === aiPlaceholderId 
                ? { ...msg, content: msg.content + chunkText } 
                : msg
            )
          );
          this.scrollToBottom();
        }
      }
    } catch (error) {
      console.error("Error during message stream:", error);
       this.messages.update(msgs => 
        msgs.map(msg => 
          msg.id === aiPlaceholderId 
            ? { ...msg, content: "I'm having some trouble responding. Could you please try sending that again?" } 
            : msg
        )
      );
    } finally {
      this.isLoading.set(false);
    }
  }

  private detectCrisis(message: string): boolean {
    const lowerCaseMessage = message.toLowerCase();
    return this.crisisKeywords.some(keyword => lowerCaseMessage.includes(keyword));
  }
  
  private generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  private scrollToBottom(): void {
    try {
      setTimeout(() => {
        if(this.chatContainer) {
          this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
        }
      }, 0);
    } catch (err) { }
  }
}