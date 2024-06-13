import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppelfondComponent } from './appelfond.component';

describe('AppelfondComponent', () => {
  let component: AppelfondComponent;
  let fixture: ComponentFixture<AppelfondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppelfondComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppelfondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
