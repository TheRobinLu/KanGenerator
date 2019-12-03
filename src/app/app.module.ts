import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { KanbanComponent } from './kanban/kanban.component';
import { JoblistComponent } from './joblist/joblist.component';
import { DbversionComponent } from './dbversion/dbversion.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    KanbanComponent,
    JoblistComponent,
    DbversionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot([
      {path:'welcome', component: WelcomeComponent},
      {path:'joblist', component: JoblistComponent},
      {path:'kanban/:id', component: KanbanComponent},
      {path: '**', redirectTo: 'welcome', pathMatch: 'full' }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
