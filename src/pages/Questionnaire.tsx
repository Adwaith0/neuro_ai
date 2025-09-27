import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, ArrowLeft, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Questionnaire = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 1,
      text: "Does your child look at you when you call their name?",
      category: "Social Communication",
    },
    {
      id: 2,
      text: "How easy is it for you to get eye contact with your child?",
      category: "Social Communication",
    },
    {
      id: 3,
      text: "Does your child point to indicate they want something?",
      category: "Gestural Communication",
    },
    {
      id: 4,
      text: "Does your child point to share interest with you?",
      category: "Gestural Communication",
    },
    {
      id: 5,
      text: "Does your child pretend to play (e.g., care for dolls, talk on phone)?",
      category: "Imaginative Play",
    },
    {
      id: 6,
      text: "Does your child follow your gaze when you look at something?",
      category: "Social Awareness",
    },
    {
      id: 7,
      text: "Does your child show concern when others are hurt or upset?",
      category: "Empathy",
    },
    {
      id: 8,
      text: "Does your child use simple gestures (e.g., waving goodbye)?",
      category: "Gestural Communication",
    },
    {
      id: 9,
      text: "Does your child engage in back-and-forth conversation?",
      category: "Social Communication",
    },
    {
      id: 10,
      text: "Does your child have any repetitive behaviors or intense interests?",
      category: "Repetitive Behaviors",
    },
  ];

  const options = [
    { value: "always", label: "Always", score: 0 },
    { value: "usually", label: "Usually", score: 1 },
    { value: "sometimes", label: "Sometimes", score: 2 },
    { value: "rarely", label: "Rarely", score: 3 },
    { value: "never", label: "Never", score: 4 },
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeAssessment();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeAssessment = () => {
    // Calculate risk score (simplified)
    const totalScore = Object.values(answers).reduce((sum, answer) => {
      const option = options.find(opt => opt.value === answer);
      return sum + (option?.score || 0);
    }, 0);

    const maxScore = questions.length * 4;
    const riskPercentage = (totalScore / maxScore) * 100;

    let riskLevel = "Low";
    if (riskPercentage > 60) riskLevel = "High";
    else if (riskPercentage > 30) riskLevel = "Medium";

    // Store results in localStorage for dashboard
    const results = {
      riskLevel,
      riskPercentage: Math.round(riskPercentage),
      totalScore,
      maxScore,
      completedAt: new Date().toISOString(),
      answers: answers,
    };

    localStorage.setItem("assessmentResults", JSON.stringify(results));

    toast({
      title: "Assessment Complete!",
      description: `Risk level: ${riskLevel}. View your detailed results in the dashboard.`,
    });

    navigate("/dashboard");
  };

  const isCurrentAnswered = answers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Autism Risk Assessment</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            This assessment is based on validated screening tools. Please answer honestly 
            based on typical behavior patterns.
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </Card>

        {/* Question Card */}
        <Card className="p-8 mb-8">
          <div className="mb-6">
            <div className="text-sm text-primary font-medium mb-2">
              {questions[currentQuestion].category}
            </div>
            <h2 className="text-2xl font-semibold text-foreground leading-relaxed">
              {questions[currentQuestion].text}
            </h2>
          </div>

          <RadioGroup
            value={answers[currentQuestion] || ""}
            onValueChange={handleAnswer}
            className="space-y-4"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <RadioGroupItem 
                  value={option.value} 
                  id={option.value}
                  className="border-2"
                />
                <Label 
                  htmlFor={option.value} 
                  className="text-lg cursor-pointer hover:text-primary transition-smooth"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-smooth ${
                  index < currentQuestion
                    ? "bg-success"
                    : index === currentQuestion
                    ? answers[currentQuestion]
                      ? "bg-primary"
                      : "bg-border"
                    : "bg-border"
                }`}
              >
                {index < currentQuestion && (
                  <CheckCircle className="h-3 w-3 text-white" />
                )}
              </div>
            ))}
          </div>

          <Button
            onClick={nextQuestion}
            disabled={!isCurrentAnswered}
            className="flex items-center gap-2"
            variant={currentQuestion === questions.length - 1 ? "success" : "default"}
          >
            {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;