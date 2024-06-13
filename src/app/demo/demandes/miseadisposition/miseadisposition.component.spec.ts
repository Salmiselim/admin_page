import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiseadispositionComponent } from './miseadisposition.component';

describe('MiseadispositionComponent', () => {
  let component: MiseadispositionComponent;
  let fixture: ComponentFixture<MiseadispositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiseadispositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiseadispositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
