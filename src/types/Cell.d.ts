export type CellData = {
  type: "normal" | "entrance" | "exit";
  walls: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  }
}
