import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'home',
    title: environment.appName,
    loadChildren: () => import('./page/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'contacts',
    title: environment.appName + ' - Faça Contato',
    loadChildren: () => import('./page/contacts/contacts.module').then(m => m.ContactsPageModule)
  },
  {
    path: 'about',
    title: environment.appName + ' - Sobre',
    loadChildren: () => import('./page/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'polices',
    title: environment.appName + ' - Privacidade',
    loadChildren: () => import('./page/polices/polices.module').then(m => m.PolicesPageModule)
  },
  {
    path: 'e404',
    title: environment.appName + ' - Erro 404',
    loadChildren: () => import('./page/e404/e404.module').then(m => m.E404PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./user/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./user/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
