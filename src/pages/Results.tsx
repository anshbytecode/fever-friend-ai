import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  CheckCircle, 
  Thermometer, 
  Heart, 
  Phone, 
  MapPin, 
  Clock, 
  Stethoscope,
  Home,
  RefreshCw
} from "lucide-react";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const symptoms = location.state?.symptoms;

  if (!symptoms) {
    navigate('/symptom-checker');
    return null;
  }

  // Generate diagnosis based on symptoms
  const generateDiagnosis = () => {
    const { feverDuration, associatedSymptoms, travelHistory } = symptoms;
    
    // Simple logic for demonstration - in real app, this would be much more sophisticated
    const hasRespiratorySymptoms = associatedSymptoms.some(s => 
      ['Cough', 'Sore throat', 'Runny nose', 'Difficulty breathing'].includes(s)
    );
    const hasGISymptoms = associatedSymptoms.some(s => 
      ['Nausea', 'Vomiting', 'Diarrhea'].includes(s)
    );
    const hasBodyAches = associatedSymptoms.includes('Body aches');
    const hasRash = associatedSymptoms.includes('Skin rash');
    
    if (hasRespiratorySymptoms && hasBodyAches) {
      return {
        primary: "Viral Upper Respiratory Infection (Flu-like illness)",
        probability: "High",
        severity: "Moderate",
        alternatives: ["Influenza", "Common Cold with fever", "COVID-19"]
      };
    } else if (hasGISymptoms && feverDuration === "3-5-days") {
      return {
        primary: "Gastroenteritis with fever",
        probability: "Moderate",
        severity: "Moderate", 
        alternatives: ["Food poisoning", "Viral gastroenteritis", "Bacterial infection"]
      };
    } else if (hasRash || travelHistory === "rural-areas") {
      return {
        primary: "Vector-borne illness (Dengue/Chikungunya suspected)",
        probability: "Moderate",
        severity: "High",
        alternatives: ["Dengue fever", "Chikungunya", "Malaria", "Typhoid"]
      };
    } else {
      return {
        primary: "Viral fever syndrome",
        probability: "High",
        severity: "Mild to Moderate",
        alternatives: ["Common viral infection", "Early bacterial infection", "Stress-related fever"]
      };
    }
  };

  const diagnosis = generateDiagnosis();
  const isHighSeverity = diagnosis.severity === "High";
  
  const recommendations = [
    "Rest and maintain adequate sleep (8+ hours)",
    "Stay well hydrated - drink 3-4 liters of fluids daily",
    "Take paracetamol (acetaminophen) for fever and body aches",
    "Monitor temperature every 4-6 hours",
    "Maintain isolation if contagious illness suspected",
    "Light, easily digestible diet (BRAT diet if needed)",
  ];

  const warningSigns = [
    "Temperature > 104°F (40°C)",
    "Difficulty breathing or chest pain",
    "Persistent vomiting or severe dehydration",
    "Altered mental status or severe headache",
    "Signs of bleeding or skin rash worsening",
    "No improvement after 3-4 days"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <Card className="shadow-medical">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-full w-fit">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-primary">Diagnosis Results</CardTitle>
            <CardDescription className="text-lg">Based on your reported symptoms</CardDescription>
          </CardHeader>
        </Card>

        {/* Severity Alert */}
        <Alert className={isHighSeverity ? "border-warning bg-warning/10" : "border-accent bg-accent/10"}>
          <AlertTriangle className={`h-4 w-4 ${isHighSeverity ? "text-warning" : "text-accent"}`} />
          <AlertTitle className="font-semibold">
            {isHighSeverity ? "Urgent Medical Attention Recommended" : "Monitor Symptoms Closely"}
          </AlertTitle>
          <AlertDescription>
            {isHighSeverity 
              ? "Your symptoms suggest a condition that requires prompt medical evaluation. Please consult a healthcare provider today."
              : "Your symptoms are consistent with common conditions. Follow home care recommendations and monitor for changes."
            }
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Primary Diagnosis */}
          <Card className="shadow-medical">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Thermometer className="h-5 w-5 text-primary" />
                Likely Diagnosis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-primary">{diagnosis.primary}</h3>
                <div className="flex gap-2 mt-2">
                  <Badge variant={diagnosis.probability === "High" ? "default" : "secondary"}>
                    {diagnosis.probability} Probability
                  </Badge>
                  <Badge variant={isHighSeverity ? "destructive" : "secondary"}>
                    {diagnosis.severity} Severity
                  </Badge>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold text-sm mb-2">Other Possibilities:</h4>
                <ul className="space-y-1">
                  {diagnosis.alternatives.map((alt, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                      {alt}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="shadow-medical">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Heart className="h-5 w-5 text-accent" />
                Home Care Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Warning Signs */}
        <Card className="shadow-medical border-warning">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-warning">
              <AlertTriangle className="h-5 w-5" />
              Seek Immediate Medical Care If:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-2">
              {warningSigns.map((sign, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                  {sign}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Doctor Referral */}
        <Card className="shadow-medical bg-gradient-primary text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Phone className="h-5 w-5" />
              Recommended Medical Consultation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">Specialty Recommendation:</h4>
                <p className="text-sm opacity-90">
                  {isHighSeverity 
                    ? "Emergency Medicine or Internal Medicine specialist"
                    : "General Physician or Family Medicine doctor"
                  }
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Timeline:</h4>
                <p className="text-sm opacity-90">
                  {isHighSeverity 
                    ? "Within 24 hours or immediately if symptoms worsen"
                    : "Within 2-3 days if no improvement"
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 text-sm bg-white/10 rounded-lg p-3">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">For Pune residents:</p>
                <p className="opacity-90">Consider consulting at Ruby Hall Clinic, Jehangir Hospital, or KEM Hospital for specialized care.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={() => navigate('/symptom-checker')} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Take Assessment Again
          </Button>
          <Button onClick={() => navigate('/')} className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        {/* Disclaimer */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Medical Disclaimer:</strong> This AI assessment is for informational purposes only and does not replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers for medical concerns. In case of medical emergency, call emergency services immediately.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;