import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {Input} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(public http:Http){}
  ngOnInit(): void {
  }
}
