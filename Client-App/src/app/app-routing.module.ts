import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroTopComponent } from './heroes/hero-top/hero-top.component';
import { LoginComponent } from './login/login.component';
import { AppConfig } from './config/app.config';
import { Error404Component } from './core/error404/error-404.component';
import { AuthGuard } from '../app/service/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'h', component: HeroTopComponent, canActivate: [AuthGuard] },
  { path: AppConfig.routes.heroes, canActivate: [AuthGuard], loadChildren: 'app/heroes/heroes.module#HeroesModule' },
  { path: AppConfig.routes.error404, canActivate: [AuthGuard], component: Error404Component },

  // otherwise redirect to 404
  { path: '**', redirectTo: '/' + AppConfig.routes.error404 }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
