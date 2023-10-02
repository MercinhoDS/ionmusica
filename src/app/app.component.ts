import { Component, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

// Menu principal.
export class AppComponent {

  // Variáveis de ambiente.
  env = environment;

  public appPages = [
    { title: 'Início', url: 'home', icon: 'home' },
    { title: 'Contatos', url: 'contacts', icon: 'mail' },
    { title: 'Sobre', url: 'about', icon: 'information-circle' },
    { title: 'Autores', url: 'author', icon: 'people' },
    { title: 'Privacidade', url: 'polices', icon: 'lock-closed' }
  ];

  constructor() { }
}
