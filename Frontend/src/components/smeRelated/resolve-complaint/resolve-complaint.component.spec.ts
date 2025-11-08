import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveComplaintComponent } from './resolve-complaint.component';

describe('ResolveComplaintComponent', () => {
  let component: ResolveComplaintComponent;
  let fixture: ComponentFixture<ResolveComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolveComplaintComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResolveComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
