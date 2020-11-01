import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavItemDisplayComponent } from './nav-item-display.component';

describe('NavItemDisplayComponent', () => {
  let component: NavItemDisplayComponent;
  let fixture: ComponentFixture<NavItemDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavItemDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavItemDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
