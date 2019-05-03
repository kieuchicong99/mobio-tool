
import { Http, Headers, RequestOptions, ResponseOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import 'rxjs/add/operator/map';
import { StorageService } from './storage.service';
import { CommonConstants } from '../common.constants';
import { CommonFunction } from '../common.function';

export abstract class BaseRequestService {
    private headers: Headers;
    private lang: string;
    private apiUrl: string;
    private options: RequestOptions;
    private token: string;

    constructor(apiUrl: string, private _http: Http,
        private _storageService: StorageService) {
        this.apiUrl = `https://${apiUrl}`;
        this.token = `Bearer ${this._storageService.getLocal(CommonConstants.KEY_STORAGE_TOKEN)}`;
    }

    private setRequestOptions(search: any = {}) {
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.token
        });
        this.options = new RequestOptions({ headers: this.headers, params: search });
    }

    public get(pathApi: string, search: any = {}) {
        this.setRequestOptions(search);
        return this._http.get(`${this.apiUrl}${pathApi}`, this.options)
            .map(this.mapResponseDefault)
            .catch(this.catchError);
    }

    public post(api: string, body: any, options: { search?: any, mapResponse?: any, requestOptions?: any } = {}) {
        this.setRequestOptions(options && options.search ? options.search : {});
        let opt = this.options;
        if (options && options.requestOptions) {
            opt = _.merge({}, this.options, options.requestOptions);
        }
        if (!options.mapResponse || typeof options.mapResponse !== 'function')
            options.mapResponse = this.mapResponseDefault;
        return this._http
            .post(`${this.apiUrl}${api}`, body, opt)
            .map(options.mapResponse)
            .catch(this.catchError);
    }

    public postFormData(api: string, body: any) {
        const httpOptions = new RequestOptions({
            headers: new Headers({
                'Accept': 'application/json',
                'Authorization': this.token
            }),
        });
        return this._http
            .post(`${this.apiUrl}${api}`, body, httpOptions)
            .map(this.mapResponseDefault)
            .catch(this.catchError);
    }

    public postUrlEndCode(api: string, body: any, options: { search?: any, mapResponse?: any, requestOptions?: any } = {}) {
        this.headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': this.token
        });
        this.options = new RequestOptions({
            headers: this.headers,
        });
        let bodyValue = CommonFunction.urlEndCode(body);
        // accept mapping object data
        if (!options.mapResponse || typeof options.mapResponse !== 'function')
            options.mapResponse = this.mapResponseDefault;
        return this._http
            .post(`${this.apiUrl}${api}`, bodyValue, this.options)
            .map(options.mapResponse)
            .catch(this.catchError);
    }

    public put(api: string, body: any, options: { search?: any, mapResponse?: any, requestOptions?: any } = {}) {
        this.setRequestOptions(options && options.search ? options.search : {});
        let opt = this.options;
        if (options && options.requestOptions) {
            opt = _.merge({}, this.options, options.requestOptions);
        }
        // accept mapping object data
        if (!options.mapResponse || typeof options.mapResponse !== 'function')
            options.mapResponse = this.mapResponseDefault;
        return this._http
            .put(`${this.apiUrl}${api}`, body, opt)
            .map(options.mapResponse)
            .catch(this.catchError);
    }

    public patch(api: string, body: any, options: { search?: any, mapResponse?: any, requestOptions?: any } = {}) {
        this.setRequestOptions(options && options.search ? options.search : {});
        let opt = this.options;
        if (options && options.requestOptions) {
            opt = _.merge({}, this.options, options.requestOptions);
        }
        // accept mapping object data
        if (!options.mapResponse || typeof options.mapResponse !== 'function')
            options.mapResponse = this.mapResponseDefault;
        return this._http
            .patch(`${this.apiUrl}${api}`, body, opt)
            .map(options.mapResponse)
            .catch(this.catchError);
    }

    public pathUrlEndCode(api: string, body: any, options: { search?: any, mapResponse?: any, requestOptions?: any } = {}) {
        this.headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': this.token
        });
        this.options = new RequestOptions({
            headers: this.headers,
        });
        let bodyValue = CommonFunction.urlEndCode(body);
        // accept mapping object data
        if (!options.mapResponse || typeof options.mapResponse !== 'function')
            options.mapResponse = this.mapResponseDefault;
        return this._http
            .patch(`${this.apiUrl}${api}`, bodyValue, this.options)
            .map(options.mapResponse)
            .catch(this.catchError);
    }

    public delete(api: string, body?: any, search?: any) {
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.token
        });
        this.options = new RequestOptions({
            headers: this.headers,
            body: body,
            params: search || {}
        });
        return this._http
            .delete(`${this.apiUrl}${api}`, this.options)
            .map(this.mapResponseDefault)
            .catch(this.catchError);
    }

    public sendNotFile(api: string, method: string, bodyData: any, options: { search?: any, mapResponse?: any } = {}) {
        bodyData = _.omitBy(bodyData, dataItem => _.isNil(dataItem));
        // build request option query + header
        method = method.toLowerCase();
        this.headers = new Headers({
            'Authorization': this.token
        });
        options.search = options.search || {};
        this.options = new RequestOptions({ headers: this.headers, params: options.search });

        // accept mapping object data
        if (options && (!options.mapResponse || typeof options.mapResponse !== 'function'))
            options.mapResponse = this.mapResponseDefault;

        let data = new FormData();
        for (let item in bodyData) {
            if (Array.isArray(bodyData[item])) {
                for (let itemChild in bodyData[item]) {
                    data.append(item, bodyData[item][itemChild]);
                }
            } else data.append(item, bodyData[item]);
        }
        return this._http[method](`${this.apiUrl}${api}`, data, this.options)
            .map(options.mapResponse)
            .catch(this.catchError);
    }

    public sendWithFile(api: string, method: string, bodyData: any, files: any[], keepFileOfBody?: boolean, keepArrayValue?: boolean): Observable<any> {
        bodyData = _.omitBy(bodyData, dataItem => _.isNil(dataItem));
        method = method.toUpperCase();
        let obv: Observable<Response> =
            Observable.create((observer: any) => {
                let formData: FormData = new FormData(),
                    xhr: XMLHttpRequest = new XMLHttpRequest();
                if (files && files.length > 0) {
                    for (let i = 0; i < files.length; i++) {
                        for (let j = 0; j < files[i].files.length; j++) {
                            formData.append(files[i].name, files[i].files[j],
                                files[i].files[j] ? files[i].files[j].name : '__upload_file');
                        }
                    }
                }
                for (let property in bodyData) {
                    this.appendRecursive(formData, bodyData[property], property, keepFileOfBody, keepArrayValue);
                }
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            observer.next(this.convertResponse(xhr));
                            observer.complete();
                        } else {
                            observer.error(this.convertResponse(xhr));
                        }
                    }
                };
                xhr.open(method, `${this.apiUrl}${api}`, true);
                xhr.setRequestHeader('Authorization', this.token);
                xhr.send(formData);
            });
        return obv.map(this.mapResponseDefault).catch(this.catchError);
    }

    private appendRecursive(fData: FormData, data: any, prop: string, keepFileOfBody?: boolean, keepArrayValue?: boolean) {
        if (keepFileOfBody) {

            if (data instanceof File) {
                this.appendFileToFormData(fData, prop, data);
                return;
            }

            if (data instanceof Array && data.length && data[0] instanceof File) {
                for (const file of data) {
                    this.appendFileToFormData(fData, prop, file);
                }
                return;

            }
        }

        if (keepArrayValue && data instanceof Array) {
            fData.append(prop, JSON.stringify(data));
            return;
        }

        if ('object' === typeof data) {
            console.log(data);
            for (let p in data) {
                this.appendRecursive(fData, data[p], `${prop}`);
            }
            return;
        }

        fData.append(prop, data);

    }

    private appendFileToFormData(formData: FormData, prop: string, file: File) {
        formData.append(prop, file, file.name);
    }

    private convertResponse(_xhr): Response {
        const XSSI_PREFIX = /^\)\]\}',?\n/;
        let status: number = _xhr.status === 1223 ? 204 : _xhr.status;

        let body: any = null;

        // HTTP 204 means no content
        if (status !== 204) {
            // responseText is the old-school way of retrieving response (supported by IE8 & 9)
            // response/responseType properties were introduced in ResourceLoader Level2 spec
            // (supported by IE10)
            body = (typeof _xhr.response === 'undefined') ? _xhr.responseText : _xhr.response;

            // Implicitly strip a potential XSSI prefix.
            if (typeof body === 'string') {
                body = body.replace(XSSI_PREFIX, '');
            }
        }

        // fix status code when it is 0 (0 status is undocumented).
        // Occurs when accessing file resources or on Android 4.1 stock browser
        // while retrieving files from application cache.
        if (status === 0) {
            status = body ? 200 : 0;
        }

        const headers: Headers = Headers.fromResponseHeaderString(_xhr.getAllResponseHeaders());
        // IE 9 does not provide the way to get URL of response
        const url = this.getResponseURL(_xhr);
        const statusText: string = _xhr.statusText || 'OK';

        let responseOptions = new ResponseOptions({ body, status, headers, statusText, url });
        const res = new Response(responseOptions);
        return res;
    }

    public getResponseURL(xhr: any): string | null {
        if ('responseURL' in xhr) {
            return xhr.responseURL;
        }
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
            return xhr.getResponseHeader('X-Request-URL');
        }
        return null;
    }

    public mapResponseDefault(res: Response): any | null {
        let out = null;
        try {
            out = res.json();
            out.message = res.json().message || res.json().D;
            out.code = res.json().code || res.json().C;
            out.lang = res.json().lang;
            out.status = res.status;
        } catch (e) {
        }
        return out;
    };

    public catchError(err: Response) {
        let out: any = {};
        try {
            if (err && err.status === 401) {
                localStorage.removeItem('__token');
                window.location.href = '/login';
                return;
            }
            out.message = err.json().message || err.json().D;
            out.code = err.json().code || err.json().C;
            out.lang = err.json().lang;
            out.status = err.status;
        } catch (e) {
        }
        return Observable.throw(out);
    }
}
