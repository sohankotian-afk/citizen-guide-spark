import { IndianState, ChecklistItem, QuizQuestion, FAQ } from "@/types";

export const indianStates: IndianState[] = [
  { code: "AP", name: "Andhra Pradesh" },
  { code: "AR", name: "Arunachal Pradesh" },
  { code: "AS", name: "Assam" },
  { code: "BR", name: "Bihar" },
  { code: "CT", name: "Chhattisgarh" },
  { code: "DL", name: "Delhi" },
  { code: "GA", name: "Goa" },
  { code: "GJ", name: "Gujarat" },
  { code: "HR", name: "Haryana" },
  { code: "HP", name: "Himachal Pradesh" },
  { code: "JK", name: "Jammu and Kashmir" },
  { code: "JH", name: "Jharkhand" },
  { code: "KA", name: "Karnataka" },
  { code: "KL", name: "Kerala" },
  { code: "MP", name: "Madhya Pradesh" },
  { code: "MH", name: "Maharashtra" },
  { code: "MN", name: "Manipur" },
  { code: "ML", name: "Meghalaya" },
  { code: "MZ", name: "Mizoram" },
  { code: "NL", name: "Nagaland" },
  { code: "OR", name: "Odisha" },
  { code: "PB", name: "Punjab" },
  { code: "RJ", name: "Rajasthan" },
  { code: "SK", name: "Sikkim" },
  { code: "TN", name: "Tamil Nadu" },
  { code: "TG", name: "Telangana" },
  { code: "TR", name: "Tripura" },
  { code: "UP", name: "Uttar Pradesh" },
  { code: "UT", name: "Uttarakhand" },
  { code: "WB", name: "West Bengal" }
];

export const mockChecklistItems: ChecklistItem[] = [
  {
    id: "aadhaar",
    title: "Apply for Aadhaar Card",
    description: "Your unique 12-digit identity number for all government services",
    documentType: "aadhaar",
    isCompleted: false,
    estimatedTime: "2-3 weeks",
    difficulty: "easy"
  },
  {
    id: "pan",
    title: "Apply for PAN Card",
    description: "Essential for filing taxes and financial transactions",
    documentType: "pan",
    isCompleted: false,
    estimatedTime: "1-2 weeks",
    difficulty: "easy"
  },
  {
    id: "voter",
    title: "Register as Voter",
    description: "Get your Voter ID to participate in elections",
    documentType: "voter",
    isCompleted: false,
    estimatedTime: "4-6 weeks",
    difficulty: "medium"
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Which document is mandatory for filing income tax returns?",
    options: ["Aadhaar Card", "PAN Card", "Voter ID", "Passport"],
    correctAnswer: 1,
    explanation: "PAN Card is mandatory for all tax-related transactions and filing returns."
  },
  {
    id: "q2",
    question: "At what age can you register as a voter in India?",
    options: ["16 years", "17 years", "18 years", "21 years"],
    correctAnswer: 2,
    explanation: "You can register as a voter when you turn 18 years old."
  },
  {
    id: "q3",
    question: "What is the full form of PAN?",
    options: [
      "Personal Account Number",
      "Permanent Account Number", 
      "Public Account Number",
      "Primary Account Number"
    ],
    correctAnswer: 1,
    explanation: "PAN stands for Permanent Account Number, issued by the Income Tax Department."
  }
];

export const faqData: FAQ[] = [
  {
    id: "faq1",
    question: "Do I need Aadhaar to vote?",
    answer: "No, Aadhaar is not mandatory for voting. However, you can use it as identity proof when registering for voter ID.",
    category: "voting",
    relatedDocuments: ["aadhaar", "voter"]
  },
  {
    id: "faq2", 
    question: "Can I apply for PAN online?",
    answer: "Yes, you can apply for PAN online through the official NSDL or UTIITSL websites. You'll need to upload documents and pay the fee online.",
    category: "pan",
    relatedDocuments: ["pan"]
  },
  {
    id: "faq3",
    question: "What documents do I need for Aadhaar?",
    answer: "You need proof of identity (school certificate, passport, etc.) and proof of address (utility bill, rent agreement, etc.).",
    category: "aadhaar", 
    relatedDocuments: ["aadhaar"]
  }
];