import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, FileText, Clock, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";

interface DocumentGuideProps {
  documentType: string;
  onBack: () => void;
}

export function DocumentGuide({ documentType, onBack }: DocumentGuideProps) {
  const getGuideData = (type: string) => {
    switch (type) {
      case 'aadhaar':
        return {
          title: "Aadhaar Card Application Guide",
          description: "Your unique 12-digit identity number for all government services",
          importance: [
            "Required for bank account opening",
            "Mandatory for government welfare schemes",
            "Needed for mobile connection",
            "Required for PAN card application"
          ],
          requirements: [
            "Proof of Identity (Birth Certificate, School Leaving Certificate, Passport)",
            "Proof of Address (Utility Bill, Rent Agreement, Bank Statement)",
            "Date of Birth proof",
            "One passport-size photograph"
          ],
          steps: [
            "Visit the nearest Aadhaar enrollment center",
            "Fill the enrollment form with accurate details",
            "Submit required documents",
            "Provide biometric data (fingerprints and iris scan)",
            "Get acknowledgment slip with enrollment number",
            "Wait for 60-90 days for Aadhaar generation",
            "Download e-Aadhaar from UIDAI website or collect physical copy"
          ],
          officialLink: "https://uidai.gov.in/",
          estimatedTime: "2-3 weeks",
          difficulty: "Easy"
        };
        
      case 'pan':
        return {
          title: "PAN Card Application Guide", 
          description: "Permanent Account Number essential for all financial transactions",
          importance: [
            "Mandatory for filing income tax returns",
            "Required for opening bank accounts",
            "Needed for high-value purchases",
            "Essential for mutual fund investments"
          ],
          requirements: [
            "Proof of Identity (Aadhaar, Passport, Voter ID)",
            "Proof of Address (Utility Bill, Bank Statement)",
            "Proof of Date of Birth (Birth Certificate, School Certificate)",
            "Passport-size photograph",
            "PAN application form (Form 49A for individuals)"
          ],
          steps: [
            "Visit NSDL or UTIITSL website for online application",
            "Fill Form 49A with accurate personal details",
            "Upload required documents in specified format",
            "Pay application fee (₹107 for online, ₹107 for physical card)",
            "Choose delivery option (digital/physical)",
            "Submit application and note acknowledgment number",
            "Track application status online",
            "Receive PAN card within 15-20 working days"
          ],
          officialLink: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
          estimatedTime: "1-2 weeks",
          difficulty: "Easy"
        };
        
      case 'voter':
        return {
          title: "Voter ID Registration Guide",
          description: "Electoral Photo Identity Card to participate in Indian democracy",
          importance: [
            "Constitutional right to vote in elections",
            "Valid identity proof for various purposes", 
            "Enables participation in democratic process",
            "Required for contesting elections"
          ],
          requirements: [
            "Age: Minimum 18 years on qualifying date",
            "Proof of Age (Birth Certificate, School Certificate)",
            "Proof of Address (Utility Bill, Aadhaar, Rent Agreement)",
            "Passport-size photographs",
            "Form 6 (for new registration)"
          ],
          steps: [
            "Visit National Voters' Service Portal (NVSP)",
            "Register new account or login",
            "Fill Form 6 for new voter registration",
            "Upload required documents and photograph",
            "Choose constituency based on your address",
            "Submit application online",
            "Wait for field verification by election officer",
            "Receive Voter ID card within 4-6 weeks after verification"
          ],
          officialLink: "https://www.nvsp.in/",
          estimatedTime: "4-6 weeks", 
          difficulty: "Medium"
        };
        
      default:
        return null;
    }
  };

  const guideData = getGuideData(documentType);

  if (!guideData) {
    return <div>Guide not found</div>;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{guideData.title}</h1>
          <p className="text-muted-foreground">{guideData.description}</p>
        </div>
      </div>

      {/* Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-primary w-12 h-12 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Quick Overview</h3>
                <p className="text-sm text-muted-foreground">Essential information at a glance</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {guideData.estimatedTime}
              </div>
              <Badge className={getDifficultyColor(guideData.difficulty)}>
                {guideData.difficulty}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why It Matters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            Why You Need This Document
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {guideData.importance.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Required Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Required Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {guideData.requirements.map((requirement, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-accent rounded-lg">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-sm">{requirement}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Process */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Step-by-Step Application Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {guideData.steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-8 h-8 bg-gradient-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm">{step}</p>
                  {index < guideData.steps.length - 1 && (
                    <div className="w-px h-6 bg-border ml-4 mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Official Link */}
      <Card className="bg-gradient-subtle border-primary">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Ready to Apply?</h3>
              <p className="text-sm text-muted-foreground">Visit the official government website to start your application</p>
            </div>
            <Button asChild className="bg-gradient-primary hover:bg-primary-hover">
              <a href={guideData.officialLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Apply Now
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}