import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

// Core do Firebase.
import { initializeApp } from 'firebase/app';
import {
  getAuth, 			      // Inicializa auth
  onAuthStateChanged, // Monitora status da auth
  GoogleAuthProvider, // Login → Login com Google
  signInWithPopup,	  // Login → Login com popup
  signInWithRedirect, // Login → Login com redirecionamento
  getRedirectResult, 	// Login → Status do redirecionamento
} from 'firebase/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Inicializa core do Firebase.
  app = initializeApp(environment.firebase);

  // Inicializa Authentication.
  auth = getAuth(this.app);

  // Define o provedor de autenticação. Usado no processo de login.
  provider = new GoogleAuthProvider();

  view = false;

  constructor() { }

  ngOnInit() {
    // Monitora status do usuário.
    onAuthStateChanged(this.auth, (user) => {

      // Se usuário está logado, manda para perfil.
      if (user) location.href = '/';
      else this.view = true;
    });
  }

  login() {

    // Seleciona o método de login conforme "environment".
    if (environment.signInMethod == 'popup')
      signInWithPopup(this.auth, this.provider)
    else {
      signInWithRedirect(this.auth, this.provider)
    }
  }

}
