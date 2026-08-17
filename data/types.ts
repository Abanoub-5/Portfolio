export interface Profile {
  name: string;
  initials: string;
  title: string;
  positioning: string;
  intro: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  avatar: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  keyDecisions: string[];
  github: string | null;
  demo: string | null;
  image: string | null;
  featured: boolean;
  category: "ai" | "web" | "other";
}

export interface Skill {
  name: string;
  level: "learning" | "working" | "proficient";
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface ExperienceItem {
  id: string;
  type: "education" | "internship" | "program";
  title: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface LearningTopic {
  title: string;
  description: string;
  status: "learning" | "exploring" | "applying";
  tags: string[];
}

export interface AiStack {
  category: string;
  items: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  url: string | null;
}

export interface AiWriteup {
  title: string;
  summary: string;
  tags: string[];
  url: string | null;
}
