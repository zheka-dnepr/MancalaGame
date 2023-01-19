export interface IGameData {
  currentValue: number;
  currentIndex: number;
  isFinished: boolean;
  isWinner: boolean;
  activeUser: number;
  shouldSwitchUser: boolean;
  user1: number[];
  user2: number[];
  user1Collected: number;
  user2Collected: number;
}
