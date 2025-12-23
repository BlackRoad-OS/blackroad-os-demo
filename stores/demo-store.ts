import { create } from 'zustand';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface DemoState {
  sessionId: string;
  messages: Message[];
  messagesRemaining: number;
  maxMessages: number;
  isLoading: boolean;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setLoading: (loading: boolean) => void;
  resetSession: () => void;
}

const generateSessionId = () => `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useDemoStore = create<DemoState>((set) => ({
  sessionId: generateSessionId(),
  messages: [
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Lucidia. I'm here to help you explore what transparent AI collaboration feels like.\n\nAsk me anything, or try one of these:\n• \"What makes you different from other AI?\"\n• \"Help me brainstorm ideas for...\"\n• \"Explain how governance works\"",
      timestamp: new Date(),
    },
  ],
  messagesRemaining: 10,
  maxMessages: 10,
  isLoading: false,

  addMessage: (message) =>
    set((state) => {
      const newMessage: Message = {
        ...message,
        id: `${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
      };

      const updatedMessages = [...state.messages, newMessage];
      const messagesRemaining = message.role === 'user'
        ? Math.max(0, state.messagesRemaining - 1)
        : state.messagesRemaining;

      return {
        messages: updatedMessages,
        messagesRemaining,
      };
    }),

  setLoading: (loading) => set({ isLoading: loading }),

  resetSession: () =>
    set({
      sessionId: generateSessionId(),
      messages: [
        {
          id: '1',
          role: 'assistant',
          content: "Hi! I'm Lucidia. I'm here to help you explore what transparent AI collaboration feels like.\n\nAsk me anything, or try one of these:\n• \"What makes you different from other AI?\"\n• \"Help me brainstorm ideas for...\"\n• \"Explain how governance works\"",
          timestamp: new Date(),
        },
      ],
      messagesRemaining: 10,
      isLoading: false,
    }),
}));
