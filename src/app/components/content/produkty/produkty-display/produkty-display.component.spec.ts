import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktyDisplayComponent } from './produkty-display.component';

describe('ProduktyDisplayComponent', () => {
  let component: ProduktyDisplayComponent;
  let fixture: ComponentFixture<ProduktyDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduktyDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduktyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
