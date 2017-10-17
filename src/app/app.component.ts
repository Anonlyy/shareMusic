import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {Store} from "@ngrx/store";
// redux
import * as fromRoot from './ngrx';
import {REFRESH} from "./ngrx/action/option";
import {Observable} from "rxjs";
import {routeAnimation} from "./animations";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  animations:[routeAnimation],
})
export class AppComponent implements OnInit{
  number$: Observable<number>; // 在html中使用时需要添加async管道,且会组件摧毁后自动取消订阅
  // router跳转动画所需参数
  routerState: boolean = true;
  routerStateCode: string = 'active';
  constructor(public http:Http,private store:Store<fromRoot.State>,public router:Router){
    this.number$ = store.select(fromRoot.getNumber)
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // 每次路由跳转改变状态
        this.routerState = !this.routerState;
        this.routerStateCode = this.routerState ? 'active' : 'inactive';
      }
    });
  }
}
