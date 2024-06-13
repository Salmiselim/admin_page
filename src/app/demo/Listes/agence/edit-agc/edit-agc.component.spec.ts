import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAgcComponent } from './edit-agc.component';

describe('EditAgcComponent', () => {
  let component: EditAgcComponent;
  let fixture: ComponentFixture<EditAgcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAgcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAgcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
