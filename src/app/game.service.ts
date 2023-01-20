import { Injectable } from '@angular/core';
import { DefaultGameData, IGameData, IUserData } from './common';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public gameData: IGameData = DefaultGameData;

  public clickUserItem(index: number, activeUser: IUserData, nonActiveUser: IUserData): IGameData {
    // return if a user is not active or the item has no value
    if (!activeUser.isActive || !activeUser.items[index]) return this.gameData;

    // set clicked item as current
    this._setCurrentItem(index, activeUser);

    // set user items first time
    activeUser = this._checkFirstRound(activeUser);

    // check if you need to grab opposite item
    // this._grabOpposite(activeUser, nonActiveUser);

    // collect rocks or switch user
    if (this.gameData.currentValue) {
      this._collect(activeUser);
    } else {
      this._checkForSwitchUser(activeUser, nonActiveUser);
      return this.gameData;
    }

    if (this.gameData.currentValue) {
      // set opposite user items
      nonActiveUser = this._checkOppositeUser(nonActiveUser);

      // set user items second time
      if (this.gameData.currentValue) {
        activeUser = this._checkSecondRound(activeUser);
      }
    } else {
      this.gameData.shouldSwitchUser = false;
    }

    this._checkForSwitchUser(activeUser, nonActiveUser);
    this._checkForWin();
    this._clearData();
    return this.gameData;
  }

  private _setCurrentItem(index: number, activeUser: IUserData): void {
    this.gameData.currentIndex = index;
    this.gameData.currentValue = activeUser.items[this.gameData.currentIndex];
    this.gameData.shouldSwitchUser = true;
  }

  private _checkFirstRound(user: IUserData): IUserData {
    let add = (this.gameData.currentIndex - this.gameData.currentValue) > 0 ?
      (this.gameData.currentIndex - this.gameData.currentValue) : 0;
    user.items = user.items.map((item, i) => {
      if (i == this.gameData.currentIndex) {
        return 0;
      } else if (this.gameData.currentValue && i < this.gameData.currentIndex && i >= add) {
        this.gameData.currentValue--;
        // console.log('this.gameData.currentValue', this.gameData.currentValue)
        // console.log('item', item)
        if (!item && !this.gameData.currentValue) {
          // console.log('grab')
          this.gameData.shouldGrabOpposite = true;
          this.gameData.grabIndex = i;
        }
        return item + 1;
      }
      return item;
    });
    return user;
  }

  private _collect(user: IUserData): void {
    user.collected++;
    this.gameData.currentValue--;
  }

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

  private _checkSecondRound(user: IUserData): IUserData {
    let secondAdd = (user.items.length - this.gameData.currentValue) > 0 ?
      (user.items.length - this.gameData.currentValue) : 0;
    user.items = user.items.map((item, i) => {
      if (this.gameData.currentValue && i >= secondAdd) {
        this.gameData.currentValue--;
        return item + 1;
      }
      return item;
    });
    return user;
  }

  private _grabOpposite(activeUser: IUserData, nonActiveUser: IUserData): void {
    if (this.gameData.shouldGrabOpposite) {
      activeUser.items[this.gameData.grabIndex] = 0;
      activeUser.collected++;
      let opposite = nonActiveUser.items[nonActiveUser.items.length - this.gameData.grabIndex - 1];
      activeUser.collected = activeUser.collected + opposite;
      nonActiveUser.items[nonActiveUser.items.length - this.gameData.grabIndex - 1] = 0;
    }
  }

  private _checkForSwitchUser(activeUser: IUserData, nonActiveUser: IUserData): void {
    if (this.gameData.shouldSwitchUser) {
      activeUser.isActive = false;
      nonActiveUser.isActive = true;
      this.gameData.shouldSwitchUser = false;
    }
  }

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

  private _clearDataAfterFinish(): void {
    this.gameData.user1.items = [0, 0, 0, 0, 0, 0];
    this.gameData.user2.items = [0, 0, 0, 0, 0, 0];
    this.gameData.user1.isActive = false;
    this.gameData.user2.isActive = false;
  }

  private _clearData(): void {
    this.gameData.shouldGrabOpposite = false;
  }
}

