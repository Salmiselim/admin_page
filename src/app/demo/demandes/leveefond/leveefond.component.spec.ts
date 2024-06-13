import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeveefondComponent } from './leveefond.component';

describe('LeveefondComponent', () => {
  let component: LeveefondComponent;
  let fixture: ComponentFixture<LeveefondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeveefondComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeveefondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
