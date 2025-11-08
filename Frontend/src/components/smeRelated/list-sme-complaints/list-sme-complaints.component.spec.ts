import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSmeComplaintsComponent } from './list-sme-complaints.component';

describe('ListSmeComplaintsComponent', () => {
  let component: ListSmeComplaintsComponent;
  let fixture: ComponentFixture<ListSmeComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSmeComplaintsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSmeComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
