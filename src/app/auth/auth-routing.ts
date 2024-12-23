import {Routes} from '@angular/router'; 

export const AuthRouting: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(x => x.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(x => x.RegisterComponent)
  },

];


