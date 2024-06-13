import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgcComponent } from './add-agc.component';

describe('AddAgcComponent', () => {
  let component: AddAgcComponent;
  let fixture: ComponentFixture<AddAgcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAgcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAgcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
