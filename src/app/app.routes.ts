import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    {path:"home", component:HomeComponent},
    {path:"login", component:LoginComponent},
    {path:"register",component:RegisterComponent}
];
