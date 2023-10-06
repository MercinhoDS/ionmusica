import { Component, OnInit } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { collection, getCountFromServer, getFirestore, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // Variáveis de ambiente.
  env = environment;

  // Inicializa Firebase.
  app = initializeApp(environment.firebase);

  // Inicializa Cloud Firestore.
  db = getFirestore(this.app);

  // View dos documentos → html.
  docView: any[] = [];

  // Contagem de documentos.
  count = 0;

  // Controla a view.
  view = false;

  constructor() { }

  async ngOnInit() {

    // Montando consulta.
    /**
     * A consulta abaixo vai gerar um erro no primeiro acesso. Logue-se no 
     * Firebase.com. Em seguida, consulte o console e acesse o link do 
     * Firebase.com para gerar o índice da consulta. Quando o índice estiver 
     * pronto, a consulta funcionará normalmente.
     **/
    const q = query(

      // Seleciona banco de dados e coleção.
      collection(this.db, environment.dbCollection),

      // Cujo status não é 'off'.
      where('status', '!=', 'off'),

      // Índice da busca acima.
      orderBy('status'),

      // Ordenado pela 'date' mais recente.
      orderBy('date', 'desc')
    );

    // Contagem de documentos.
    const snapshot = await getCountFromServer(q);
    this.count = snapshot.data().count;

    // Se existem documentos.
    if (this.count > 0) {

      // Cria a lista de documentos.
      let docList: any[] = [];

      // Atualiza documentos em tempo real.
      onSnapshot(q, (querySnapshot) => {

        // Loop para obter documentos.
        querySnapshot.forEach((doc) => {

          // Armazena documento em 'docTemp'.
          let docTemp = doc.data();

          // Adiciona id ao documento em 'docTemp'.
          docTemp['id'] = doc.id

          // Adiciona o documento à lista de documentos.
          docList.push(docTemp);
        });

        // Envia a lista de documentos para a view.
        this.docView = docList;
      });

    }

    // Libera view.
    this.view = true;
  }

}
