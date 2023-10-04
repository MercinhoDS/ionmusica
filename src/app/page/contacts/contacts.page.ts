import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  // Inicializa core do Firebase.
  app = initializeApp(environment.firebase);

  // Inicializa Authentication.
  auth = getAuth(this.app);

  // Inicializa o Firestore.
  db = getFirestore(this.app);

  // Define a coleção onde os contatos são armazenados.
  contactCollection = collection(this.db, environment.contactCollection);

  env = environment;

  // Model do formulário.
  form = {
    date: '',           // Data de envio do contato.
    name: '',
    email: '',
    subject: '',
    message: '',
    status: 'received'  // Situação do contato [received, readed, answered, deleted]
  }

  // Formulário ainda não foi enviado.
  sended = false;

  constructor() { }

  ngOnInit() {

    // Monitora usuário logado.
    onAuthStateChanged(this.auth, (userData) => {
      if (userData) {
        this.form.name = userData.displayName + '';
        this.form.email = userData.email + '';
      }
    });

  }

  sendForm() {

    // Regex para validar e-mail (HTML5 → RFC5322).
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/;

    // Valida campos do formulário usando 'stripTags()' e regex.
    if (
      this.stripTags(this.form.name).length < 3 ||          // 'name' → com menos de 3 caracteres.
      !regexEmail.test(this.stripTags(this.form.email)) ||  // 'email' → não respeita a regex.
      this.stripTags(this.form.subject).length < 3 ||       // 'subject' → com menos de 3 caracteres.
      this.stripTags(this.form.message).length < 5          // 'message' → com menos de 5 caracteres.
    ) return false;                                         // Retorna sem fazer nada.

    // Gera a data atual no formato ISO (yyyy-MM-dd HH:mm).
    const d = new Date();
    this.form.date = d.toISOString().split('.')[0].replace('T', ' ');

    // Salva formulário no banco de dados.
    addDoc(this.contactCollection, this.form)
      .then((data) => {
        console.log('Contato salvo com o Id: ' + data.id);
        this.sended = true;
      })
      .catch((error) => {
        console.error(error);
      });

    return true;
  }

  // Remove códigos JavaScript e tags HTML da string.
  stripTags(htmlText: string) {
    let div = document.createElement('div');
    div.innerHTML = htmlText.trim().replace(/<script>.*<\/script>/, '');
    return div.textContent || '';
  }

}
