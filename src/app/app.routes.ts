import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'example-custom-form-state-directive',
    loadComponent: () =>
      import('./pages/example-input-state-based-on-checkbox/example-input-state-based-on-checkbox.component').then(
        (c) => c.ExampleInputStateBasedOnCheckboxComponent,
      ),
  },
  {
    path: 'example-force-disable',
    loadComponent: () =>
      import('./examples/force-disable/force-disable.component').then((c) => c.ForceDisableComponent),
  },
  {
    path: 'example-comparison',
    loadComponent: () =>
      import('./examples/comparison-example/comparison-example.component').then((c) => c.ComparisonExampleComponent),
  },
];
