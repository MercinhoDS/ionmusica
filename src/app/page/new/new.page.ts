import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import { environment } from 'src/environments/environment';

import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  // Firebase
  app = initializeApp(environment.firebase);
  auth = getAuth(this.app);
  db = getFirestore(this.app);
  storage = getStorage(this.app);

  // Bloqueia a view.
  view = false;

  // Model do documento.
  newDocument = {
    date: '',
    name: '',
    description: '',
    image: '/assets/generic.png',
    location: '',
    geolocation: '',
    owner: '',
    views: 0,
    status: 'on'
  }

  // Coordenadas do GPS.
  toggleGPS = true;

  // Botão [Salvar] desabilitado.]
  btnDisabled = true;

  // Roteamento.
  router = inject(Router);

  // Geolocalização.
  geolocation = '';

  // Services de uso geral.
  tools = inject(ToolsService);

  // Formato da imagem.
  photoFormat = '';

  // Define a coleção onde os contatos são armazenados.
  dbCollection = collection(this.db, environment.dbCollection);

  // Mostra formulário ainda não enviado.
  sended = false;

  constructor() { }

  ngOnInit() {

    // Monitora usuário logado.
    onAuthStateChanged(this.auth, (userData) => {
      if (userData) {
        this.view = true;
        this.newDocument.owner = userData.uid;
      } else this.router.navigate(['/login']);
    });

    // Obtém geolocalização.
    Geolocation.getCurrentPosition()
      .then((x) => {
        this.geolocation = `${x.coords.latitude}, ${x.coords.longitude}`;
        this.newDocument.geolocation = this.geolocation;
      });

  }

  // Obtém a imagem do documento.
  // option = 'new'* | 'reset'
  // Foto do documento.
  getPhoto(option: string) {
    if (option == 'new') {

      Camera.getPhoto({

        // Configurações da captura da imagem.
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl

      }).then(x => {

        // Envia para a view.
        this.newDocument.image = x.dataUrl + '';

        // Atualiza formato da imagem.
        this.photoFormat = x.format;
      })

    } else {

      // Carrega imagem padrão.
      this.newDocument.image = '/assets/generic.png';
    }
  }

  // Valida campos do formulário usando 'stripTags()' e regex.
  change() {
    if (
      this.tools.stripTags(this.newDocument.name).length > 2 &&
      this.tools.stripTags(this.newDocument.description).length > 4 &&
      this.tools.stripTags(this.newDocument.location).length > 3
    ) this.btnDisabled = false;
    else this.btnDisabled = true;
  }

  // Mostra/Oculta geolocalização no documento.
  toggleChange() {
    this.newDocument.geolocation = (this.toggleGPS) ? this.geolocation : '';
  }

  // Salva dados do documento no back-end.
  saveDocument() {

    // Valida campos.
    if (this.btnDisabled) return false;

    // Obtém a data atual do documento.
    this.newDocument.date = this.tools.now();

    // Se atualizou a foto, ou seja, não está usando a foto padrão.
    if (this.newDocument.image !== '/assets/generic.png') {

      // Cria um nome aleatório para a foto usando 'getRandomChars()' e adiciona o formato.
      let storageRef = ref(this.storage, `${this.tools.getRandomChars(10)}.${this.photoFormat}`);

      /**
       * Envia a foto para o servidor no formato 'String/Base64'.
       * Referências: https://firebase.google.com/docs/storage/web/upload-files?hl=pt-br
       **/
      uploadString(
        storageRef,                                      // Dome da imagem.
        this.newDocument.image.split(',')[1],         // Dados binários da imagem.
        'base64',                                        // Formato dos dados.
        { contentType: `image/${this.photoFormat}` }     // Formato da foto.
      ).then(() => {

        /**
         * Se salvou a imagem, obtém a URL desta.
         * Referências: https://firebase.google.com/docs/storage/web/download-files?hl=pt-br#download_data_via_url
         **/
        getDownloadURL(ref(storageRef))
          .then((response) => {

            // Salva a URL no campo 'image' do formulário.
            this.newDocument.image = response

            // Envia o formulário para o Firestore.
            this.saveForm();
          })
      });

      // Se não alterou a foto.
    } else {

      // Mantém a foto padrão e envia o formulário para o Firestore.
      this.saveForm();
    }

    // Conclui 'sendForm()'.
    return true;
  }

  // Salva metadados no Firestore.
  saveForm() {
    
     // Salva formulário no banco de dados.
     addDoc(this.dbCollection, this.newDocument)

     // Se teve sucesso, oculta formulário e agradece ao usuário.
     .then((data) => {
       // console.log('Contato salvo com o Id: ' + data.id);
       this.sended = true;
     })

     // Se falhou, exibe mensagem de erro no console.
     .catch((error) => {
       console.error(error);
     })

   }

   // Reinicia o formulário.
   reload(){

    // Recarrega a página.
    location.href = '/new'
   }

}
