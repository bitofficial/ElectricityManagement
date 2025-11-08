import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComplaintComponent } from './search-complaint.component';

describe('SearchComplaintComponent', () => {
  let component: SearchComplaintComponent;
  let fixture: ComponentFixture<SearchComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComplaintComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
