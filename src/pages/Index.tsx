import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { HeroSection } from "@/components/landing/HeroSection";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { DocumentGuide } from "@/components/guides/DocumentGuide";
import { Quiz } from "@/components/quiz/Quiz";
import { FAQ } from "@/components/faq/FAQ";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserProfile } from "@/types";
import { toast } from "@/hooks/use-toast";

type AppState = 'landing' | 'onboarding' | 'dashboard' | 'guide' | 'quiz' | 'faq';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [selectedGuide, setSelectedGuide] = useState<string>('');
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile | null>('user-profile', null);

  // Check if user has completed onboarding
  const hasCompletedOnboarding = userProfile?.completedOnboarding;

  const handleGetStarted = () => {
    if (hasCompletedOnboarding) {
      setAppState('dashboard');
    } else {
      setAppState('onboarding');
    }
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setAppState('dashboard');
    toast({
      title: "Welcome aboard!",
      description: "Your personalized checklist is ready.",
    });
  };

  const handleOpenGuide = (documentType: string) => {
    setSelectedGuide(documentType);
    setAppState('guide');
  };

  const handleBackToDashboard = () => {
    setAppState('dashboard');
  };

  const renderContent = () => {
    switch (appState) {
      case 'landing':
        return <HeroSection onGetStarted={handleGetStarted} />;
      
      case 'onboarding':
        return <OnboardingForm onComplete={handleOnboardingComplete} />;
      
      case 'dashboard':
        if (!userProfile) {
          setAppState('onboarding');
          return null;
        }
        return (
          <Dashboard 
            profile={userProfile} 
            onOpenGuide={handleOpenGuide}
          />
        );
      
      case 'guide':
        return (
          <DocumentGuide 
            documentType={selectedGuide}
            onBack={handleBackToDashboard}
          />
        );
      
      case 'quiz':
        return <Quiz onBack={handleBackToDashboard} />;
      
      case 'faq':
        return (
          <FAQ 
            onBack={handleBackToDashboard} 
            onOpenGuide={handleOpenGuide}
          />
        );
      
      default:
        return <HeroSection onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <AppLayout>
      {/* Navigation Bar */}
      {hasCompletedOnboarding && appState !== 'landing' && (
        <div className="mb-8">
          <nav className="flex items-center justify-between p-4 bg-card rounded-lg shadow-soft">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">Citizen Guide</h2>
              <span className="text-xs bg-gradient-primary text-primary-foreground px-2 py-1 rounded-full">v1.0</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setAppState('dashboard')}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  appState === 'dashboard' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setAppState('quiz')}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  appState === 'quiz' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Quiz
              </button>
              <button 
                onClick={() => setAppState('faq')}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  appState === 'faq' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                FAQ
              </button>
            </div>
          </nav>
        </div>
      )}
      
      {renderContent()}
    </AppLayout>
  );
};

export default Index;
