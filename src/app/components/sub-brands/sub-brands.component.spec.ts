import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubBrandsComponent } from './sub-brands.component';

describe('SubBrandsComponent', () => {
  let component: SubBrandsComponent;
  let fixture: ComponentFixture<SubBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubBrandsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
