import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './default/header/header.component';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',

})
export class AppComponent {
  @Output() logoutClicked = new EventEmitter<void>();
  title = 'SISTEMA DE CITAS MEDICAS';
  hideMenu = false;

  constructor(
      private _auth: AuthService,
      private _router: Router
  ){}

  ngOnInit(): void {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const rutasPublicas = ['/login', '/registro'];
        const url = event.urlAfterRedirects || event.url;
        this.hideMenu = !rutasPublicas.some(r => url.startsWith(r));
      }
    });

    const initialUrl = this._router.url;
    const rutasPublicas = ['/login', '/registro'];
    this.hideMenu = !rutasPublicas.some(r => initialUrl.startsWith(r));
  }

  logout() {
    this._auth.logout();
    this._router.navigate(['/login']);
  }
}
