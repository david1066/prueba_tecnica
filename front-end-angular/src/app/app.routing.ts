//importar los modulos del routing
import{ModuleWithProviders} from '@angular/core';
import{Routes, RouterModule} from '@angular/router';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

//importar componentes



//array de rutas
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'editar/:id', component: EditUserComponent},
  {path: '**', component: HomeComponent},

  

];
//exportar configuracion
export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders<any>= RouterModule.forRoot(appRoutes);
