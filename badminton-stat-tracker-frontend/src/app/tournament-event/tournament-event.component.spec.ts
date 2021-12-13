import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentEventComponent } from './tournament-event.component';

describe('TournamentEventComponent', () => {
  let component: TournamentEventComponent;
  let fixture: ComponentFixture<TournamentEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
