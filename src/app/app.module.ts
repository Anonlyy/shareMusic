import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';

// free
import {IconModule,ModalModule,InputtextModule,SidenavModule,ButtonModule,NotificationModule} from 'freeng/freeng';

import { MenuComponent } from './menu/menu.component'; //accordion

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserService} from "./service/user.service";
import {AccordionModule} from "freeng/component/accordion/accordion.component";
import { ContentIndexComponent } from './content-index/content-index.component';
import {MusicService} from "./service/music.service";
import {BadgeModule} from "freeng/component/badge/badge.component";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {ElModule } from "element-angular";
import "element-theme-default";
import {AppRoutingModule} from "./app-routing.module";
import { SongListComponent } from './song-list/song-list.component';
import { ErrorComponent } from './error/error.component';
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {TabGroupModule} from "freeng/component/tab/tab.component";
import { HeaderComponent } from './header/header.component';
import { MusicTimePipe } from './pipe/music-time.pipe';
import {StoreModule} from "@ngrx/store";
import {reducer} from "./ngrx/index";
import { SoundComponent } from './sound/sound.component';
import {SearchMusicService} from "./service/search-music.service";
import { SearchResultComponent } from './search-result/search-result.component';
@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    MenuComponent,
    ContentIndexComponent,
    SongListComponent,
    ErrorComponent,
    HeaderComponent,
    MusicTimePipe,
    SoundComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    IconModule,
    ModalModule,
    InputtextModule,
    SidenavModule,
    TabGroupModule,
    AccordionModule,
    ButtonModule,
    NotificationModule,
    BadgeModule,
    ElModule.forRoot(),

    StoreModule.provideStore(reducer)
  ],
  providers: [MusicService,SearchMusicService,UserService,CookieService, {provide:LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
