import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FirebaseService } from 'src/services/firebase.service';
import { TmdbService } from 'src/services/tmdb.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ListCardComponent } from './list-card/list-card.component';
import { CardComponent } from './card/card.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { MenuVerticaleComponent } from './menu-verticale/menu-verticale.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { SecurityComponent } from './security/security.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PasswordsComponent } from './passwords/passwords.component';
import { GoalsComponent } from './goals/goals.component';
import { DetailsComponent } from './details/details.component';
import { DetailsSeriesComponent } from './details-series/details-series.component';
import { CardSeriesComponent } from './card-series/card-series.component';
import { ListCardSeriesComponent } from './list-card-series/list-card-series.component';
import { DetailsActorsComponent } from './details-actors/details-actors.component';
import { NewListComponent } from './new-list/new-list.component';
import { FilmsComponent } from './films/films.component';
import { SeriesComponent } from './series/series.component';
import { PersonneComponent } from './personne/personne.component';
import { CardPersonneComponent } from './card-personne/card-personne.component';
import { ListCardPersonneComponent } from './list-card-personne/list-card-personne.component';
import { TruncatePipe } from './Pipes/biography';
import { LikeComponent } from './like/like.component';
import { BtnListComponent } from './btn-list/btn-list.component';
import { SearchComponent } from './search/search.component';
import { FriendsComponent } from './friends/friends.component';
import { AddFriendsComponent } from './add-friends/add-friends.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ListCardComponent,
    CardComponent,
    ProfileComponent,
    ProfileEditComponent,
    MenuVerticaleComponent,
    ListsComponent,
    MessagesComponent,
    SecurityComponent,
    SettingsComponent,
    NotificationsComponent,
    PasswordsComponent,
    GoalsComponent,
    DetailsComponent,
    DetailsSeriesComponent,
    CardSeriesComponent,
    ListCardSeriesComponent,
    DetailsActorsComponent,
    NewListComponent,
    FilmsComponent,
    SeriesComponent,
    PersonneComponent,
    CardPersonneComponent,
    ListCardPersonneComponent,
    TruncatePipe,
    LikeComponent,
    BtnListComponent,
    SearchComponent,
    FriendsComponent,
    AddFriendsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FirebaseService, TmdbService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
