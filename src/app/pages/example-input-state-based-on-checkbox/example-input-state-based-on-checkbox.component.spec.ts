import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleInputStateBasedOnCheckboxComponent } from './example-input-state-based-on-checkbox.component';

describe('ExampleInputStateBasedOnCheckboxComponent', () => {
  let component: ExampleInputStateBasedOnCheckboxComponent;
  let fixture: ComponentFixture<ExampleInputStateBasedOnCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleInputStateBasedOnCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleInputStateBasedOnCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
