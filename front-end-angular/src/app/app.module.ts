import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { appRoutingProviders, routing } from './app.routing';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import { RegisterComponent } from './components/register/register.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    
    HttpClientModule,
    
  ],
  providers: [appRoutingProviders,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
