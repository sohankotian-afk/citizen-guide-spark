import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Award, RotateCcw, ArrowLeft } from "lucide-react";
import { QuizQuestion } from "@/types";
import { quizQuestions } from "@/data/mockData";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface QuizProps {
  onBack: () => void;
}

export function Quiz({ onBack }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useLocalStorage('quiz-completed', false);
  const [bestScore, setBestScore] = useLocalStorage('best-quiz-score', 0);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz completed
      const score = calculateScore(newAnswers);
      if (score > bestScore) {
        setBestScore(score);
      }
      setQuizCompleted(true);
      setShowResult(true);
    }
  };

  const calculateScore = (userAnswers: number[]) => {
    return userAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
  };

  const score = calculateScore(answers);
  const percentage = Math.round((score / quizQuestions.length) * 100);

  const getScoreBadge = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return { text: "Excellent!", color: "bg-success text-success-foreground" };
    if (percentage >= 60) return { text: "Good!", color: "bg-primary text-primary-foreground" };
    return { text: "Keep Learning!", color: "bg-destructive text-destructive-foreground" };
  };

  if (showResult) {
    const badge = getScoreBadge(score, quizQuestions.length);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Quiz Results</h1>
        </div>

        <Card className="text-center">
          <CardContent className="pt-8 pb-6">
            <div className="bg-gradient-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-primary-foreground" />
            </div>
            
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {score} / {quizQuestions.length}
            </h2>
            
            <Badge className={`${badge.color} text-lg px-4 py-2 mb-4`}>
              {badge.text}
            </Badge>
            
            <p className="text-muted-foreground mb-6">
              You scored {percentage}% on the citizenship knowledge quiz!
            </p>

            {bestScore > 0 && (
              <p className="text-sm text-muted-foreground mb-6">
                Your best score: {bestScore} / {quizQuestions.length}
              </p>
            )}

            <Button onClick={resetQuiz} className="bg-gradient-primary hover:bg-primary-hover">
              <RotateCcw className="w-4 h-4 mr-2" />
              Take Quiz Again
            </Button>
          </CardContent>
        </Card>

        {/* Answer Review */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Review Your Answers</h3>
          {quizQuestions.map((question, index) => (
            <Card key={question.id} className={`${
              answers[index] === question.correctAnswer 
                ? 'bg-success-light border-success' 
                : 'bg-destructive/5 border-destructive/20'
            }`}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  {answers[index] === question.correctAnswer ? (
                    <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-2">{question.question}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Correct Answer:</strong> {question.options[question.correctAnswer]}
                    </p>
                    <p className="text-sm text-muted-foreground">{question.explanation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const currentQuestionData = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Citizenship Knowledge Quiz</h1>
          <p className="text-muted-foreground">Test your knowledge about Indian identity documents</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Question {currentQuestion + 1} of {quizQuestions.length}</CardTitle>
            <Badge variant="outline">{Math.round(progress)}% Complete</Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <h3 className="text-lg font-medium text-foreground">
            {currentQuestionData.question}
          </h3>

          <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => handleAnswerSelect(parseInt(value))}>
            <div className="space-y-3">
              {currentQuestionData.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-accent transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <div className="flex justify-end">
            <Button 
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="bg-gradient-primary hover:bg-primary-hover"
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}