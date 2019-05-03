import { Injectable } from "@angular/core";
import { RequestSocialService } from "../../../common/service/module-request/social.service";

@Injectable()
export class TagPostService {
    constructor(private _socialRequest: RequestSocialService) {
    }

    get Group() {
        return new Promise((resolve, reject) => {
            this._socialRequest.get('/groups/list').subscribe(res => {
                resolve(res.datas);
            }, err => {
                resolve([
                    {
                        group_id: "2db86257-15eb-4cce-8cb7-0213fe3b5e4f",
                        merchant_id: "1b99bdcf-d582-4f49-9715-1b61dfff3924",
                        group_social_id: "121358061894056",
                        social_type: 1,
                        group_name: "page name 1"
                    },
                    {
                        group_id: "2db86257-15eb-4cce-8cb7-0213fe3b5e4f",
                        merchant_id: "1b99bdcf-d582-4f49-9715-1b61dfff3924",
                        group_social_id: "121358061894056",
                        social_type: 1,
                        group_name: "page name 2"
                    },
                    {
                        group_id: "2db86257-15eb-4cce-8cb7-0213fe3b5e4f",
                        merchant_id: "1b99bdcf-d582-4f49-9715-1b61dfff3924",
                        group_social_id: "121358061894056",
                        social_type: 1,
                        group_name: "page name 3"
                    }
                ]);
            });
        });
    }
}