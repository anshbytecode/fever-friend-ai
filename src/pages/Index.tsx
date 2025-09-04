import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Stethoscope, 
  Heart, 
  Shield, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Thermometer,
  Brain,
  Users,
  Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/medical-hero.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartDiagnosis = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/symptom-checker');
    }, 500);
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze your symptoms against medical databases"
    },
    {
      icon: Clock,
      title: "Quick Assessment", 
      description: "Get preliminary diagnosis in under 5 minutes"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your health data is protected with enterprise-grade security"
    },
    {
      icon: Users,
      title: "Doctor Network",
      description: "Connect with verified healthcare providers in Pune"
    }
  ];

  const trustIndicators = [
    "Based on WHO fever guidelines",
    "Trained on 10,000+ medical cases", 
    "95% accuracy in preliminary diagnosis",
    "Trusted by 50+ healthcare facilities"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-95" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-8 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Stethoscope className="h-5 w-5" />
              <span className="text-sm font-medium">AI-Powered Medical Diagnosis</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Smart Fever Diagnosis
              <span className="block text-accent-glow">Made Simple</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Get accurate, AI-powered preliminary diagnosis for fever-related illnesses. 
              Specialized for conditions common in Pune and Maharashtra region.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                variant="accent"
                onClick={handleStartDiagnosis}
                disabled={isLoading}
                className="text-lg px-8 py-6 animate-pulse-glow"
              >
                {isLoading ? "Loading..." : "Start Free Diagnosis"}
                <ArrowRight className="h-5 w-5" />
              </Button>
              
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
                Learn More
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center gap-2 text-sm opacity-90">
                  <CheckCircle className="h-4 w-4 text-accent-glow flex-shrink-0" />
                  <span>{indicator}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Why Choose Our AI Doctor?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Advanced Medical Technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI system combines medical expertise with cutting-edge technology 
              to provide reliable preliminary diagnoses.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-medical hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="mb-4 mx-auto w-fit p-3 bg-gradient-primary rounded-full">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Describe Symptoms", 
                description: "Answer guided questions about your fever and associated symptoms"
              },
              {
                step: "02", 
                title: "AI Analysis",
                description: "Our AI analyzes your symptoms using medical databases and guidelines"
              },
              {
                step: "03",
                title: "Get Results",
                description: "Receive diagnosis, recommendations, and doctor referral if needed"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-medical bg-gradient-primary text-white text-center">
            <CardContent className="pt-12 pb-12">
              <Thermometer className="h-12 w-12 mx-auto mb-6 text-accent-glow" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Feeling Unwell? Get Help Now
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Don't wait when you're feeling sick. Get a preliminary diagnosis 
                and know when to seek medical care.
              </p>
              <Button
                size="lg"
                variant="accent"
                onClick={handleStartDiagnosis}
                disabled={isLoading}
                className="text-lg px-8 py-6"
              >
                {isLoading ? "Loading..." : "Start Your Assessment"}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Stethoscope className="h-6 w-6" />
                <span className="text-xl font-bold">AI Fever Doctor</span>
              </div>
              <p className="opacity-90 text-sm">
                Providing reliable AI-powered preliminary diagnosis for fever-related illnesses in Pune and surrounding areas.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm opacity-90">
                <p>How it works</p>
                <p>Medical disclaimer</p>
                <p>Privacy policy</p>
                <p>Contact support</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Emergency</h3>
              <p className="text-sm opacity-90 mb-2">
                For medical emergencies, call:
              </p>
              <p className="text-lg font-bold">108 (Emergency Services)</p>
              <p className="text-sm opacity-90">
                This tool does not replace emergency care
              </p>
            </div>
          </div>
          
          <Separator className="my-8 bg-white/20" />
          
          <div className="text-center text-sm opacity-90">
            <p>© 2024 AI Fever Doctor. For informational purposes only. Not a substitute for professional medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
