//sign
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { HandMetal, Upload, Camera, RotateCcw, Brain, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignLanguage = () => {
  const { toast } = useToast();
  const [hasImage, setHasImage] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const captureImage = () => {
    // Simulate image capture
    setHasImage(true);
    toast({
      title: "Image Captured",
      description: "Hand gesture captured successfully. Ready for analysis!",
    });
  };

  const uploadImage = () => {
    // Simulate image upload
    setHasImage(true);
    toast({
      title: "Image Uploaded",
      description: "Image uploaded successfully. Ready for analysis!",
    });
  };

  const analyzeGesture = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate AI analysis with progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          
          // Simulate AI results for sign language
          const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "L", "O", "U", "V", "Y"];
          const numbers = ["1", "2", "3", "4", "5"];
          const words = ["Hello", "Thank You", "Please", "Yes", "No"];
          
          const allSigns = [...letters, ...numbers, ...words];
          const detectedSign = allSigns[Math.floor(Math.random() * allSigns.length)];
          
          setResults({
            sign: detectedSign,
            confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
            category: letters.includes(detectedSign) ? "Letter" : 
                     numbers.includes(detectedSign) ? "Number" : "Word",
            handPosition: {
              x: Math.floor(Math.random() * 100),
              y: Math.floor(Math.random() * 100),
            },
            keypoints: Math.floor(Math.random() * 5) + 18, // 18-22 detected keypoints
            features: [
              "Hand orientation detected",
              "Finger position analyzed",
              "Gesture boundaries identified",
            ]
          });
          
          toast({
            title: "Analysis Complete!",
            description: `Detected sign: ${detectedSign}`,
          });
          
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
  };

  const resetSession = () => {
    setHasImage(false);
    setResults(null);
    setAnalysisProgress(0);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "letter":
        return "text-primary";
      case "number":
        return "text-success";
      case "word":
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
            <HandMetal className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Sign Language Recognition</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            AI-powered visual recognition of basic sign language gestures to enhance accessibility.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Capture Section */}
          <Card className="p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">Capture Gesture</h2>
            
            <div className="text-center">
              <div className="mb-6">
                <div className={`w-48 h-36 mx-auto rounded-lg border-4 flex items-center justify-center transition-smooth ${
                  hasImage 
                    ? "border-success bg-success/10" 
                    : "border-dashed border-border bg-muted/20"
                }`}>
                  {hasImage ? (
                    <div className="text-center">
                      <HandMetal className="h-12 w-12 text-success mx-auto mb-2" />
                      <p className="text-sm text-success font-medium">Gesture Captured</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No image captured</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {!hasImage && (
                  <div className="space-y-4">
                    <Button
                      onClick={captureImage}
                      variant="hero"
                      size="lg"
                      className="w-full"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Capture Image
                    </Button>
                    
                    <Button
                      onClick={uploadImage}
                      variant="outline"
                      size="lg"
                      className="w-full"
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                )}

                {hasImage && !results && (
                  <div className="space-y-4">
                    <Button
                      onClick={analyzeGesture}
                      variant="success"
                      size="lg"
                      className="w-full"
                      disabled={isAnalyzing}
                    >
                      <Brain className="h-5 w-5 mr-2" />
                      {isAnalyzing ? "Analyzing..." : "Analyze Gesture"}
                    </Button>
                    
                    <Button
                      onClick={resetSession}
                      variant="outline"
                      className="w-full"
                    >
                      <RotateCcw className="h-5 w-5 mr-2" />
                      Capture Again
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
                    New Capture
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Analysis Section */}
          <Card className="p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">Recognition Results</h2>
            
            {!hasImage && !results && (
              <div className="text-center py-12">
                <HandMetal className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Capture or upload an image to see AI recognition results here.
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div className="space-y-6">
                <div className="text-center">
                  <Eye className="h-12 w-12 mx-auto text-primary mb-4 animate-float" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    AI Analyzing Gesture...
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Detecting hand keypoints and identifying sign patterns
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
                {/* Primary Recognition */}
                <div className="text-center">
                  <Badge variant="secondary" className="text-lg px-4 py-2 mb-4">
                    Detected Sign
                  </Badge>
                  <div className={`text-6xl font-bold mb-2 ${getCategoryColor(results.category)}`}>
                    {results.sign}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {results.category} • Confidence: {results.confidence}%
                  </div>
                  <Progress value={results.confidence} className="h-2" />
                </div>

                {/* Detection Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Detection Details</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-accent/50 rounded-lg">
                      <div className="text-lg font-semibold text-foreground">
                        {results.keypoints}
                      </div>
                      <div className="text-xs text-muted-foreground">Keypoints</div>
                    </div>
                    <div className="text-center p-3 bg-accent/50 rounded-lg">
                      <div className="text-lg font-semibold text-foreground">
                        {results.category}
                      </div>
                      <div className="text-xs text-muted-foreground">Category</div>
                    </div>
                  </div>
                </div>

                {/* Features Detected */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Features Detected</h4>
                  {results.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Translation */}
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-2">Translation</h4>
                  <p className="text-foreground text-lg">
                    "{results.sign}"
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Supported Signs */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Supported Signs</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Letters</h4>
              <div className="flex flex-wrap gap-2">
                {["A", "B", "C", "D", "E", "F", "G", "H", "I", "L", "O", "U", "V", "Y"].map(letter => (
                  <Badge key={letter} variant="secondary" className="text-xs">
                    {letter}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Numbers</h4>
              <div className="flex flex-wrap gap-2">
                {["1", "2", "3", "4", "5"].map(number => (
                  <Badge key={number} variant="secondary" className="text-xs">
                    {number}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Words</h4>
              <div className="flex flex-wrap gap-2">
                {["Hello", "Thank You", "Please", "Yes", "No"].map(word => (
                  <Badge key={word} variant="secondary" className="text-xs">
                    {word}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Information Section */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-foreground mb-2">Hand Detection</h4>
              <p className="text-muted-foreground">
                Advanced computer vision identifies hand regions and extracts key anatomical landmarks.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Gesture Analysis</h4>
              <p className="text-muted-foreground">
                Machine learning models analyze hand pose and finger positions to recognize sign patterns.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Translation</h4>
              <p className="text-muted-foreground">
                Recognized gestures are translated into text, supporting basic communication needs.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignLanguage;
