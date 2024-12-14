import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';

import { CurrentTattooComponent } from './single-tattoo/current-tattoo/current-tattoo.component';
import { AddTattooComponent } from './single-tattoo/add-tattoo/add-tattoo.component';
import { ErrorComponent } from './error/error.component';
import { TattooListComponent } from './tattoo-list/tattoo-list.component';
import { guestAuthGuard } from './guards/guest.guard';
import { EditTattooComponent } from './single-tattoo/edit-tattoo/edit-tattoo.component';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { userAuthGuard } from './guards/user.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  //   Start - User routing
  { path: 'login', canActivate: [userAuthGuard], component: LoginComponent },
  {
    path: 'register',
    canActivate: [userAuthGuard],
    component: RegisterComponent,
  },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [guestAuthGuard],
  },

  //   End - User routing

  // Start - Theme routing
  {
    path: 'tattoos',
    children: [
      { path: '', component: TattooListComponent },
      {
        path: ':tattooId',
        component: CurrentTattooComponent,
       
      },
      {
        path: 'edit/:tattooId',
        component: EditTattooComponent,
        canActivate: [guestAuthGuard],
      },
    ],
  },
  {
    path: 'add-tattoo',
    loadComponent: () =>
      import('../app/single-tattoo/add-tattoo/add-tattoo.component').then(
        (c) => c.AddTattooComponent
      ),
    canActivate: [guestAuthGuard],
  },

  // End - Theme routing

  { path: 'error', component: ErrorMessagesComponent },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];
