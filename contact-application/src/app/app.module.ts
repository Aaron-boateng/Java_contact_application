import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { GroupComponent } from './group/group.component';
import { SingleGroupComponent } from './single-group/single-group.component';
import { SingleContactComponent } from './single-contact/single-contact.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { UpdateGroupComponent } from './update-group/update-group.component';
import { SearchComponent } from './search/search.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ContactListComponent } from './contact-list/contact-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    GroupComponent,
    SingleGroupComponent,
    SingleContactComponent,
    NewContactComponent,
    NewGroupComponent,
    UpdateContactComponent,
    UpdateGroupComponent,
    SearchComponent,
    ContactListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
