import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingViewComponent } from './upcoming-view.component';

describe('UpcomingViewComponent', () => {
  let component: UpcomingViewComponent;
  let fixture: ComponentFixture<UpcomingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
