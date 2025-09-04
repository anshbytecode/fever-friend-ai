import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Thermometer, Clock, MapPin, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SymptomChecker = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [symptoms, setSymptoms] = useState({
    feverDuration: "",
    feverPattern: "",
    temperature: "",
    associatedSymptoms: [] as string[],
    travelHistory: "",
    recentExposure: "",
    medicalHistory: "",
    additionalInfo: ""
  });

  const associatedSymptomsOptions = [
    "Chills", "Sweating", "Headache", "Body aches", "Cough", "Sore throat",
    "Runny nose", "Nausea", "Vomiting", "Diarrhea", "Fatigue", "Loss of appetite",
    "Skin rash", "Joint pain", "Difficulty breathing", "Chest pain"
  ];

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms(prev => ({
      ...prev,
      associatedSymptoms: prev.associatedSymptoms.includes(symptom)
        ? prev.associatedSymptoms.filter(s => s !== symptom)
        : [...prev.associatedSymptoms, symptom]
    }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else navigate('/results', { state: { symptoms } });
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-primary rounded-full">
                <Thermometer className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Fever Details</h2>
                <p className="text-muted-foreground">Tell us about your fever symptoms</p>
              </div>
            </div>
            
            <div className="grid gap-4">
              <div>
                <Label htmlFor="temperature" className="text-sm font-medium">Current/Highest Temperature (°F or °C)</Label>
                <Input
                  id="temperature"
                  placeholder="e.g., 101°F or 38.3°C"
                  value={symptoms.temperature}
                  onChange={(e) => setSymptoms(prev => ({ ...prev, temperature: e.target.value }))}
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium">How long have you had fever?</Label>
                <Select value={symptoms.feverDuration} onValueChange={(value) => setSymptoms(prev => ({ ...prev, feverDuration: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less-than-1-day">Less than 1 day</SelectItem>
                    <SelectItem value="1-2-days">1-2 days</SelectItem>
                    <SelectItem value="3-5-days">3-5 days</SelectItem>
                    <SelectItem value="1-week">About 1 week</SelectItem>
                    <SelectItem value="more-than-1-week">More than 1 week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Fever Pattern</Label>
                <Select value={symptoms.feverPattern} onValueChange={(value) => setSymptoms(prev => ({ ...prev, feverPattern: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="How does your fever behave?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="continuous">Continuous (stays high)</SelectItem>
                    <SelectItem value="intermittent">Comes and goes</SelectItem>
                    <SelectItem value="evening-peaks">Higher in evening</SelectItem>
                    <SelectItem value="morning-peaks">Higher in morning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-accent rounded-full">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Associated Symptoms</h2>
                <p className="text-muted-foreground">Select all symptoms you're experiencing</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {associatedSymptomsOptions.map((symptom) => (
                <div key={symptom} className="flex items-center space-x-2">
                  <Checkbox
                    id={symptom}
                    checked={symptoms.associatedSymptoms.includes(symptom)}
                    onCheckedChange={() => handleSymptomToggle(symptom)}
                  />
                  <Label htmlFor={symptom} className="text-sm font-normal cursor-pointer">
                    {symptom}
                  </Label>
                </div>
              ))}
            </div>
            
            {symptoms.associatedSymptoms.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Selected symptoms:</p>
                <div className="flex flex-wrap gap-2">
                  {symptoms.associatedSymptoms.map((symptom) => (
                    <Badge key={symptom} variant="secondary">{symptom}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-primary rounded-full">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Exposure & Travel</h2>
                <p className="text-muted-foreground">Help us understand potential causes</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Recent Travel History</Label>
                <Select value={symptoms.travelHistory} onValueChange={(value) => setSymptoms(prev => ({ ...prev, travelHistory: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any travel in the past 30 days?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No recent travel</SelectItem>
                    <SelectItem value="domestic">Within India</SelectItem>
                    <SelectItem value="international">International travel</SelectItem>
                    <SelectItem value="rural-areas">Rural or forest areas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Recent Exposure to Illness</Label>
                <Select value={symptoms.recentExposure} onValueChange={(value) => setSymptoms(prev => ({ ...prev, recentExposure: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Contact with sick individuals?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No known exposure</SelectItem>
                    <SelectItem value="family">Sick family member</SelectItem>
                    <SelectItem value="workplace">Sick colleague</SelectItem>
                    <SelectItem value="public">Crowded public places</SelectItem>
                    <SelectItem value="healthcare">Healthcare facility visit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-accent rounded-full">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Medical History</h2>
                <p className="text-muted-foreground">Additional information to help with diagnosis</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="medicalHistory" className="text-sm font-medium">
                  Chronic Conditions & Current Medications
                </Label>
                <Textarea
                  id="medicalHistory"
                  placeholder="e.g., Diabetes, hypertension, recent vaccinations, current medications..."
                  value={symptoms.medicalHistory}
                  onChange={(e) => setSymptoms(prev => ({ ...prev, medicalHistory: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <Label htmlFor="additionalInfo" className="text-sm font-medium">
                  Additional Information (Optional)
                </Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Any other symptoms or concerns you'd like to mention..."
                  value={symptoms.additionalInfo}
                  onChange={(e) => setSymptoms(prev => ({ ...prev, additionalInfo: e.target.value }))}
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-medical">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold text-primary">AI Fever Diagnosis</CardTitle>
                <CardDescription className="text-lg">Step {step} of 4</CardDescription>
              </div>
              <div className="w-24 bg-muted rounded-full h-2">
                <div 
                  className="h-2 bg-gradient-primary rounded-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {renderStep()}
            
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                {step === 1 ? 'Home' : 'Back'}
              </Button>
              <Button onClick={handleNext} className="flex items-center gap-2">
                {step === 4 ? 'Get Diagnosis' : 'Next'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SymptomChecker;