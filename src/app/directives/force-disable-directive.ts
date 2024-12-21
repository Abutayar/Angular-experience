import { Directive, ElementRef, inject, input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[forceInputDisable]',
})
export class ForceInputDisableState implements OnInit, OnDestroy {
  private readonly formControl = inject(NgControl);
  private readonly inputElement = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly subscriptions = new Subscription();
  method = input<'ng' | 'dom' | 'both'>('ng');

  ngOnInit(): void {
    if (!this.formControl.control) {
      console.warn('Form control is required for [disableInput] directive.');
      return;
    }

    switch (this.method()) {
      case 'ng':
        this.subscribeToStatusChanges();
        break;
      case 'dom':
        break;
      case 'both':
        this.subscribeToStatusChanges();
        this.enforceDisabledState();
        break;
      default:
        console.warn(`Invalid method: "${this.method}" for [forceInputDisable]. Using "ng" by default.`);
        this.subscribeToStatusChanges();
        break;
    }
  }

  private subscribeToStatusChanges(): void {
    const originalValue = this.formControl.control?.value;
    const statusChangesSubscription = this.formControl.statusChanges?.subscribe((status) => {
      if (status === 'DISABLED') {
        this.formControl.control?.setValue(originalValue);
        this.renderer.setAttribute(this.inputElement.nativeElement, 'disabled', 'true');
      } else {
        this.renderer.removeAttribute(this.inputElement.nativeElement, 'disabled');
      }
    });

    if (statusChangesSubscription) {
      this.subscriptions.add(statusChangesSubscription);
    }
  }

  private enforceDisabledState(): void {
    // Listen to DOM mutation events to detect manual changes to the disabled attribute
    const mutationObserver = new MutationObserver(() => {
      if (!this.inputElement.nativeElement.hasAttribute('disabled') && this.formControl.control?.disabled) {
        // Reapply the disabled attribute
        this.renderer.setAttribute(this.inputElement.nativeElement, 'disabled', 'true');
      }
    });

    mutationObserver.observe(this.inputElement.nativeElement, { attributes: true, attributeFilter: ['disabled'] });
    this.subscriptions.add({
      unsubscribe: () => mutationObserver.disconnect(),
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
