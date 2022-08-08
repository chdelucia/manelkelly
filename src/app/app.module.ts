import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { PremioComponent } from './premio/premio.component';
import { ConcursoComponent } from './concurso/concurso.component';
import { GameService } from './game.service';
import { IntroComponent } from './intro/intro.component';
import { QrComponent } from './qr/qr.component';
import { PaginationComponent } from './pagination/pagination.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    PremioComponent,
    ConcursoComponent,
    IntroComponent,
    QrComponent,
    PaginationComponent,
    InfoPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
