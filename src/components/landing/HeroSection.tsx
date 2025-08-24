import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, CheckCircle, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const features = [
    {
      icon: FileText,
      title: "Essential Documents",
      description: "Learn about PAN, Aadhaar, and Voter ID"
    },
    {
      icon: CheckCircle,
      title: "Step-by-Step Guides",
      description: "Clear instructions for each application"
    },
    {
      icon: Users,
      title: "Personalized Checklist",
      description: "Get a customized plan based on your state"
    },
    {
      icon: Award,
      title: "Test Your Knowledge",
      description: "Take quizzes to ensure you understand"
    }
  ];

  return (
    <div className="text-center space-y-12">
      {/* Hero Content */}
      <div className="space-y-6">
        <div className="relative mx-auto w-full max-w-2xl">
          <img 
            src={heroImage} 
            alt="Young Indians with identity documents" 
            className="w-full h-64 object-cover rounded-2xl shadow-medium"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-20 rounded-2xl"></div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Your Guide to 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Essential </span>
            Identity Documents
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Turn 18? Get ready for adulthood with our simple guide to PAN, Aadhaar, and Voter ID applications. 
            Everything you need to know in one place.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-primary hover:bg-primary-hover text-primary-foreground font-semibold px-8 py-3 text-lg"
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-3 text-lg"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 text-center hover:shadow-medium transition-all duration-200 hover:scale-105">
            <div className="bg-gradient-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <feature.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}