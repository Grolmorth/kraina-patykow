import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OFirmieComponent } from './o-firmie.component';

describe('OFirmieComponent', () => {
  let component: OFirmieComponent;
  let fixture: ComponentFixture<OFirmieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OFirmieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OFirmieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
