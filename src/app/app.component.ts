import { Component, isDevMode } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './_shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'coins-collection-web';
}
