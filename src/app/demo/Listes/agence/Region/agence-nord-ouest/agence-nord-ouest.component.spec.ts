import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceNordOuestComponent } from './agence-nord-ouest.component';

describe('AgenceNordOuestComponent', () => {
  let component: AgenceNordOuestComponent;
  let fixture: ComponentFixture<AgenceNordOuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgenceNordOuestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgenceNordOuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
