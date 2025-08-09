import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HowToPlayContent } from "../components/how-to-play/HowToPlayContent";

describe("HowToPlayContent", () => {
  it("renders all instruction sections", () => {
    render(<HowToPlayContent />);

    // Check that all main instruction sections are present
    expect(screen.getByText("Objective")).toBeInTheDocument();
    expect(screen.getByText("Controls")).toBeInTheDocument();
    expect(screen.getByText("Game Objects")).toBeInTheDocument();
    expect(screen.getByText("Movement Rules")).toBeInTheDocument();
  });

  it("renders objective section with correct content", () => {
    render(<HowToPlayContent />);

    expect(screen.getByText("Objective")).toBeInTheDocument();
    expect(
      screen.getByText(/Navigate through the maze, collect all diamonds/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/avoid dangers, and reach the exit/)
    ).toBeInTheDocument();
    expect(screen.getByText(/There are multiple levels/)).toBeInTheDocument();
  });

  it("renders controls section with correct content", () => {
    render(<HowToPlayContent />);

    expect(screen.getByText("Controls")).toBeInTheDocument();
    expect(
      screen.getByText(/Use WASD keys or Arrow keys to move/)
    ).toBeInTheDocument();
  });

  it("renders game objects section with all object descriptions", () => {
    render(<HowToPlayContent />);

    expect(screen.getByText("Game Objects")).toBeInTheDocument();

    // Check for all game objects mentioned
    expect(screen.getByText(/Walls: Immovable barriers/)).toBeInTheDocument();
    expect(
      screen.getByText(/Soil \(brown\): Can be dug through/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Boulders: Heavy objects that fall/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Arrows: Move continuously/)).toBeInTheDocument();
    expect(screen.getByText(/Diamonds: Collect these/)).toBeInTheDocument();
    expect(screen.getByText(/Bombs: Explode when touched/)).toBeInTheDocument();
    expect(screen.getByText(/Exit \(door\): The goal/)).toBeInTheDocument();
  });

  it("renders movement rules section with correct content", () => {
    render(<HowToPlayContent />);

    expect(screen.getByText("Movement Rules")).toBeInTheDocument();
    expect(
      screen.getByText(/Boulders fall down when there's empty space/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Being hit by a falling boulder or touching a bomb/)
    ).toBeInTheDocument();
    expect(screen.getByText(/If you run out of moves/)).toBeInTheDocument();
    expect(
      screen.getByText(/You can only move into empty spaces/)
    ).toBeInTheDocument();
  });

  it("renders credits section with all required information", () => {
    render(<HowToPlayContent />);

    expect(screen.getByText("Credits")).toBeInTheDocument();

    // Check author information
    expect(screen.getByText("Author:")).toBeInTheDocument();
    expect(screen.getByText("Andrew Smith")).toBeInTheDocument();

    // Check for LinkedIn link
    const authorLink = screen.getByRole("link", {
      name: /Visit Andrew Smith's LinkedIn profile/,
    });
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/andrewesmith/"
    );
    expect(authorLink).toHaveAttribute("target", "_blank");
    expect(authorLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders AI assistance information", () => {
    render(<HowToPlayContent />);

    expect(screen.getByText("AI Assistance:")).toBeInTheDocument();
    expect(
      screen.getByText(/Kiro\/Claude Sonnet 4.0, 3.7 and Chat GPT 4.1/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Microsoft Copilot for hints/)).toBeInTheDocument();
  });

  it("renders image and sound sources", () => {
    render(<HowToPlayContent />);

    expect(screen.getByText("Images:")).toBeInTheDocument();
    expect(
      screen.getByText(/Game sprites created using CoPilot/)
    ).toBeInTheDocument();

    expect(screen.getByText("Sounds:")).toBeInTheDocument();
    expect(
      screen.getByText(/Sound effects sourced from freesound.org/)
    ).toBeInTheDocument();
  });

  it("renders original game information with links", () => {
    render(<HowToPlayContent />);

    expect(screen.getByText("Original Game:")).toBeInTheDocument();

    // Check for Wanderer game link
    const gameLink = screen.getByRole("link", {
      name: /Learn more about Wanderer/,
    });
    expect(gameLink).toBeInTheDocument();
    expect(gameLink).toHaveAttribute(
      "href",
      "https://en.wikipedia.org/wiki/Wanderer_(1988_video_game)"
    );
    expect(gameLink).toHaveAttribute("target", "_blank");
    expect(gameLink).toHaveAttribute("rel", "noopener noreferrer");

    // Check for Steven Shipway link
    const authorLink = screen.getByRole("link", {
      name: /Visit Steven Shipway's website/,
    });
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute("href", "https://www.steveshipway.org/");
    expect(authorLink).toHaveAttribute("target", "_blank");
    expect(authorLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders acknowledgements section", () => {
    render(<HowToPlayContent />);

    expect(screen.getByText("Acknowledgements:")).toBeInTheDocument();
    expect(
      screen.getByText(/David Broadfoot for helping to point the way/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Nick Ellercamp for feedback on generated code/)
    ).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const { container } = render(<HowToPlayContent className="custom-class" />);

    const contentDiv = container.firstChild as HTMLElement;
    expect(contentDiv).toHaveClass("custom-class");
  });

  it("has proper accessibility attributes", () => {
    render(<HowToPlayContent />);

    // Check for proper ARIA labels and roles
    const instructionsSection = screen.getByRole("region", {
      name: "Game instructions",
    });
    expect(instructionsSection).toBeInTheDocument();

    const creditsSection = screen.getByRole("region", {
      name: "Credits and acknowledgements",
    });
    expect(creditsSection).toBeInTheDocument();

    // Check for proper heading structure
    const objectiveHeading = screen.getByRole("heading", { name: "Objective" });
    expect(objectiveHeading).toBeInTheDocument();
    expect(objectiveHeading.tagName).toBe("H3");

    const creditsHeading = screen.getByRole("heading", { name: "Credits" });
    expect(creditsHeading).toBeInTheDocument();
    expect(creditsHeading.tagName).toBe("H4");
  });

  it("has proper semantic structure for screen readers", () => {
    render(<HowToPlayContent />);

    // Check that instruction sections are properly structured as articles
    const objectiveSection = screen.getByText("Objective").closest("article");
    expect(objectiveSection).toBeInTheDocument();
    expect(objectiveSection).toHaveClass("instruction-section");

    // Check for proper list structure in credits
    const aiAssistanceList = screen.getByRole("list", {
      name: "AI tools used in development",
    });
    expect(aiAssistanceList).toBeInTheDocument();

    const acknowledgementsList = screen.getByRole("list", {
      name: "Special acknowledgements",
    });
    expect(acknowledgementsList).toBeInTheDocument();
  });

  it("renders instruction dividers between sections", () => {
    const { container } = render(<HowToPlayContent />);

    // Check for dividers between instruction sections (but not after the last one)
    const dividers = container.querySelectorAll(".instruction-divider");
    expect(dividers.length).toBe(3); // 4 sections - 1 = 3 dividers
  });

  it("renders credits divider before credits section", () => {
    const { container } = render(<HowToPlayContent />);

    const creditsDivider = container.querySelector(".credits-divider");
    expect(creditsDivider).toBeInTheDocument();
  });

  it("handles multi-line content correctly", () => {
    render(<HowToPlayContent />);

    // Game Objects section has multi-line content
    const gameObjectsContent = screen.getByText(
      /Walls: Immovable barriers/
    ).parentElement;
    expect(gameObjectsContent).toBeInTheDocument();

    // Check that multiple lines are rendered as separate divs
    const instructionLines =
      gameObjectsContent?.querySelectorAll(".instruction-line");
    expect(instructionLines?.length).toBeGreaterThan(1);
  });

  it("renders all external links with proper security attributes", () => {
    render(<HowToPlayContent />);

    const externalLinks = screen.getAllByRole("link");

    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
