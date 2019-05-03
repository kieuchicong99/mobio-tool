import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { JwtHelper } from 'angular2-jwt';
import { CommonConstants } from "../common.constants";
import { CommonFunction } from "../common.function";
import { IUserinfo } from "../api/user";

@Injectable()
export class CommonService {
    private jwtHelper: JwtHelper;
    private userInfo: IUserinfo;
    constructor(private _storageService: StorageService) {
        this.jwtHelper = new JwtHelper();
    }

    get Info(): IUserinfo {
        if (!this.userInfo) {
            this.userInfo = this.jwtHelper.decodeToken(this._storageService.getLocal(CommonConstants.KEY_STORAGE_TOKEN));
        }
        return this.userInfo;

    }
}