import type {
  HowToPlayContentProps,
  GameInstructionsData,
} from "../../Interfaces/IHowToPlayPopup";
import "./HowToPlayContent.css";
import type { JSX } from "react/jsx-runtime";

/**
 * Game instructions data containing all the content for the How to Play popup
 */
const gameInstructionsData: GameInstructionsData = {
  instructions: [
    {
      title: "Objective",
      content:
        "Navigate through the maze, collect all diamonds, avoid dangers, and reach the exit before you run out of moves. There are multiple levels.",
      type: "objective",
    },
    {
      title: "Controls",
      content:
        "Use WASD keys or Arrow keys to move your character through the maze.",
      type: "controls",
    },
    {
      title: "Game Objects",
      content: `
Walls: Immovable barriers that block your path
Soil (brown): Can be dug through by moving into it
Boulders: Heavy objects that fall when unsupported and can be pushed
Arrows: Move continuously in their direction until hitting an obstacle
Diamonds: Collect these to complete the level
Bombs: Explode when touched, ending the game
Exit (door): The goal - reach this after collecting all diamonds`,
      type: "objects",
    },
    {
      title: "Movement Rules",
      content: `
Boulders fall down when there's empty space below them
Being hit by a falling boulder or touching a bomb will end the game
If you run out of moves the game will end
You can only move into empty spaces or dig through soil`,
      type: "mechanics",
    },
  ],
  credits: {
    author: "Andrew Smith",
    authorLink: "https://www.linkedin.com/in/andrewesmith/",
    aiAssistance: [
      "Kiro/Claude Sonnet 4.0, 3.7 and Chat GPT 4.1  for code generation and debugging assistance",
      "Microsoft Copilot for hints and tips",
    ],
    imageSources: "Game sprites created using CoPilot",
    soundSources: "Sound effects sourced from freesound.org",
    originalGame: {
      name: "Wanderer",
      link: "https://en.wikipedia.org/wiki/Wanderer_(1988_video_game)",
      author: "Steven Shipway",
      authorLink: "https://www.steveshipway.org/",
    },
    acknowledgements: [
      "Original Wanderer game concept by Steven Shipway",
      "David Broadfoot for helping to point the way, Nick Ellercamp for feedback on generated code.",
    ],
  },
};

/**
 * Component that renders the structured game instructions and credits
 * Displays comprehensive information about game mechanics, controls, and attribution
 */
export function HowToPlayContent({
  className,
}: HowToPlayContentProps): JSX.Element {
  const { instructions, credits } = gameInstructionsData;

  return (
    <div className={className}>
      {/* Game Instructions Sections */}
      <section
        className="instructions-content"
        aria-label="Game instructions"
        role="region"
      >
        {instructions.map((instruction, index) => (
          <article
            key={instruction.type}
            className="instruction-section"
            aria-labelledby={`instruction-${instruction.type}`}
          >
            <h3
              className="instruction-title"
              id={`instruction-${instruction.type}`}
            >
              {instruction.title}
            </h3>
            <div
              className="instruction-content"
              aria-labelledby={`instruction-${instruction.type}`}
              role="group"
            >
              {instruction.content.split("\n").map((line, lineIndex) => {
                // Handle bullet points for better screen reader experience
                if (line.trim().startsWith("•")) {
                  return (
                    <div
                      key={lineIndex}
                      className="instruction-line"
                      role="listitem"
                    >
                      {line}
                    </div>
                  );
                }
                return (
                  <div key={lineIndex} className="instruction-line">
                    {line}
                  </div>
                );
              })}
            </div>
            {index < instructions.length - 1 && (
              <hr className="instruction-divider" aria-hidden="true" />
            )}
          </article>
        ))}
      </section>

      {/* Credits Section */}
      <hr className="credits-divider" aria-hidden="true" />
      <section
        className="credits-section"
        aria-label="Credits and acknowledgements"
        role="region"
      >
        <h4 className="credits-title" id="credits-heading">
          Credits
        </h4>

        <div
          className="credits-content"
          aria-labelledby="credits-heading"
          role="group"
        >
          <div className="credit-item">
            <strong>Author:</strong>{" "}
            <a
              href={credits.authorLink}
              target="_blank"
              rel="noopener noreferrer"
              className="credit-link"
              aria-label={`Visit ${credits.author}'s LinkedIn profile (opens in new tab)`}
            >
              {credits.author}
            </a>
          </div>

          <div className="credit-item">
            <strong>AI Assistance:</strong>
            <ul
              className="credit-list"
              aria-label="AI tools used in development"
            >
              {credits.aiAssistance.map((tool, index) => (
                <li key={index}>{tool}</li>
              ))}
            </ul>
          </div>

          <div className="credit-item">
            <strong>Images:</strong> {credits.imageSources}
          </div>

          <div className="credit-item">
            <strong>Sounds:</strong> {credits.soundSources}
          </div>

          <div className="credit-item">
            <strong>Original Game:</strong>{" "}
            <a
              href={credits.originalGame.link}
              target="_blank"
              rel="noopener noreferrer"
              className="credit-link"
              aria-label={`Learn more about ${credits.originalGame.name} (opens in new tab)`}
            >
              {credits.originalGame.name}
            </a>{" "}
            by{" "}
            <a
              href={credits.originalGame.authorLink}
              target="_blank"
              rel="noopener noreferrer"
              className="credit-link"
              aria-label={`Visit ${credits.originalGame.author}'s website (opens in new tab)`}
            >
              {credits.originalGame.author}
            </a>
          </div>

          <div className="credit-item">
            <strong>Acknowledgements:</strong>
            <ul className="credit-list" aria-label="Special acknowledgements">
              {credits.acknowledgements.map((ack, index) => (
                <li key={index}>{ack}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
