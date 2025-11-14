import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeLoginComponent } from './sme-login.component';

describe('SmeLoginComponent', () => {
  let component: SmeLoginComponent;
  let fixture: ComponentFixture<SmeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmeLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
