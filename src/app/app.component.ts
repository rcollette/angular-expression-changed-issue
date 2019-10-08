import { Component } from '@angular/core';
import {NgbModal} from '@'
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  public dropDownValue1:string;
  public dropDownValue2:string;

  constructor(_modal:NgbModal){

  }

  public onChange(value:string){
    console.log(value);
  }
}
