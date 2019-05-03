import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BaseRequestService } from "../base-request.service";
import { StorageService } from "../storage.service";
import { CommonConstants } from "../../common.constants";
import { CommonService } from "../common.service";

@Injectable()
export class RequestSocialService extends BaseRequestService {
    constructor(
        protected http: Http,
        protected storage: StorageService,
        protected _commonService: CommonService) {
        super(`${storage.getLocal(CommonConstants.KEY_STORAGE_DOMAIN_REQUEST)}/social/api/v1.0/tool/merchants/${_commonService.Info.merchant_id}/`, http, storage);
    }

}