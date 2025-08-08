import type {
  HowToPlayContentProps,
  GameInstructionsData,
} from "../../Interfaces/IHowToPlayPopup";
import "./HowToPlayContent.css";

/**
 * Game instructions data containing all the content for the How to Play popup
 */
const gameInstructionsData: GameInstructionsData = {
  instructions: [
    {
      title: "Objective",
      content:
        "Navigate through the maze, collect all diamonds, avoid dangers, and reach the exit to complete each level.",
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
      content: `• Rocks (gray): Immovable barriers that block your path
• Soil (brown): Can be dug through by moving into it
• Boulders (dark gray): Heavy objects that fall when unsupported and can be pushed
• Arrows: Move continuously in their direction until hitting an obstacle
• Diamonds (blue): Collect these to complete the level
• Bombs (red): Explode when touched, ending the game
• Exit (green): The goal - reach this after collecting all diamonds`,
      type: "objects",
    },
    {
      title: "Movement Rules",
      content: `• Boulders fall down when there's empty space below them
• Boulders can be pushed left or right if there's space
• Arrows move continuously until they hit a wall or object
• Being hit by a falling boulder or moving arrow will end the game
• You can only move into empty spaces or soil`,
      type: "mechanics",
    },
  ],
  credits: {
    author: "Your Name",
    authorLink: "https://linkedin.com/in/yourprofile",
    aiAssistance: [
      "Claude AI for code generation and debugging assistance",
      "GitHub Copilot for code completion",
    ],
    imageSources:
      "Game sprites created using pixel art tools and open source assets",
    soundSources:
      "Sound effects sourced from freesound.org and custom recordings",
    originalGame: {
      name: "Wanderer",
      link: "https://en.wikipedia.org/wiki/Wanderer_(1988_video_game)",
      author: "Steven Shipway",
      authorLink: "https://www.steveshipway.org/",
    },
    acknowledgements: [
      "Original Wanderer game concept by Steven Shipway",
      "React and TypeScript communities for excellent documentation",
      "Open source contributors for tools and libraries used",
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
      <div className="instructions-content">
        {instructions.map((instruction, index) => (
          <div key={instruction.type} className="instruction-section">
            <h3 className="instruction-title">{instruction.title}</h3>
            <div className="instruction-content">
              {instruction.content.split("\n").map((line, lineIndex) => (
                <div key={lineIndex} className="instruction-line">
                  {line}
                </div>
              ))}
            </div>
            {index < instructions.length - 1 && (
              <div className="instruction-divider" />
            )}
          </div>
        ))}
      </div>

      {/* Credits Section */}
      <div className="credits-divider" />
      <div className="credits-section">
        <h4 className="credits-title">Credits</h4>

        <div className="credits-content">
          <div className="credit-item">
            <strong>Author:</strong>{" "}
            <a
              href={credits.authorLink}
              target="_blank"
              rel="noopener noreferrer"
              className="credit-link"
            >
              {credits.author}
            </a>
          </div>

          <div className="credit-item">
            <strong>AI Assistance:</strong>
            <ul className="credit-list">
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
            >
              {credits.originalGame.name}
            </a>{" "}
            by{" "}
            <a
              href={credits.originalGame.authorLink}
              target="_blank"
              rel="noopener noreferrer"
              className="credit-link"
            >
              {credits.originalGame.author}
            </a>
          </div>

          <div className="credit-item">
            <strong>Acknowledgements:</strong>
            <ul className="credit-list">
              {credits.acknowledgements.map((ack, index) => (
                <li key={index}>{ack}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
