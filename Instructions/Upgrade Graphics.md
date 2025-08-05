I want to change the graphics from using icons as defined in the JSON const
export const ICONS = {
  empty: "",
  player: "🧑",
  rock: "🧱",
  soil: "🟫",
  diamond: "💎",
  boulder: "🪨",
  bomb: "💣",
  exit: "🚪",
} as const;

to use 32x32 pixel png files as described in the public folder

The files map to the icons as follows

empty = empty.png
player  = player.png
rock = rock.png
soil = soil.png
diamond = diamond.png
boulder = boulder.png
bomb = bomb.png
exit = exit.png

The maze is already configured to use 32x32 cells.

The png files should be packaged and distributed when the game is built.