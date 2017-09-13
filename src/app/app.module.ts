import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import {SearchMusicService} from "./service/search-music.service";

// free
import {IconModule,ModalModule,InputtextModule,SidenavModule,ButtonModule,NotificationModule} from 'freeng/freeng';

import { MenuComponent } from './menu/menu.component'; //accordion
import { LoginAlertComponent } from './alert/loginAlert.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserService} from "./service/user.service";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {AccordionModule} from "freeng/component/accordion/accordion.component";
import { ContentIndexComponent } from './content-index/content-index.component';
import {MusicService} from "./service/music.service";
import {BadgeModule} from "freeng/component/badge/badge.component";
@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    MenuComponent,
    LoginAlertComponent,
    ContentIndexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    IconModule,
    ModalModule,
    InputtextModule,
    SidenavModule,
    AccordionModule,
    ButtonModule,
    NotificationModule,
    BadgeModule
  ],
  providers: [MusicService,UserService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
