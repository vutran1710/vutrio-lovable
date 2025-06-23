"use client";

import { GithubLogo, Star } from "phosphor-react";
import type { WorkbenchPost } from "@/lib/types";

interface WorkbenchItemProps {
  project: WorkbenchPost;
}

export const WorkbenchItem = ({ project }: WorkbenchItemProps) => (
  <div className="group cursor-pointer animate-fade-in border border-transparent hover:border-accent transition-colors rounded-lg p-2">
    <div className="bg-card rounded-lg overflow-hidden border border-border transition-colors">
      <div className="aspect-video bg-gradient-to-br from-secondary to-muted overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-display text-xl font-semibold text-primary mb-2 hover:text-accent transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Star size={16} className="fill-current" />
            <span className="text-sm">{project.stars}</span>
          </div>
        </div>
        <p className="font-serif text-muted-foreground mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-primary hover:text-accent transition-colors"
        >
          <GithubLogo size={20} />
          <span className="font-medium">View on GitHub</span>
        </a>
      </div>
    </div>
  </div>
);
