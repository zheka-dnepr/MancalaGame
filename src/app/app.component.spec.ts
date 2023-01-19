import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GameService } from './game.service';

describe('AppComponent', () => {
  const data = {
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

  const dataAfterFirstUserClick = {
    currentValue: 0,
    currentIndex: 3,
    isFinished: false,
    isWinner: false,
    activeUser: 1,
    shouldSwitchUser: false,
    user1: [5, 5, 5, 0, 4, 4],
    user2: [4, 4, 4, 4, 4, 4],
    user1Collected: 1,
    user2Collected: 0
  };

  const dataAfterSecondUserClick = {
    currentValue: 0,
    currentIndex: 2,
    isFinished: false,
    isWinner: false,
    activeUser: 1,
    shouldSwitchUser: false,
    user1: [4, 5, 5, 5, 5, 1],
    user2: [5, 5, 0, 4, 4, 4],
    user1Collected: 0,
    user2Collected: 1
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

  it(`should change gameData after first user click`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.gameData).toEqual(data);

    app.clickUser1Item(3);
    expect(app.gameData).toEqual(dataAfterFirstUserClick);
  });

  it(`should change gameData after second user click`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.gameData).toEqual(data);

    app.clickUser1Item(5);
    app.clickUser2Item(2);
    expect(app.gameData).toEqual(dataAfterSecondUserClick);
  });

});
