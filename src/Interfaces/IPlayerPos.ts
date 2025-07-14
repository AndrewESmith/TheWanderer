export interface IPlayerPos {
  x: number;
  y: number;
  // Static method signature (for class static implementation)
  // Note: interfaces can't enforce static methods directly, but you can use a workaround with a separate interface if needed
}
export interface IPlayerPosStatic {
  getPlayerPos(maze: string[][]): IPlayerPos | null;
}

