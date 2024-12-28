import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ComparisonValidatorDirective } from '../../directives/comparison-validator.directive';

@Component({
  selector: 'app-comparison-example',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ComparisonValidatorDirective],
  templateUrl: './comparison-example.component.html',
  styleUrl: './comparison-example.component.scss',
})
export class ComparisonExampleComponent {
  passwordForm = new FormGroup({
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required),
  });

  billForm = new FormGroup({
    received: new FormControl(null, Validators.required),
    refund: new FormControl(null, Validators.required),
  });
}
