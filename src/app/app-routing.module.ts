import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { LoginComponent } from './components/login/login.component';
import { CreateOrUpdateProfileComponent } from './components/create-or-update-profile/create-or-update-profile.component';

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
