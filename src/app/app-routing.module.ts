import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LoginComponent } from './login/login.component';
import { CreateOrUpdateProfileComponent } from './create-or-update-profile/create-or-update-profile.component';

const routes: Routes = [
  {
    path: '',
    component: MyProfileComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create-or-update',
    component: CreateOrUpdateProfileComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
