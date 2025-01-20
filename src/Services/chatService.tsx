// src/services/chatService.ts
interface BotMessage {
  id: string;
  createdAt: string;
  conversationId: string;
  userId: string;
  payload: {
    type: string;
    text: string;
  };
}

interface ChatResponse {
  message: {
    message: BotMessage;
  };
  botResponse?: BotMessage | null;
  conversation: {
    id: string;
    isStarted: boolean;
  };
  messages: BotMessage[];
  user: {
    key: string;
    id: string;
  };
}

class ChatService {
  private static instance: ChatService;
  private readonly API_BASE_URL: string = 'http://localhost:5001/api/chat';
  private userKey: string | null = null;
  private conversationId: string | null = null;

  private constructor() {
    // Load saved state from localStorage
    const savedState = localStorage.getItem('chatState');
    if (savedState) {
      const state = JSON.parse(savedState);
      this.userKey = state.userKey;
      this.conversationId = state.conversationId;
    }
  }

  private saveState() {
    localStorage.setItem('chatState', JSON.stringify({
      userKey: this.userKey,
      conversationId: this.conversationId
    }));
  }

  async sendMessage(messageText: string): Promise<ChatResponse> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };

      if (this.userKey) {
        headers['x-user-key'] = this.userKey;
      }

      const response = await fetch(`${this.API_BASE_URL}/messages`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: messageText,
          conversationId: this.conversationId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      // Update state with new values
      if (data.user?.key) {
        this.userKey = data.user.key;  
      }
      if (data.conversation?.id) {
        this.conversationId = data.conversation.id;
      }
      this.saveState();

      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  resetChat() {
    this.userKey = null;
    this.conversationId = null;
    localStorage.removeItem('chatState');
  }

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }
}

export const chatService = ChatService.getInstance();