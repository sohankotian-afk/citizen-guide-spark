export interface UserProfile {
  name: string;
  dateOfBirth: string;
  state: string;
  hasAadhaar: boolean;
  hasPAN: boolean;
  hasVoterID: boolean;
  completedOnboarding: boolean;
}

export interface Document {
  id: string;
  name: string;
  description: string;
  isRequired: boolean;
  isCompleted: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  documentType: 'aadhaar' | 'pan' | 'voter' | 'passport' | 'driving';
  isCompleted: boolean;
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  relatedDocuments: string[];
}

export interface IndianState {
  code: string;
  name: string;
}