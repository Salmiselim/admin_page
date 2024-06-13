import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBqComponent } from './edit-bq.component';

describe('EditBqComponent', () => {
  let component: EditBqComponent;
  let fixture: ComponentFixture<EditBqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditBqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
