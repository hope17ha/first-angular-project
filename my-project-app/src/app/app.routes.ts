import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';
import { MainComponent } from './main/main.component';
import { CurrentTattooComponent } from './single-tattoo/current-tattoo/current-tattoo.component';
import { AddTattooComponent } from './single-tattoo/add-tattoo/add-tattoo.component';
import { ErrorComponent } from './error/error.component';
import { TattooListComponent } from './tattoo-list/tattoo-list.component';
import { AuthGuard } from './guards/authentication.guard';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
  
    //   Start - User routing
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    //   End - User routing
  
    // Start - Theme routing
    {
      path: 'tattoos',
      children: [
        { path: '', component: TattooListComponent },
        {
          path: ':tattoId',
          component: CurrentTattooComponent,
          canActivate: [AuthGuard],
        },
 
      ],
    },
    { path: 'add-tattoo', 
    loadComponent: () =>
      import('../app/single-tattoo/add-tattoo/add-tattoo.component').then(
        (c) => c.AddTattooComponent
      ),
    canActivate: [AuthGuard],
  },

    // End - Theme routing
  
    { path: '404', component: ErrorComponent },
    { path: '**', redirectTo: '/404' },
  ];
  
