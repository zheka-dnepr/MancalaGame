import { Component } from '@angular/core';
import { GameService } from './game.service';
import { IGameData } from './common';

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

  public clickUser1Item(index: number): void {
    this.gameData = this.gameService.clickUser1Item(index);
  }

  public clickUser2Item(index: number): void {
    this.gameData = this.gameService.clickUser2Item(index);
  }
}
