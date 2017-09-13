import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'loginAlert',
  template:`
    <div class="modal ng-trigger ng-trigger-fadeInScale free-primary">
      <!----><div class="free-modal-header ng-tns-c10-102">
        <!----><span class="ng-tns-c10-102">弹出框</span>
        <span class="ng-tns-c10-102"></span>
        <!----><span class="free-modal-close ng-tns-c10-102">
          <i class="fa fa-close"></i>
        </span>
      </div>
      <div class="free-modal-content">
        <!----><!---->
          
    可以使用theme设置主题色
    
  
          <!---->
        
        <!---->
      </div>
      <!----><div class="free-modal-footer ng-tns-c10-102">
        <!---->
          <!---->
          <!---->
          <!---->
        
        <f-footer _ngcontent-c9="" class="ng-tns-c9-85">
      <button _ngcontent-c9="" class="cancel ng-tns-c9-85 btn btn-default" fbutton="">关闭</button>
    </f-footer>
      </div>
    </div>
  `,
  styleUrls: ['loginAlert.component.scss']
})
export class LoginAlertComponent implements OnInit{
  constructor(public http:Http){}

  ngOnInit(): void {
    // this.http.get('/login/cellphone?phone=13160663115&password=13902447113').subscribe(result=>{
    //   this.title = result.json();
    // })

    // this.http.get('/music/url?id=347230').subscribe(result=>{
    //   this.data = result.json();
    //   this.songUrl = this.data.data[0].url;
    //   console.log(this.songUrl)
    // })
  }
}
