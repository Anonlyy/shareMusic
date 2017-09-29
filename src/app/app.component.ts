import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {Store} from "@ngrx/store";
// redux
import * as fromRoot from './ngrx';
import {REFRESH} from "./ngrx/action/option";
import {Observable} from "rxjs";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  number$: Observable<number>; // 在html中使用时需要添加async管道,且会组件摧毁后自动取消订阅
  constructor(public http:Http,private store:Store<fromRoot.State>){
    this.number$ = store.select(fromRoot.getNumber)
  }
  ngOnInit(): void {

  }
}
