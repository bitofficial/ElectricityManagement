import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConnectionComponent } from './manage-connection.component';

describe('ManageConnectionComponent', () => {
  let component: ManageConnectionComponent;
  let fixture: ComponentFixture<ManageConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageConnectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
