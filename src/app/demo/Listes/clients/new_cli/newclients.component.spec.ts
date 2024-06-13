import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewclientsComponent } from './newclients.component';

describe('NewclientsComponent', () => {
  let component: NewclientsComponent;
  let fixture: ComponentFixture<NewclientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewclientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewclientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
