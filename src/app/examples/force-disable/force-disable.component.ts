import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ForceInputDisableState } from '../../directives/force-disable-directive';

@Component({
  selector: 'app-force-disable',
  imports: [ForceInputDisableState, ReactiveFormsModule, MatFormFieldModule, MatInputModule, JsonPipe],
  templateUrl: './force-disable.component.html',
  styleUrl: './force-disable.component.scss',
})
export class ForceDisableComponent {
  demoForm = new FormGroup({
    default: new FormControl({ value: 'Default Behavior', disabled: true }),
    ng: new FormControl({ value: 'Manage By Ng', disabled: true }),
    dom: new FormControl({ value: 'Manage By DOM', disabled: true }),
    both: new FormControl({ value: 'Manage By Both', disabled: true }),
  });
}
