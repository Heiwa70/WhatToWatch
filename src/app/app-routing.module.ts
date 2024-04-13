import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { SecurityComponent } from './security/security.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PasswordsComponent } from './passwords/passwords.component';
import { GoalsComponent } from './goals/goals.component';
import { DetailsComponent } from './details/details.component';
import { DetailsSeriesComponent } from './details-series/details-series.component';
import { DetailsActorsComponent } from './details-actors/details-actors.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: 'EditProfile', component: ProfileEditComponent },
  { path: 'Lists', component: ListsComponent },
  { path: 'Messages', component: MessagesComponent},
  { path: 'Security', component: SecurityComponent},
  { path: 'Settings', component: SettingsComponent},
  { path: 'Notifications', component: NotificationsComponent},
  { path: 'Passwords', component: PasswordsComponent},
  { path: 'Goals', component: GoalsComponent},
  { path: 'Details/Movie/:id', component: DetailsComponent },
  { path: 'Details/Series/:id', component: DetailsSeriesComponent },
  {path: 'Details/Actor/:id', component: DetailsActorsComponent},
  { path: '', redirectTo: '/Home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
