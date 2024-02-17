import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/pages/login/login.component';
import { RegisterComponent } from './user/pages/register/register.component';
import { CoinsComponent } from './coins-collection/pages/coins/coins.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent},
    {path: 'coins-collection', component: CoinsComponent},
    { path: '**', component: HomeComponent },
];
