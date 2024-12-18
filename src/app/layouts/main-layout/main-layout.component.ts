import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, MatSidenavModule, MatIconModule, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
