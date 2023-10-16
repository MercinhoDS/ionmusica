import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

import { ToolsService } from 'src/app/services/tools.service';

import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
})
export class DocumentPage implements OnInit {

  // Firebase.
  app = initializeApp(environment.firebase);
  auth = getAuth(this.app);
  db = getFirestore(this.app);

  // Injeção de dependências.
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  alertController = inject(AlertController);

  // Services de uso geral.
  tools = inject(ToolsService);

  // Documento.
  document: any;

  // Dados do usuário.
  userId = '';

  // View do documento.
  docId = '';
  docEdit = false;
  docRef: any;

  // View da página.
  pageTitle = '';
  pageView = false;
  pageGPS = false;
  pageBtnDisabled = true;
  pageSended = false;
  pageMessage = '';

  // Dados do Capacitor.
  capacitorGPS: any;
  capacitorImageFormat = '';

  constructor() { }

  ngOnInit() {

    onAuthStateChanged(this.auth, (userData) => { // Monitora usuário logado.
      if (!userData) // Se não está logado.
        this.router.navigate(['/login']); // Envia para login.
      else // Se está logado.
        this.userId = userData.uid; // Obtém o id do usuário.
    });

    this.docId = this.activatedRoute.snapshot.paramMap.get('id') as string; // Obtém o id do documento da rota.
    this.getGPS(); // Obtém GPS.

    if (this.docId) { // Se tem id.
      this.docEdit = true;  // Documento está sendo editado.
      this.pageTitle = 'Editar Documento'; // Título da página.
      this.getDocument(); // Obtém documento da coleção.
    } else { // Se não tem id.
      this.docEdit = false; // Documento está sendo criado.
      this.pageTitle = 'Novo Documento'; // Título da página.
      this.newDocument(); // Cria novo documento.
    }

  }

  // Obtém documento.
  async getDocument() {

    this.docRef = doc(this.db, environment.dbCollection, this.docId); // Referências ao documento.
    const docSnap = await getDoc(this.docRef); // Recebe o documento do Firestore.

    if (docSnap.exists()) { // Se achou o documento.

      this.document = docSnap.data(); // Obtém dados do documento.

      if (this.document.geolocation == '') // Se não existem coordenadas GPS no documento.
        this.pageGPS = false; // Oculta coordenadas na página.
      else // Se tem coodernadas no documento.
        this.pageGPS = true; // Mostra coordenadas na página.

      this.pageView = true; // Mostra a página.
      this.pageBtnDisabled = false; // Mostra botão [Salvar].

    } else { // Se não achou documento.

      // Emite alerta e vai para a listagem de documentos → home.
      const alert = await this.alertController.create({
        header: 'Oooops!',
        message: `Documento não encontrado...`,
        buttons: [{
          text: 'OK',
          handler: async () => { this.router.navigate(['/']); },
        }]
      });
      await alert.present();

    }
  }

  // Cria novo documento.
  newDocument() {

    // Valores default dos campos.
    this.document = {
      date: '',
      name: '',
      description: '',
      image: environment.dbDefaultImage,
      location: '',
      geolocation: '',
      owner: '',
      views: 0,
      status: 'on'
    }

    // Mostra a página.
    this.pageView = true;

  }

  // Obtém a imagem do documento.
  // option = 'new'* | 'reset'
  // Imagem do documento.
  getPhoto(option: string) {
    if (option == 'new') {

      Camera.getPhoto({

        // Configurações da captura da imagem.
        quality: 20,
        allowEditing: true,
        width: 640,
        height: 640,
        resultType: CameraResultType.DataUrl

      }).then(async x => {

        // Se o formato da imagem é válido.
        if (environment.dbImageFormats.includes(x.format)) {

          // Envia para a view.
          this.document.image = x.dataUrl + '';

          // Atualiza formato da imagem.
          this.capacitorImageFormat = x.format;

          // Se o formato da imagem é inválido.
        } else {

          // Emite mensagem de alerta.
          const alert = await this.alertController.create({
            header: 'Oooops!',
            message: 'Formato de imagem não suportado! Use somente ' + environment.dbImageFormats.join(', ') + '.',
            buttons: ['OK'],
          });
          await alert.present();

        }
      })

    } else {

      // Carrega imagem padrão.
      this.document.image = environment.dbDefaultImage;
    }
  }

  getGPS() {
    // Obtém geolocalização.
    Geolocation.getCurrentPosition()
      .then((x) => {
        this.capacitorGPS = `${x.coords.latitude}, ${x.coords.longitude}`;
      });
  }

  // Monitora e valida preenchimento dos campos.
  change() {
    if (
      this.tools.stripTags(this.document.name).length > 2 &&
      this.tools.stripTags(this.document.description).length > 4 &&
      this.tools.stripTags(this.document.location).length > 3
    ) this.pageBtnDisabled = false;
    else this.pageBtnDisabled = true;
  }

  // Mostra/oculta GPS do documento.
  toggleGPS() {
    this.document.geolocation = (this.pageGPS) ? this.capacitorGPS : '';
  }

  // Recarrega documento. Somente no modo de edição.
  async reloadDocument() {

    const alert = await this.alertController.create({
      header: 'Oooops!',
      message: `As alterações já feitas no documento, que não foram salvas, serão perdidas...`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => { this.getDocument(); },
        },
      ]
    });
    await alert.present();

  }

  // Abre mapa com as coordenadas do GPS em uma guia/página do navegador.
  openMap() {
    window.open(`https://www.google.com/maps?q=${this.document.geolocation}`, 'blank');
  }

  // Salva documento.
  saveDocument() {

    // Desabilita o botão de envio.
    this.pageBtnDisabled = true;

    // Oculta view e mostra barra de progresso.
    this.pageView = false;

    // Se está editando um documento.
    if (this.docEdit) {

      // Atualiza documento.
      updateDoc(this.docRef, this.document)
        .then(() => {

          // Se teve sucesso, oculta formulário e agradece ao usuário.
          this.pageSended = true;
          this.pageView = true;
          this.pageMessage = 'Documento atualizado com sucesso!';

        });

      // Se está criando um documento.
    } else {

      // Define a coleção onde os contatos são armazenados.
      const dbCollection = collection(this.db, environment.dbCollection);

      // Atualiza data da criação.
      this.document.date = this.tools.now();

      // Atualiza proprietário do documento.
      this.document.owner = this.userId;

      // Salva formulário no banco de dados.
      addDoc(dbCollection, this.document)

        // Se teve sucesso, oculta formulário e agradece ao usuário.
        .then((data) => {
          this.pageSended = true;
          this.pageView = true;
          this.pageMessage = 'Documento criado com sucesso!';
        });

    }

  }

  // Reinicia o formulário ao criar novo documento.
  reload() {
    this.pageSended = false;
    this.pageView = true;
    this.newDocument();
  }
}