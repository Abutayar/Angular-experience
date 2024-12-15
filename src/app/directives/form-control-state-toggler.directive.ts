import { Directive, inject, input, OnDestroy, OnInit, output, Self } from '@angular/core';
import { AbstractControl, FormGroup, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

export interface IControlStateChanged {
  isDisabled: boolean;
}

@Directive({
  selector: '[formControlStateToggler]', // Updated to the more concise name
  standalone: true,
})
export class FormControlStateTogglerDirective implements OnInit, OnDestroy {
  private readonly control = inject(NgControl, {
    self: true,
  });
  formControlStateToggler = input.required<string>(); // The control that will trigger enabling/disabling
  reverse = input(false);
  shouldClearOnDisabled = input(true);
  stateChange = output<IControlStateChanged>();
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.manageControlState();
  }

  // Method to enable or disable the target control
  private manageControlState(): void {
    const parentFormGroup: FormGroup = this.control?.control?.parent as FormGroup;

    if (!parentFormGroup) {
      console.error('Parent form group not found');
      return; // Ensure that the control has a parent FormGroup
    }

    const dependentControl = parentFormGroup.get(this.formControlStateToggler());
    const targetControl = this.control.control;

    if (!dependentControl || !targetControl) {
      console.error('Invalid form control names provided in the directive.');
      return;
    }

    this.updateControlState(dependentControl.value, targetControl);

    /** Subscribing to value changes of the dependent control to
     *  dynamically update the state of the target control. */
    const sub = dependentControl.valueChanges.subscribe((value) => {
      this.updateControlState(value, targetControl);
    });

    

    this.subscription.add(sub);
  }

  private updateControlState(value: any, targetControl: AbstractControl) {
    /** Determine whether to enable or disable the target control
     *  based on the dependent control's value and the reverse option. */
    const shouldEnable = this.reverse() ? !value : value;

    // Enable or disable the target control accordingly.
    shouldEnable ? targetControl.enable() : targetControl.disable();

    // Emit an event to notify listeners of the target control's updated state.
    this.emitState(!shouldEnable);

    /** If the target control is disabled
     *  and the 'shouldClearOnDisabled' flag is true,
     *  clear the value of the target control by setting it to null. */
    if (!shouldEnable && this.shouldClearOnDisabled()) targetControl.setValue(null);
  }

  private emitState(isDisabled: boolean) {
    this.stateChange.emit({ isDisabled });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
