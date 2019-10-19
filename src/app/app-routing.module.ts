import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'relatorio', loadChildren: './relatorio/relatorio.module#RelatorioPageModule' },
  { path: 'configuracao', loadChildren: './configuracao/configuracao.module#ConfiguracaoPageModule' },
  { path: 'help', loadChildren: './help/help.module#HelpPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
