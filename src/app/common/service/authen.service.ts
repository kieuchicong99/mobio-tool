import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { IUser } from "../../guest/api/user";
import { StorageService } from "./storage.service";
import { CommonConstants } from "../common.constants";

@Injectable()
export class AuthenService {
    constructor(
        private _http: Http,
        private _storage: StorageService) { }

    login(body: IUser) {
        return new Promise((resolve, reject) => {
            this._http.post(`https://${body.domain}/adm/v1.0/login`, { username: body.username, password: body.password })
                .subscribe((res: any) => {
                    resolve(res.json().jwt);
                }, err => {
                    reject(err);
                });
        });
    }

    isLogin() {
        const token = this._storage.getLocal(CommonConstants.KEY_STORAGE_TOKEN);
        console.log(token);
        if (token) {
            return true;
        }

        return false;
    }
}