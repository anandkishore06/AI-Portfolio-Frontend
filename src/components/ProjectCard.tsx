import React from "react";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl: string;
  codeUrl: string;
  index: number;
  onDemoClick?: () => void;
  onCodeClick?: () => void;
}

const ProjectCard = ({
  title,
  description,
  tags,
  imageUrl,
  demoUrl,
  codeUrl,
  index,
  onDemoClick,
  onCodeClick,
}: ProjectCardProps) => {
  return (
    <div
      className={cn(
        "group h-full flex flex-col rounded-2xl overflow-hidden",
        "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md",
        "border border-zinc-200/80 dark:border-zinc-800/80",
        "hover:border-teal/40 dark:hover:border-teal/40",
        "shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      )}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400">
            No Preview Available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

        {/* Tags floating on image */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
          {tags.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md text-zinc-800 dark:text-zinc-200 border border-zinc-200/60 dark:border-zinc-800/60 shadow-2xs"
            >
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-black/60 backdrop-blur-md text-white/90">
              +{tags.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow text-left">
        <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-teal transition-colors mb-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-5 flex-grow leading-relaxed">
          {description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto pt-2">
          <button
            onClick={onDemoClick}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-teal hover:bg-teal/90 text-zinc-950 font-medium text-xs sm:text-sm shadow-xs transition-all duration-150 active:scale-97"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onCodeClick}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 font-medium text-xs sm:text-sm transition-all duration-150 active:scale-97"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
