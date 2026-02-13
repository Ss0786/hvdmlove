
export enum SlideId {
  WELCOME = 0,
  PROPOSAL = 1,
  FINALE = 2
}

export interface PetalProps {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
}
