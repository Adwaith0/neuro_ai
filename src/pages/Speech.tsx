//speech.tsx
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Upload, Mic, Play, Pause, RotateCcw, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Speech = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const startRecording = () => {
    setIsRecording(true);
    toast({
      title: "Recording Started",
      description: "Speak clearly for 10-30 seconds for best results.",
    });

    // Simulate recording
    setTimeout(() => {
      setIsRecording(false);
      setHasRecording(true);
      toast({
        title: "Recording Complete",
        description: "Ready for analysis!",
      });
    }, 5000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setHasRecording(true);
  };

  const analyzeAudio = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate AI analysis with progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          
          // Simulate AI results
          const emotions = ["Happy", "Neutral", "Calm", "Excited"];
          const selectedEmotion = emotions[Math.floor(Math.random() * emotions.length)];
          
          setResults({
            emotion: selectedEmotion,
            confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
            features: {
              pitch: Math.floor(Math.random() * 50) + 100, // 100-150 Hz
              energy: Math.floor(Math.random() * 40) + 60,  // 60-100%
              tempo: Math.floor(Math.random() * 60) + 120,  // 120-180 WPM
            },
            insights: [
              "Clear articulation detected",
              "Stable emotional tone",
              "Good vocal energy levels",
            ]
          });
          
          toast({
            title: "Analysis Complete!",
            description: `Detected emotion: ${selectedEmotion}`,
          });
          
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
  };

  const resetSession = () => {
    setHasRecording(false);
    setResults(null);
    setAnalysisProgress(0);
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case "happy":
      case "excited":
        return "text-success";
      case "calm":
      case "neutral":
        return "text-primary";
      case "sad":
        return "text-warning";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Speech Emotion Recognition</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            AI-powered analysis to detect emotional patterns in speech for better communication understanding.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recording Section */}
          <Card className="p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">Record Audio</h2>
            
            <div className="text-center">
              <div className="mb-6">
                <div className={`w-32 h-32 mx-auto rounded-full border-4 flex items-center justify-center transition-smooth ${
                  isRecording 
                    ? "border-destructive bg-destructive/10 animate-pulse-soft" 
                    : hasRecording 
                    ? "border-success bg-success/10" 
                    : "border-border bg-muted/20"
                }`}>
                  <Mic className={`h-12 w-12 ${
                    isRecording 
                      ? "text-destructive" 
                      : hasRecording 
                      ? "text-success" 
                      : "text-muted-foreground"
                  }`} />
                </div>
              </div>

              <div className="space-y-4">
                {!hasRecording && !isRecording && (
                  <Button
                    onClick={startRecording}
                    variant="hero"
                    size="lg"
                    className="w-full"
                  >
                    <Mic className="h-5 w-5 mr-2" />
                    Start Recording
                  </Button>
                )}

                {isRecording && (
                  <Button
                    onClick={stopRecording}
                    variant="destructive"
                    size="lg"
                    className="w-full"
                  >
                    <Pause className="h-5 w-5 mr-2" />
                    Stop Recording
                  </Button>
                )}

                {hasRecording && !results && (
                  <div className="space-y-4">
                    <Button
                      onClick={analyzeAudio}
                      variant="success"
                      size="lg"
                      className="w-full"
                      disabled={isAnalyzing}
                    >
                      <Brain className="h-5 w-5 mr-2" />
                      {isAnalyzing ? "Analyzing..." : "Analyze Audio"}
                    </Button>
                    
                    <Button
                      onClick={resetSession}
                      variant="outline"
                      className="w-full"
                    >
                      <RotateCcw className="h-5 w-5 mr-2" />
                      Record Again
                    </Button>
                  </div>
                )}

                {results && (
                  <Button
                    onClick={resetSession}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    New Recording
                  </Button>
                )}
              </div>

              {/* File Upload Alternative */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Or upload an audio file
                </p>
                <Button variant="outline" className="w-full">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Audio File
                </Button>
              </div>
            </div>
          </Card>

          {/* Analysis Section */}
          <Card className="p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">Analysis Results</h2>
            
            {!hasRecording && !results && (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Record or upload audio to see AI analysis results here.
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div className="space-y-6">
                <div className="text-center">
                  <Brain className="h-12 w-12 mx-auto text-primary mb-4 animate-float" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    AI Processing Audio...
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Extracting features and analyzing emotional patterns
                  </p>
                </div>
                
                <Progress value={analysisProgress} className="h-3" />
                
                <div className="text-center">
                  <span className="text-sm text-primary font-medium">
                    {Math.round(analysisProgress)}% Complete
                  </span>
                </div>
              </div>
            )}

            {results && (
              <div className="space-y-6">
                {/* Primary Emotion */}
                <div className="text-center">
                  <Badge variant="secondary" className="text-lg px-4 py-2 mb-4">
                    Detected Emotion
                  </Badge>
                  <div className={`text-4xl font-bold mb-2 ${getEmotionColor(results.emotion)}`}>
                    {results.emotion}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Confidence: {results.confidence}%
                  </div>
                  <Progress value={results.confidence} className="h-2 mt-2" />
                </div>

                {/* Audio Features */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Audio Features</h4>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-accent/50 rounded-lg">
                      <div className="text-lg font-semibold text-foreground">
                        {results.features.pitch}Hz
                      </div>
                      <div className="text-xs text-muted-foreground">Pitch</div>
                    </div>
                    <div className="text-center p-3 bg-accent/50 rounded-lg">
                      <div className="text-lg font-semibold text-foreground">
                        {results.features.energy}%
                      </div>
                      <div className="text-xs text-muted-foreground">Energy</div>
                    </div>
                    <div className="text-center p-3 bg-accent/50 rounded-lg">
                      <div className="text-lg font-semibold text-foreground">
                        {results.features.tempo}
                      </div>
                      <div className="text-xs text-muted-foreground">WPM</div>
                    </div>
                  </div>
                </div>

                {/* Insights */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Insights</h4>
                  {results.insights.map((insight: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-muted-foreground">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Information Section */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-foreground mb-2">Audio Processing</h4>
              <p className="text-muted-foreground">
                Advanced signal processing extracts key features like pitch, energy, and spectral characteristics.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">AI Analysis</h4>
              <p className="text-muted-foreground">
                Machine learning models trained on emotional speech patterns identify emotional states.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Insights</h4>
              <p className="text-muted-foreground">
                Results provide actionable insights for communication support and emotional understanding.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Speech;
