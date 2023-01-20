import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GameService } from './game.service';
import { DefaultGameData, IGameData } from './common';

describe('AppComponent', () => {
  const data: IGameData = DefaultGameData;

  const dataAfterFirstUserClick: IGameData = {
    currentValue: 0,
    currentIndex: 2,
    isFinished: false,
    isWinner: false,
    shouldSwitchUser: false,
    user1: {
      collected: 1,
      items: [5, 5, 0, 4, 4, 4],
      isActive: false
    },
    user2: {
      collected: 0,
      items: [4, 4, 4, 4, 4, 5],
      isActive: true
    },
    shouldGrabOpposite: false,
    grabIndex: 0
  };

  const dataAfterSecondUserClick: IGameData = {
    currentValue: 0,
    currentIndex: 1,
    isFinished: false,
    isWinner: false,
    shouldSwitchUser: false,
    user1: {
      collected: 1,
      items: [5, 5, 0, 4, 5, 5],
      isActive: true
    },
    user2: {
      collected: 1,
      items: [5, 0, 4, 4, 4, 5],
      isActive: false
    },
    shouldGrabOpposite: false,
    grabIndex: 0
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        GameService
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have gameData`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.gameData).toEqual(data);
  });

  it(`should change gameData after user click`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.gameData).toEqual(data);

    app.clickUserItem(2, data.user1, data.user2);
    expect(app.gameData).toEqual(dataAfterFirstUserClick);

    app.clickUserItem(1, data.user2, data.user1);
    expect(app.gameData).toEqual(dataAfterSecondUserClick);
  });

});
