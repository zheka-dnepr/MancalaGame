import { Injectable } from '@angular/core';
import { IGameData } from './common';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public gameData: IGameData = {
    currentValue: 0,
    currentIndex: 0,
    isFinished: false,
    isWinner: false,
    activeUser: 1,
    shouldSwitchUser: false,
    user1: [4, 4, 4, 4, 4, 4],
    user2: [4, 4, 4, 4, 4, 4],
    user1Collected: 0,
    user2Collected: 0
  };

  public clickUser1Item(index: number): IGameData {
    this.gameData.currentIndex = index;
    this.gameData.currentValue = this.gameData.user1[this.gameData.currentIndex];
    if (this.gameData.activeUser !== 1 || !this.gameData.currentValue) return this.gameData;
    this.gameData.shouldSwitchUser = true;

    this.gameData.user1 = this._checkFirstRound(this.gameData.user1);

    if (this.gameData.currentValue) {
      this.gameData.user1Collected++;
      this.gameData.currentValue--;
    } else {
      this.gameData.activeUser = 2;
      return this.gameData;
    }
    if (this.gameData.currentValue) {
      this.gameData.user2 = this._checkOppositeUser(this.gameData.user2);

      if (this.gameData.currentValue) {
        this.gameData.user1 = this._checkSecondRound(this.gameData.user1);
      }
    } else {
      this.gameData.shouldSwitchUser = false;
    }

    this._checkForSwitchUser(2);
    this._checkForWin();

    return this.gameData;
  }

  public clickUser2Item(index: number): IGameData {
    this.gameData.currentIndex = index;
    this.gameData.currentValue = this.gameData.user2[this.gameData.currentIndex];
    if (this.gameData.activeUser !== 2 || !this.gameData.currentValue) return this.gameData;
    this.gameData.shouldSwitchUser = true;

    this.gameData.user2 = this._checkFirstRound(this.gameData.user2);

    if (this.gameData.currentValue) {
      this.gameData.user2Collected++;
      this.gameData.currentValue--;
    } else {
      this.gameData.activeUser = 1;
      return this.gameData;
    }

    if (this.gameData.currentValue) {
      this.gameData.user1 = this._checkOppositeUser(this.gameData.user1);

      if (this.gameData.currentValue) {
        this.gameData.user2 = this._checkSecondRound(this.gameData.user2);
      }
    } else {
      this.gameData.shouldSwitchUser = false;
    }

    this._checkForSwitchUser(1);
    this._checkForWin();

    return this.gameData;
  }

  private _checkFirstRound(user: number[]): number[] {
    let add = (this.gameData.currentIndex - this.gameData.currentValue) > 0 ?
      (this.gameData.currentIndex - this.gameData.currentValue) : 0;
    user = user.map((item, i) => {
      if (i == this.gameData.currentIndex) {
        return 0;
      } else if (this.gameData.currentValue && i < this.gameData.currentIndex && i >= add) {
        this.gameData.currentValue--;
        return item + 1;
      }
      return item;
    });
    return user;
  }

  private _checkOppositeUser(user: number[]): number[] {
    user = user.reverse().map((item) => {
      if (this.gameData.currentValue) {
        this.gameData.currentValue--;
        return item + 1;
      }
      return item;
    });
    user = user.reverse();
    return user;
  }

  private _checkSecondRound(user: number[]): number[] {
    let secondAdd = (user.length - this.gameData.currentValue) > 0 ?
      (user.length - this.gameData.currentValue) : 0;
    user = user.map((item, i) => {
      if (this.gameData.currentValue && i >= secondAdd) {
        this.gameData.currentValue--;
        return item + 1;
      }
      return item;
    });
    return user;
  }

  private _checkForSwitchUser(setActive: number): void {
    if (this.gameData.shouldSwitchUser) {
      this.gameData.activeUser = setActive;
      this.gameData.shouldSwitchUser = false;
    }
  }

  private _checkForWin(): void {
    let user1RocksCount = this.gameData.user1.reduce((a, b) => a + b);
    let user2RocksCount = this.gameData.user2.reduce((a, b) => a + b);
    if (!user1RocksCount || !user2RocksCount) {
      this.gameData.user1Collected = this.gameData.user1Collected + user1RocksCount;
      this.gameData.user2Collected = this.gameData.user2Collected + user2RocksCount;
      this.gameData.user1 = [0, 0, 0, 0, 0, 0];
      this.gameData.user2 = [0, 0, 0, 0, 0, 0];
      this.gameData.isFinished = true;
      this.gameData.isWinner = this.gameData.user1Collected > this.gameData.user2Collected;
      this.gameData.activeUser = 0;
    }
  }
}

