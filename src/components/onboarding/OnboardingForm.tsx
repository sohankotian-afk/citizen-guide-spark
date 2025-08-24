import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { indianStates } from "@/data/mockData";
import { UserProfile } from "@/types";
import { CalendarDays, MapPin, FileText } from "lucide-react";

interface OnboardingFormProps {
  onComplete: (profile: UserProfile) => void;
}

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    state: "",
    hasAadhaar: false,
    hasPAN: false,
    hasVoterID: false
  });

  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      const profile: UserProfile = {
        ...formData,
        completedOnboarding: true
      };
      onComplete(profile);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== "";
      case 2:
        return formData.dateOfBirth !== "" && formData.state !== "";
      case 3:
        return true; // Document status is optional
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarDays className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Welcome!</h2>
              <p className="text-muted-foreground">Let's start with your basic information</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Your Location</h2>
              <p className="text-muted-foreground">This helps us provide state-specific guidance</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="dob" className="text-sm font-medium">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="state" className="text-sm font-medium">State</Label>
                <Select onValueChange={(value) => setFormData({...formData, state: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state.code} value={state.code}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Current Documents</h2>
              <p className="text-muted-foreground">Check the documents you already have</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="aadhaar"
                  checked={formData.hasAadhaar}
                  onCheckedChange={(checked) => setFormData({...formData, hasAadhaar: !!checked})}
                />
                <Label htmlFor="aadhaar" className="text-sm font-medium">I have Aadhaar Card</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pan"
                  checked={formData.hasPAN}
                  onCheckedChange={(checked) => setFormData({...formData, hasPAN: !!checked})}
                />
                <Label htmlFor="pan" className="text-sm font-medium">I have PAN Card</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="voter"
                  checked={formData.hasVoterID}
                  onCheckedChange={(checked) => setFormData({...formData, hasVoterID: !!checked})}
                />
                <Label htmlFor="voter" className="text-sm font-medium">I have Voter ID</Label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-4">
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </CardHeader>
      
      <CardContent className="space-y-6">
        {renderStep()}
        
        <div className="flex justify-between gap-4">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handlePrevious} className="flex-1">
              Previous
            </Button>
          )}
          <Button 
            onClick={handleNext} 
            disabled={!isStepValid()}
            className="flex-1 bg-gradient-primary hover:bg-primary-hover"
          >
            {currentStep === totalSteps ? "Complete" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}