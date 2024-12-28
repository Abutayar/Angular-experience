import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonExampleComponent } from './comparison-example.component';

describe('ComparisonExampleComponent', () => {
  let component: ComparisonExampleComponent;
  let fixture: ComponentFixture<ComparisonExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparisonExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
