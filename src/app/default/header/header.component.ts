import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone : true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: string = 'Sistema de Citas Medicas';

  @Output() logoutClicked = new EventEmitter<void>();

  logout() {
    this.logoutClicked.emit();
  }
  
}
