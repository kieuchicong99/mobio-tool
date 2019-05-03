import { Component, OnInit } from '@angular/core';
import { IFunction } from '../api/function';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layouts-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  functions: Array<IFunction>;
  constructor(private _router: Router) {
    this.functions = new Array();
    this.functions.push({ active: true, link: '/social/config-tag-post', title: 'Cấu hình tag post' });
  }

  ngOnInit() {
  }

  gotoLink(e: Event, funciton: IFunction) {
    e.stopPropagation();
    this._router.navigateByUrl(funciton.link);
  }

}
