import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common/service/common.service';
import { IUserinfo } from '../../common/api/user';

@Component({
  selector: 'app-layouts-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private userInfo: IUserinfo;
  constructor(private _commonService: CommonService) { }

  ngOnInit() {
    this.userInfo = this._commonService.Info;
    console.log(this.userInfo);
  }

}
