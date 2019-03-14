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
    UpdateGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
