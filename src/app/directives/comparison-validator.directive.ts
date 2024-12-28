import { Directive, input } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

type IComparisonOperation = 'EQ' | 'LT' | 'GT' | 'LTEQ' | 'GTEQ';

@Directive({
  selector: '[compareWith]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ComparisonValidatorDirective,
      multi: true,
    },
  ],
})
export class ComparisonValidatorDirective implements Validator {
  compareWith = input.required<string | AbstractControl>();
  operation = input<IComparisonOperation>('EQ');

  private getParent(control: AbstractControl) {
    return control.parent || null;
  }

  private getControlToCompare(control: string | AbstractControl, parent: FormGroup<any> | FormArray<any> | null) {
    if (typeof control === 'string') {
      return parent?.get(control) || null;
    }
    return control;
  }

  private isConditionMet(value: string | number | boolean, compareWithValue: string | number | boolean) {
    switch (this.operation()) {
      case 'EQ':
        return value === compareWithValue;
      case 'GT':
        return Number(value) > Number(compareWithValue);

      case 'LT':
        return Number(value) < Number(compareWithValue);

      case 'GTEQ':
        return Number(value) >= Number(compareWithValue);

      case 'LTEQ':
        return Number(value) <= Number(compareWithValue);

      default:
        console.error(`Unsupported operation: ${this.operation()}`);
        return false;
    }
  }

  private isNumber(value: unknown) {
    return !Number.isNaN(Number(value));
  }

  private isOperationValid(value1: unknown, value2: unknown) {
    if (this.operation() !== 'EQ' && !this.isNumber(value1) && !this.isNumber(value2)) {
      console.error(`Operations other than 'EQ' can only be performed on numeric values`);
      return false;
    }
    return true;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const parent = this.getParent(control);
    const compareControl = this.getControlToCompare(this.compareWith(), parent);
    if (!compareControl) {
      console.warn(`Comparison control not found`);
      return null;
    }

    if (!compareControl.value || !control.value) {
      return null;
    }

    if (!this.isOperationValid(control.value, compareControl.value)) return null;

    return this.isConditionMet(control.value, compareControl.value)
      ? null
      : { comparison: { failedOperation: this.operation(), expectedValue: compareControl.value } };
  }
}
