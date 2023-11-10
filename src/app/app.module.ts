import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LoginComponent } from './login/login.component';
import { CreateOrUpdateProfileComponent } from './create-or-update-profile/create-or-update-profile.component';
import { SharedModule } from './shared/shared.module';
import { ToolbarComponent } from './navigations/toolbar/toolbar.component';
import { SidenavListComponent } from './navigations/sidenav-list/sidenav-list.component';
import { TooltipListPipe } from './shared/pipes/tooltip-list.pipe';
import { CommaSeparatedPipe } from './shared/pipes/comma-seperated.pipe';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
