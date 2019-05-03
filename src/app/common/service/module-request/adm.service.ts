import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BaseRequestService } from "../base-request.service";
import { StorageService } from "../storage.service";
import { CommonConstants } from "../../common.constants";

@Injectable()
export class RequestAdmService extends BaseRequestService {
    constructor(
        protected http: Http,
        protected storage: StorageService) {
        super(`${storage.getLocal(CommonConstants.KEY_STORAGE_DOMAIN_REQUEST)}/adm/v1.0/`, http, storage);
    }

}