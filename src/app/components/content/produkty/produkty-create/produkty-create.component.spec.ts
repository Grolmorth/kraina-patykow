import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktyCreateComponent } from './produkty-create.component';

describe('ProduktyCreateComponent', () => {
  let component: ProduktyCreateComponent;
  let fixture: ComponentFixture<ProduktyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduktyCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduktyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
