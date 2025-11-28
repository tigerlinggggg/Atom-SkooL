export interface Role {
  id: string;
  title: string;
  icon: string;
  description: string;
  requirements: string[];
  niceToHave?: string[];
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface FaqItem {
  category?: string;
  question: string;
  answer: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface RightStage {
  title: string;
  role: string;
  items: string[];
}