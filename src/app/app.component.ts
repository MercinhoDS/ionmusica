import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: 'home', icon: 'home' },
    { title: 'Contatos', url: 'contacts', icon: 'mail' },
    { title: 'Sobre', url: 'about', icon: 'information-circle' },
    { title: 'Politicas', url: 'polices', icon: 'lock-closed' },
    { title: 'Autores', url: '', icon: 'people'},
    
  ];
  
  constructor() {}
}
