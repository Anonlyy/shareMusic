import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.scss']
})
export class SoundComponent implements OnInit {
  @Input() audio:HTMLAudioElement = new Audio();
  isShow:boolean = false;
  constructor() { }

  ngOnInit() {
    this.audio.volume = 0.1;
  }
  moveChange(e){
    let soundValue = parseInt(e);
    this.audio.volume = soundValue/100;
  }
  setShowVolume(){
    this.isShow = !this.isShow;
  }
}
