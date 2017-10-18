import {RouterModule, Routes} from "@angular/router";
import {ContentIndexComponent} from "./content-index/content-index.component";
import {NgModule} from "@angular/core";
import {SongListComponent} from "./song-list/song-list.component";
import {ErrorComponent} from "./error/error.component";
import {SearchResultComponent} from "./search-result/search-result.component";
import {SingerComponent} from "./singer/singer.component";
import {RadioIndexComponent} from "./radio-index/radio-index.component";
const routes:Routes = [
  {
    path:'',
    redirectTo:'radio',
    pathMatch:'full'
  },
  {
    path:'index',
    component:ContentIndexComponent
  },
  {
    path:'list/:id',
    component:SongListComponent
  },
  {
    path:'searchResult/:value',
    component:SearchResultComponent
  },
  {
    path:'singer/:id',
    component:SingerComponent
  },
  {
    path:'radio',
    component:RadioIndexComponent
  },
  {
    path:'**',
    component:ErrorComponent
  }
];



@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{}
