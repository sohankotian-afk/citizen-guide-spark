import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle, ExternalLink, User, MapPin } from "lucide-react";
import { UserProfile, ChecklistItem } from "@/types";
import { mockChecklistItems } from "@/data/mockData";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface DashboardProps {
  profile: UserProfile;
  onOpenGuide: (documentType: string) => void;
}

export function Dashboard({ profile, onOpenGuide }: DashboardProps) {
  const [checklist, setChecklist] = useLocalStorage<ChecklistItem[]>('citizen-checklist', []);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    // Generate personalized checklist based on user profile
    const personalizedChecklist = mockChecklistItems.filter(item => {
      switch (item.documentType) {
        case 'aadhaar':
          return !profile.hasAadhaar;
        case 'pan':
          return !profile.hasPAN;
        case 'voter':
          return !profile.hasVoterID;
        default:
          return true;
      }
    });

    if (checklist.length === 0) {
      setChecklist(personalizedChecklist);
    }
  }, [profile, checklist.length, setChecklist]);

  useEffect(() => {
    setCompletedCount(checklist.filter(item => item.isCompleted).length);
  }, [checklist]);

  const toggleCompletion = (itemId: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      )
    );
  };

  const progressPercentage = checklist.length > 0 ? (completedCount / checklist.length) * 100 : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="bg-gradient-subtle border-none">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                Welcome back, {profile.name}!
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Age: {profile.dateOfBirth ? new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear() : 'N/A'}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {profile.state}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{completedCount}</div>
              <div className="text-sm text-muted-foreground">of {checklist.length} completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Documents Completed</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {checklist.length - completedCount} documents remaining to complete your identity setup
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Checklist */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Your Personalized Checklist</h2>
        <div className="grid gap-4">
          {checklist.map((item) => (
            <Card 
              key={item.id} 
              className={`transition-all duration-200 hover:shadow-medium ${
                item.isCompleted ? 'bg-success-light border-success' : 'hover:bg-card-hover'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleCompletion(item.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          item.isCompleted 
                            ? 'bg-success border-success text-success-foreground' 
                            : 'border-muted-foreground hover:border-primary'
                        }`}
                      >
                        {item.isCompleted && <CheckCircle className="w-4 h-4" />}
                      </button>
                      <div>
                        <h3 className={`font-semibold ${item.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {item.estimatedTime}
                      </div>
                      <Badge className={getDifficultyColor(item.difficulty)} variant="secondary">
                        {item.difficulty}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => onOpenGuide(item.documentType)}
                    variant="outline" 
                    size="sm"
                    className="ml-4"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <AlertCircle className="w-6 h-6 text-primary" />
              <span className="font-medium">Take Quiz</span>
              <span className="text-xs text-muted-foreground">Test your knowledge</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <ExternalLink className="w-6 h-6 text-primary" />
              <span className="font-medium">FAQ</span>
              <span className="text-xs text-muted-foreground">Common questions</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <CheckCircle className="w-6 h-6 text-primary" />
              <span className="font-medium">Progress</span>
              <span className="text-xs text-muted-foreground">Track completion</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}