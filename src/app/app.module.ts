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
import { DetailsComponent } from './details/details.component';
import { DetailsSeriesComponent } from './details-series/details-series.component';
import { CardSeriesComponent } from './card-series/card-series.component';
import { ListCardSeriesComponent } from './list-card-series/list-card-series.component';


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
    DetailsComponent,
    DetailsSeriesComponent,
    CardSeriesComponent,
    ListCardSeriesComponent,
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
