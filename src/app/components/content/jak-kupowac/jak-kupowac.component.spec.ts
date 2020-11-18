import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JakKupowacComponent } from './jak-kupowac.component';

describe('JakKupowacComponent', () => {
  let component: JakKupowacComponent;
  let fixture: ComponentFixture<JakKupowacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JakKupowacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JakKupowacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
