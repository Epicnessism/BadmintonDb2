import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSeedViewComponent } from './event-seed-view.component';

describe('EventSeedViewComponent', () => {
  let component: EventSeedViewComponent;
  let fixture: ComponentFixture<EventSeedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSeedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSeedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
