import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { GroupComponent } from './group/group.component';
import { SingleGroupComponent } from './single-group/single-group.component';
import { SingleContactComponent } from './single-contact/single-contact.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'group', component: GroupComponent},
  {path: 'single-group', component: SingleGroupComponent},
  {path: 'single-contact', component: SingleContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
