import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  Calendar, 
  MessageSquare, 
  HandMetal, 
  Activity,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AssessmentResults {
  riskLevel: string;
  riskPercentage: number;
  totalScore: number;
  maxScore: number;
  completedAt: string;
  answers: Record<number, string>;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResults | null>(null);

  useEffect(() => {
    const storedResults = localStorage.getItem("assessmentResults");
    if (storedResults) {
      setAssessmentResults(JSON.parse(storedResults));
    }
  }, []);

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return "success";
      case "medium":
        return "warning";
      case "high":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return <CheckCircle className="h-5 w-5" />;
      case "medium":
        return <AlertCircle className="h-5 w-5" />;
      case "high":
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const features = [
    {
      title: "Speech Analysis",
      description: "AI-powered emotion recognition from speech patterns",
      icon: <MessageSquare className="h-6 w-6" />,
      status: "available",
      onClick: () => navigate("/speech"),
    },
    {
      title: "Sign Language",
      description: "Visual recognition of basic sign language gestures",
      icon: <HandMetal className="h-6 w-6" />,
      status: "available",
      onClick: () => navigate("/sign-language"),
    },
    {
      title: "Re-take Assessment",
      description: "Complete the autism risk assessment again",
      icon: <Activity className="h-6 w-6" />,
      status: "available",
      onClick: () => navigate("/questionnaire"),
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Personal Dashboard</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Your comprehensive overview of AI-powered assessments and insights
          </p>
        </div>

        {/* Assessment Results */}
        {assessmentResults ? (
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Risk Level Card */}
            <Card className="p-6 bg-gradient-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Risk Assessment</h3>
                {getRiskIcon(assessmentResults.riskLevel)}
              </div>
              
              <div className="text-center">
                <Badge 
                  variant={getRiskColor(assessmentResults.riskLevel) as any}
                  className="text-lg px-4 py-2 mb-4"
                >
                  {assessmentResults.riskLevel} Risk
                </Badge>
                
                <div className="mb-4">
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {assessmentResults.riskPercentage}%
                  </div>
                  <Progress 
                    value={assessmentResults.riskPercentage} 
                    className="h-3"
                  />
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Based on {assessmentResults.totalScore}/{assessmentResults.maxScore} assessment score
                </p>
              </div>
            </Card>

            {/* Completion Date */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Last Assessment</h3>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-2">
                  {new Date(assessmentResults.completedAt).toLocaleDateString()}
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(assessmentResults.completedAt).toLocaleTimeString()}
                </p>
              </div>
            </Card>

            {/* Progress Tracking */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Progress</h3>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-2">
                  1
                </div>
                <p className="text-sm text-muted-foreground">
                  Assessment Completed
                </p>
              </div>
            </Card>
          </div>
        ) : (
          <Card className="p-8 mb-8 text-center">
            <Brain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Assessment Data
            </h3>
            <p className="text-muted-foreground mb-6">
              Complete your first autism risk assessment to see personalized insights here.
            </p>
            <Button onClick={() => navigate("/questionnaire")} variant="hero">
              Start Assessment
            </Button>
          </Card>
        )}

        {/* Available Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Available Tools</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-medium transition-smooth group cursor-pointer" onClick={feature.onClick}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                    {feature.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.status}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {feature.description}
                </p>
                
                <Button variant="outline" className="w-full group-hover:border-primary">
                  Try Now
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        {assessmentResults && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Recommendations</h2>
            
            <div className="space-y-4">
              {assessmentResults.riskLevel === "Low" && (
                <div className="flex items-start gap-3 p-4 bg-success-light/20 rounded-lg border border-success/30">
                  <CheckCircle className="h-5 w-5 text-success mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Great Progress!</h4>
                    <p className="text-sm text-muted-foreground">
                      Your assessment indicates low risk. Continue monitoring and consider regular check-ins.
                    </p>
                  </div>
                </div>
              )}
              
              {assessmentResults.riskLevel === "Medium" && (
                <div className="flex items-start gap-3 p-4 bg-warning-light/20 rounded-lg border border-warning/30">
                  <AlertCircle className="h-5 w-5 text-warning mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Consider Professional Consultation</h4>
                    <p className="text-sm text-muted-foreground">
                      Your results suggest moderate risk. Consider discussing with a healthcare professional for further evaluation.
                    </p>
                  </div>
                </div>
              )}
              
              {assessmentResults.riskLevel === "High" && (
                <div className="flex items-start gap-3 p-4 bg-destructive/10 rounded-lg border border-destructive/30">
                  <AlertCircle className="h-5 w-5 text-destructive mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Professional Evaluation Recommended</h4>
                    <p className="text-sm text-muted-foreground">
                      Your assessment indicates higher risk. We strongly recommend consulting with a qualified healthcare professional for comprehensive evaluation.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;