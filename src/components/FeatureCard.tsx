//
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  status?: "available" | "processing" | "completed";
}

const FeatureCard = ({ title, description, icon, onClick, status = "available" }: FeatureCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "processing":
        return "border-warning/50 bg-warning-light/20";
      case "completed":
        return "border-success/50 bg-success-light/20";
      default:
        return "border-border hover:border-primary/30";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "processing":
        return "Processing...";
      case "completed":
        return "Completed";
      default:
        return "Get Started";
    }
  };

  return (
    <div className={`bg-gradient-card p-6 rounded-xl border-2 transition-smooth hover:shadow-medium group ${getStatusColor()}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
          {icon}
        </div>
        {status === "completed" && (
          <div className="w-3 h-3 bg-success rounded-full animate-pulse-soft"></div>
        )}
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
      
      <Button 
        onClick={onClick} 
        variant="medical" 
        className="w-full group-hover:scale-105"
        disabled={status === "processing"}
      >
        {getStatusText()}
        {status !== "processing" && <ArrowRight className="h-4 w-4 ml-2" />}
      </Button>
    </div>
  );
};

export default FeatureCard;
