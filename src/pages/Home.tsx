//Home.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import { Brain, Activity, MessageSquare, HandMetal, BarChart3, Heart, Shield, Users } from "lucide-react";
import heroImage from "@/assets/hero-neuro-ai.jpg";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Autism Risk Assessment",
      description: "Evidence-based screening questionnaire using M-CHAT methodology for early detection and support.",
      icon: <Activity className="h-6 w-6" />,
      onClick: () => navigate("/questionnaire"),
    },
    {
      title: "Speech Emotion Recognition",
      description: "AI-powered analysis of emotional patterns in speech to support communication understanding.",
      icon: <MessageSquare className="h-6 w-6" />,
      onClick: () => navigate("/speech"),
    },
    {
      title: "Sign Language Recognition",
      description: "Visual recognition system for basic sign language gestures to enhance accessibility.",
      icon: <HandMetal className="h-6 w-6" />,
      onClick: () => navigate("/sign-language"),
    },
    {
      title: "Personal Dashboard",
      description: "Comprehensive view of assessment results, progress tracking, and personalized insights.",
      icon: <BarChart3 className="h-6 w-6" />,
      onClick: () => navigate("/dashboard"),
    },
  ];

  const benefits = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Compassionate Care",
      description: "Designed with empathy and understanding for individuals and families",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy First",
      description: "Your data is secure and handled with the highest privacy standards",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Backed",
      description: "Developed with input from medical professionals and accessibility experts",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="mb-6">
              <Brain className="h-16 w-16 mx-auto text-white animate-float" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              AI-Powered
              <br />
              <span className="text-success-light">Assistive Technology</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Advanced machine learning tools for autism risk assessment, speech emotion recognition, 
              and sign language translation - designed to support individuals and families with 
              compassionate, accessible technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => navigate("/questionnaire")}
                className="text-lg px-8 py-3"
              >
                Start Assessment
              </Button>
              <Button 
                variant="medical" 
                size="lg" 
                onClick={() => navigate("/dashboard")}
                className="text-lg px-8 py-3 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary"
              >
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive AI Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our integrated platform combines multiple AI technologies to provide 
              comprehensive support and insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                onClick={feature.onClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built with Care
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every feature is designed with accessibility, privacy, and compassionate care in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10 text-primary">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Begin with our comprehensive assessment tool to understand your unique needs.
          </p>
          <Button 
            variant="hero" 
            size="lg" 
            onClick={() => navigate("/questionnaire")}
            className="text-lg px-12 py-4"
          >
            Begin Assessment
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
