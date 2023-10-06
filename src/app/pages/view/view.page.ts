import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  // Inicializa Firebase.
  app = initializeApp(environment.firebase);

  // Inicializa Authentication.
  auth = getAuth(this.app);

  // Inicializa Cloud Firestore.
  db = getFirestore(this.app);

  // Controla a visualização da página.
  view = false;

  // Dependência de 'ActivatedRoute' → Roteamento interno.
  activatedRoute = inject(ActivatedRoute);

  // Obtém id da rota.
  docId = this.activatedRoute.snapshot.paramMap.get('id') as string;

  // Referências ao documento.
  docRef = doc(this.db, environment.dbCollection, this.docId);

  // View dos documentos → html.
  docView: any;

  // Caixa de alerta do Ionic.
  alertController = inject(AlertController);

  // Documento não existe.
  docExist = false;

  constructor() { }

  async ngOnInit() {

    // Se usuário não está logado, mostra login.
    onAuthStateChanged(this.auth, (userData) => {
      if (!userData) location.href = '/login';
    });

    // Recebe o documento do Firestore.
    const docSnap = await getDoc(this.docRef);

    // Se achou o documento.
    if (docSnap.exists()) {

      // Manda para a view.
      this.docView = docSnap.data();

      // Id do documento.
      this.docView['id'] = this.docId;

      // Atualiza status do documento.
      this.docView['status'] = 'success';

      // Atualiza contador de views.
      await updateDoc(this.docRef, { views: parseInt(this.docView.views + 1) });

      // Documento existe.
      this.docExist = true;

    } else {

      // Exibe erro na view.
      this.docView = { status: 'error' };
    }

    // Exibe a view.
    this.view = true;

  }

  async delete(id: string) {
    const alert = await this.alertController.create({
      header: 'Oooops!',
      message: `Tem certeza que deseja apagar "${this.docView.name}"? Isso é irreversível!`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {
            await updateDoc(this.docRef, { status: 'off' });
            location.href = '/';
          },
        },
      ]
    });

    await alert.present();
  }

}
