import { Injectable } from '@angular/core';
import { DefaultGameData, IGameData, IUserData } from './common';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  /** set data at the start of the game */
  public gameData: IGameData = DefaultGameData;

  /** method fires after user clicks on item */
  public clickUserItem(index: number, activeUser: IUserData, nonActiveUser: IUserData): void {
    /** return if a user is not active or the item has no value */
    if (!activeUser.isActive || !activeUser.items[index]) return;

    /** set clicked item as current */
    this._setCurrentItem(index, activeUser);

    /** add stones to your holes first time */
    activeUser = this._checkFirstRound(activeUser);

    /** check if you need to grab opposite stones */
    this._grabOpposite(activeUser, nonActiveUser);

    if (this.gameData.currentValue) {
      /** collect  stones in the store */
      this._collect(activeUser);
    } else {
      /** check if you need to switch active player */
      this._checkForSwitchUser(activeUser, nonActiveUser);
      return;
    }

    if (this.gameData.currentValue) {
      /** add stones to opposite user's holes */
      nonActiveUser = this._checkOppositeUser(nonActiveUser);

      /** add stones to your holes second time */
      if (this.gameData.currentValue) {
        activeUser = this._checkSecondRound(activeUser);
        /** check if you need to grab opposite stones */
        this._grabOpposite(activeUser, nonActiveUser);
      }
    } else {
      this.gameData.shouldSwitchUser = false;
    }
    /** check if you need to switch active player */
    this._checkForSwitchUser(activeUser, nonActiveUser);
    return;
  }

  /** set clicked item as current */
  private _setCurrentItem(index: number, activeUser: IUserData): void {
    this.gameData.currentIndex = index;
    this.gameData.currentValue = activeUser.items[this.gameData.currentIndex];
    this.gameData.firstValue = activeUser.items[this.gameData.currentIndex];
    this.gameData.shouldSwitchUser = true;
  }

  /** add stones to your holes first time */
  private _checkFirstRound(user: IUserData): IUserData {
    let add = (this.gameData.currentIndex - this.gameData.currentValue) > 0 ?
      (this.gameData.currentIndex - this.gameData.currentValue) : 0;
    user.items = user.items.map((item, i) => {
      if (i == this.gameData.currentIndex) {
        return 0;
      } else if (this.gameData.currentValue && i < this.gameData.currentIndex && i >= add) {
        this.gameData.currentValue--;
        if (!item && !(this.gameData.currentValue + 1 - this.gameData.firstValue)) {
          this.gameData.shouldGrabOpposite = true;
          this.gameData.grabIndex = i;
        }
        return item + 1;
      }
      return item;
    });
    return user;
  }

  /** collect  stones in the store */
  private _collect(user: IUserData): void {
    user.collected++;
    this.gameData.currentValue--;
  }

  /** add stones to opposite user's holes */
  private _checkOppositeUser(user: IUserData): IUserData {
    user.items = user.items.reverse().map((item) => {
      if (this.gameData.currentValue) {
        this.gameData.currentValue--;
        return item + 1;
      }
      return item;
    });
    user.items = user.items.reverse();
    return user;
  }

  /** add stones to your holes second time */
  private _checkSecondRound(user: IUserData): IUserData {
    let secondAdd = (user.items.length - this.gameData.currentValue) > 0 ?
      (user.items.length - this.gameData.currentValue) : 0;
    user.items = user.items.map((item, i) => {
      if (this.gameData.currentValue && i >= secondAdd) {
        this.gameData.currentValue--;
        if (!item && !(this.gameData.currentValue + 1 - this.gameData.firstValue)) {
          this.gameData.shouldGrabOpposite = true;
          this.gameData.grabIndex = i;
        }
        return item + 1;
      }
      return item;
    });
    return user;
  }

  /** check if you need to grab opposite stones */
  private _grabOpposite(activeUser: IUserData, nonActiveUser: IUserData): void {
    if (this.gameData.shouldGrabOpposite) {
      this.gameData.shouldGrabOpposite = false;
      let opposite = nonActiveUser.items[nonActiveUser.items.length - this.gameData.grabIndex - 1];
      if (opposite) {
        activeUser.items[this.gameData.grabIndex] = 0;
        activeUser.collected++;
        activeUser.collected = activeUser.collected + opposite;
        nonActiveUser.items[nonActiveUser.items.length - this.gameData.grabIndex - 1] = 0;
      }
    }
  }

  /** check if you need to switch active player */
  private _checkForSwitchUser(activeUser: IUserData, nonActiveUser: IUserData): void {
    if (this.gameData.shouldSwitchUser) {
      activeUser.isActive = false;
      nonActiveUser.isActive = true;
      this.gameData.shouldSwitchUser = false;
    }
    /** check if game is finished */
    this._checkForWin();
  }

  /** check if game is finished */
  private _checkForWin(): void {
    let user1RocksCount = this.gameData.user1.items.reduce((a, b) => a + b);
    let user2RocksCount = this.gameData.user2.items.reduce((a, b) => a + b);
    if (!user1RocksCount || !user2RocksCount) {
      this.gameData.user1.collected = this.gameData.user1.collected + user1RocksCount;
      this.gameData.user2.collected = this.gameData.user2.collected + user2RocksCount;
      this.gameData.isWinner = this.gameData.user1.collected > this.gameData.user2.collected;
      this.gameData.isFinished = true;
      this._clearDataAfterFinish();
    }
  }

  /** clear game data after finishing game */
  private _clearDataAfterFinish(): void {
    this.gameData.user1.items = [0, 0, 0, 0, 0, 0];
    this.gameData.user2.items = [0, 0, 0, 0, 0, 0];
    this.gameData.user1.isActive = false;
    this.gameData.user2.isActive = false;
  }
}

