import { Routes } from '@angular/router';
import { ExampleInputStateBasedOnCheckboxComponent } from './pages/example-input-state-based-on-checkbox/example-input-state-based-on-checkbox.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'example-custom-form-state-directive',
        component: ExampleInputStateBasedOnCheckboxComponent
    }
];
