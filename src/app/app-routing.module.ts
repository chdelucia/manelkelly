import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConcursoComponent } from './concurso/concurso.component';
import { IntroComponent } from './intro/intro.component';
import { PremioComponent } from './premio/premio.component';

const routes: Routes = [
  { path: '',   component: IntroComponent, pathMatch: 'full' },
  { path: 'premio', component: PremioComponent },
  { path: 'game', component: ConcursoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
