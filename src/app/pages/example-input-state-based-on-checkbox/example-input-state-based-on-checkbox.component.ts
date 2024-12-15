import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControlStateTogglerDirective, IControlStateChanged } from '../../directives/form-control-state-toggler.directive';
import { TextFieldModule } from '@angular/cdk/text-field';

interface IFoodForm {
  hasFavFood: FormControl<boolean | null>;
  favFood: FormControl<string | null>;
}

@Component({
  selector: 'app-example-input-state-based-on-checkbox',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    TextFieldModule,
    ReactiveFormsModule,
    FormControlStateTogglerDirective,
  ],
  templateUrl: './example-input-state-based-on-checkbox.component.html',
  styleUrl: './example-input-state-based-on-checkbox.component.scss',
})
export class ExampleInputStateBasedOnCheckboxComponent {
  foodFormEx1 = new FormGroup<IFoodForm>({
    hasFavFood: new FormControl(false),
    favFood: new FormControl(''),
  });

  foodFormEx2 = new FormGroup<IFoodForm>({
    hasFavFood: new FormControl(true),
    favFood: new FormControl(''),
  });

  stateChange(event: IControlStateChanged,exampleNo:number) {
    console.log(`Example ${exampleNo} :`,event);
  }
}
