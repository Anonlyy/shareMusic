import {RouterModule, Routes} from "@angular/router";
import {ContentIndexComponent} from "./content-index/content-index.component";
import {NgModule} from "@angular/core";
import {SongListComponent} from "./song-list/song-list.component";
import {ErrorComponent} from "./error/error.component";
const routes:Routes = [
  {
    path:'',
    redirectTo:'index',
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
    path:'**',
    component:ErrorComponent
  }
];



@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{}
