import { Component, OnInit } from '@angular/core';

// Importa o Core do Firebase.
import { initializeApp } from 'firebase/app';

// Importe apenas os componentes que forem necessários.
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

// Environment contém as configurações do Firebase e de autenticação.
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // Inicializa core do Firebase.
  app = initializeApp(environment.firebase);

  // Inicializa Authentication.
  auth = getAuth(this.app);

  // Model do usuário.
  user!: User;

  // Cumprimenta o usuário.
  userGreeting = 'Perfil de Usuário';

  // Controla a view HTML.
  view = false;

  // Configurações.
  env = environment;

  constructor() { }

  ngOnInit() {

    // Monitora status do usuário.
    onAuthStateChanged(this.auth, (userData) => {

      if (userData) {

        // Se usuário está logado.
        this.user = userData;
        this.view = true;

        // Cumprimentar usuário.
        this.userGreeting = 'Olá ' + this.user.displayName?.split(' ')[0];

      } else {

        // Se não está logado, redireciona, por exemplo, para 'login'.
        location.href = '/';
      }
    });
  }

  // Logout do usuário.
  logout() {
    this.auth.signOut();
    location.href = '/';
  }

  // Acessa o perfil do usuário no Google.
  toGoogleProfile() {
    window.open('https://myaccount.google.com/', 'blank');
  }

}
