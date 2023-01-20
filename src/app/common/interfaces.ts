export interface IGameData {
  currentValue: number;
  currentIndex: number;
  isFinished: boolean;
  isWinner: boolean;
  shouldSwitchUser: boolean;
  user1: IUserData;
  user2: IUserData;
  shouldGrabOpposite: boolean;
  grabIndex: number;
}

export interface IUserData {
  isActive: boolean;
  collected: number;
  items: number[];
}
