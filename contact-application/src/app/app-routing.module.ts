import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { ContactListComponent } from './contact-list/contact-list.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'group', component: GroupComponent},
  {path: 'single-group/:id', component: SingleGroupComponent},
  {path: 'single-contact/:id', component: SingleContactComponent},
  {path: 'new-contact', component: NewContactComponent},
  {path: 'new-group', component: NewGroupComponent},
  {path: 'update-contact/:id', component: UpdateContactComponent},
  {path: 'update-group/:id', component: UpdateGroupComponent},
  {path: 'contact-list/:id', component: ContactListComponent},
  {path: 'search', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
