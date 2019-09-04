import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { KanbanComponent } from './kanban/kanban.component';
import { JoblistComponent } from './joblist/joblist.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    KanbanComponent,
    JoblistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'welcome', component: WelcomeComponent},
      {path:'kanban/:id', component: KanbanComponent},
      {path: '**', redirectTo: 'welcome', pathMatch: 'full' }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
