
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface PatternCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
}

const PatternCard: React.FC<PatternCardProps> = ({ id, name, description, image }) => {
  const navigate = useNavigate();
  
  return (
    <div className="border rounded-md overflow-hidden bg-card">
      <div className="h-48 bg-muted">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full mt-2"
          onClick={() => navigate(`/patterns/${id}`)}
        >
          View Pattern
        </Button>
      </div>
    </div>
  );
};

export default PatternCard;
