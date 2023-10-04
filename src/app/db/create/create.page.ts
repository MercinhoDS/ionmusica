import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDocs, getFirestore, deleteDoc } from "firebase/firestore";

// Importa lista de documentos "fake".
import { things } from "../data";

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  // Inicializa Firebase.
  app = initializeApp(environment.firebase);

  // Inicializa Authentication.
  auth = getAuth(this.app);

  // Controla a view.
  view = false;

  // Inicializa Firestore.
  db = getFirestore(this.app);

  // Define a coleção.
  myCollection = collection(this.db, environment.dbCollection);

  // Lista de documentos adicionados.
  docList: string[] = [];

  constructor() { }

  ngOnInit() {

    // Se estiver no modo de produção, vai para a 'home'.
    if (environment.production == true) location.href = '/';

    // Monitora status do usuário.
    onAuthStateChanged(this.auth, (user) => {

      // Se usuário está logado, mostra a view.
      if (user) this.view = true;

      // Se não está logado, vai para a 'home'.
      else location.href = '/';
    });

  }

  populate() {

    // Obtém todos os documentos que já existem na coleção.
    getDocs(this.myCollection)

      // Apaga todos.
      .then(docData => docData.forEach(doc => deleteDoc(doc.ref)))

      // Se ocorrer erro, exibe no console.
      .catch(err => console.error(err))

      // Quando concluir.
      .finally(() => {

        // Obtém a lista de documentos e adiciona à coleção.
        things.forEach(async (itemData: any) =>
          addDoc(this.myCollection, itemData).then(x => this.docList.push(x.id))
        );

      });

  }
}