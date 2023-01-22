import { Component } from '@angular/core';
import { GameService } from './game.service';
import { IGameData, IUserData } from './common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public gameData: IGameData = this.gameService.gameData;

  constructor(
    public gameService: GameService
  ) {}

  public clickUserItem(index: number, activeUser: IUserData, nonActiveUser: IUserData): void {
    this.gameService.clickUserItem(index, activeUser, nonActiveUser);
  }
}
