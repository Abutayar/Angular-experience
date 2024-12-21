import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceDisableComponent } from './force-disable.component';

describe('ForceDisableComponent', () => {
  let component: ForceDisableComponent;
  let fixture: ComponentFixture<ForceDisableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForceDisableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForceDisableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
