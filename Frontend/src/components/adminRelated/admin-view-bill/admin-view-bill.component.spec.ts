import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewBillComponent } from './admin-view-bill.component';

describe('AdminViewBillComponent', () => {
  let component: AdminViewBillComponent;
  let fixture: ComponentFixture<AdminViewBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewBillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminViewBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
