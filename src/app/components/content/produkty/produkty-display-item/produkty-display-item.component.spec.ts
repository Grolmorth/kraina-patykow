import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktyDisplayItemComponent } from './produkty-display-item.component';

describe('ProduktyDisplayItemComponent', () => {
  let component: ProduktyDisplayItemComponent;
  let fixture: ComponentFixture<ProduktyDisplayItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduktyDisplayItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduktyDisplayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
