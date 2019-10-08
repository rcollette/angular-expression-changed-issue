import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DemoModalComponent } from './demo-modal/demo-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ExpressionChangedTest';

  public value1: string;
  public value2: string;

  constructor(private _httpClient: HttpClient) {
  }

  public onChange(value: string) {
    this._httpClient.get('http://uasdfasdf.com').subscribe(_=> console.log('do nothing'));
  }
}
