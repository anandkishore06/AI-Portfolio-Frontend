
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl: string;
  codeUrl: string;
  index: number;
}

const ProjectCard = ({
  title,
  description,
  tags,
  imageUrl,
  demoUrl,
  codeUrl,
  index,
}: ProjectCardProps) => {
  return (
    <Card 
      className={cn(
        "glass-card overflow-hidden transition-all duration-500 hover:shadow-[0_0_25px_rgba(78,205,196,0.1)] group border-gray-dark",
        "opacity-0 animate-fade-in",
      )}
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
    >
      <div className="relative overflow-hidden">
        <div className="aspect-video w-full bg-dark-light relative overflow-hidden">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
        </div>
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-2 py-1 text-xs font-semibold rounded-full bg-dark/70 backdrop-blur-sm text-teal"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 mb-6 line-clamp-2">{description}</p>
        <div className="flex gap-3">
          <Button 
            className="bg-teal text-dark hover:bg-teal/80 text-sm flex-1"
            asChild
          >
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-dark hover:bg-gray-dark/30 text-sm flex-1"
            asChild
          >
            <a href={codeUrl} target="_blank" rel="noopener noreferrer">
              View Code
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
