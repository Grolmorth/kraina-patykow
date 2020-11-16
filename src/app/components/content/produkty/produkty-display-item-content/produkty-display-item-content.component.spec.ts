import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktyDisplayItemContentComponent } from './produkty-display-item-content.component';

describe('ProduktyDisplayItemContentComponent', () => {
  let component: ProduktyDisplayItemContentComponent;
  let fixture: ComponentFixture<ProduktyDisplayItemContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduktyDisplayItemContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduktyDisplayItemContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
