import { IGameData } from './interfaces';

export const DefaultGameData: IGameData = {
  currentValue: 0,
  currentIndex: 0,
  isFinished: false,
  isWinner: false,
  shouldSwitchUser: false,
  user1: {
    collected: 0,
    items: [4, 4, 4, 4, 4, 4],
    isActive: true
  },
  user2: {
    collected: 0,
    items: [4, 4, 4, 4, 4, 4],
    isActive: false
  },
  shouldGrabOpposite: false,
  grabIndex: 0
};
