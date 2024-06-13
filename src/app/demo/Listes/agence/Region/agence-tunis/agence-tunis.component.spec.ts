import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceTunisComponent } from './agence-tunis.component';

describe('AgenceTunisComponent', () => {
  let component: AgenceTunisComponent;
  let fixture: ComponentFixture<AgenceTunisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgenceTunisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgenceTunisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
