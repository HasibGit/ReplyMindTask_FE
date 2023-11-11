import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { LoginComponent } from './components/login/login.component';
import { CreateOrUpdateProfileComponent } from './components/create-or-update-profile/create-or-update-profile.component';
import { SharedModule } from './shared/shared.module';
import { ToolbarComponent } from './components/navigations/toolbar/toolbar.component';
import { SidenavListComponent } from './components/navigations/sidenav-list/sidenav-list.component';
import { TooltipListPipe } from './shared/pipes/tooltip-list.pipe';
import { CommaSeparatedPipe } from './shared/pipes/comma-seperated.pipe';
import { HavatarModule } from 'havatar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DeleteAccountModalComponent } from './modals/delete-account-modal/delete-account-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MyProfileComponent,
    LoginComponent,
    CreateOrUpdateProfileComponent,
    ToolbarComponent,
    SidenavListComponent,
    TooltipListPipe,
    CommaSeparatedPipe,
    DeleteAccountModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HavatarModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  entryComponents: [DeleteAccountModalComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
