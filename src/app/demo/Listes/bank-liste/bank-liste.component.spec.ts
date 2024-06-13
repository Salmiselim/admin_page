import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankListeComponent } from './bank-liste.component';

describe('BankListeComponent', () => {
  let component: BankListeComponent;
  let fixture: ComponentFixture<BankListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
