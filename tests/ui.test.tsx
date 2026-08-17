import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjectById } from "@/data/projects";

describe("ProjectCard", () => {
  it("renders the project title and description", () => {
    const project = getProjectById("linkedin-ai-ranker")!;
    render(<ProjectCard project={project} />);
    expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument();
    expect(screen.getByText(project.shortDescription)).toBeInTheDocument();
  });

  it("renders a link to the project detail page", () => {
    const project = getProjectById("ai-portfolio")!;
    render(<ProjectCard project={project} />);
    const link = screen.getByRole("link", { name: /view details/i });
    expect(link).toHaveAttribute("href", `/projects/${project.id}`);
  });

  it("renders the GitHub link when present", () => {
    const project = getProjectById("linkedin-ai-ranker")!;
    render(<ProjectCard project={project} />);
    const githubLink = screen.getByRole("link", { name: "GitHub" });
    expect(githubLink).toHaveAttribute("href", project.github);
  });
});