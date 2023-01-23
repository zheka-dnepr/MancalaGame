import { Component } from '@angular/core';
import { GameService } from './game.service';
import { IGameData, IUserData } from './common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /** set data at the start of the game */
  public gameData: IGameData = this.gameService.gameData;

  constructor(
    public gameService: GameService
  ) {}

  /** method fires after user clicks on item */
  public clickUserItem(index: number, activeUser: IUserData, nonActiveUser: IUserData): void {
    this.gameService.clickUserItem(index, activeUser, nonActiveUser);
  }
}
