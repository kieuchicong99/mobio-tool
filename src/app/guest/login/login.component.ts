import { Component, OnInit } from '@angular/core';
import { IUser } from '../api/user';
import { AuthenService } from '../../common/service/authen.service';
import { StorageService } from '../../common/service/storage.service';
import { CommonConstants } from '../../common/common.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLogin: IUser;
  constructor(
    private _authen: AuthenService,
    private _storage: StorageService,
    private _router: Router) {
    this.userLogin = {
      username: '',
      password: '',
      domain: ''
    }
  }

  
  ngOnInit() {
    if (this._authen.isLogin) {
      this._router.navigateByUrl('');
    }
  }

  async login(e: Event) {
    e.stopPropagation();
    try {
      const token = await this._authen.login(this.userLogin);
      this._storage.setLocal(CommonConstants.KEY_STORAGE_TOKEN, token);
      this._storage.setLocal(CommonConstants.KEY_STORAGE_DOMAIN_REQUEST, this.userLogin.domain);
      window.location.href = '/';
    } catch (error) {

    }

  }

}
