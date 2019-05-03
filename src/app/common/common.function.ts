import * as _ from 'lodash';
import { CommonPattern } from './commom.pattern';

export class CommonFunction {

    public static urlEndCode(params: any): String {
        params = _.omitBy(params, param => param === '' || _.isNil(param));
        let res = '';
        for (let p in params) {
            res += `&${p}=${encodeURIComponent(params[p])}`;
        }
        return res === '' ? '' : `${res.substring(1)}`;
    }

    static base64Encode(value: string) {
        return btoa(CommonFunction.encodeURI(value));
    }

    static encodeURI(value: string) {
        return encodeURIComponent(value).replace(CommonPattern.ENCODE_URI,
            (match, p1) => {
                return String.fromCharCode(parseInt(p1, 16));
            });
    }

    static base64Decode(value: string) {
        return CommonFunction.decodeURI(atob(value));
    }

    static decodeURI(value) {
        return decodeURIComponent(value.split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    static validateMail(value: string) {
        return CommonPattern.EMAIL.test(value);
    }

    static validateNumbers(value: string) {
        return CommonPattern.NUMBER.test(value)
    }

    static validateUrl(value: string) {
        return CommonPattern.URL.test(value);
    }

    static validatePhoneNumber(phoneNumber: string) {
        return CommonPattern.PHONE.test(phoneNumber);
    }

    static phoneFormatDisplay(phone: string): string {
        let existPhus84 = phone.indexOf('84');
        if (existPhus84 === 0) {
            phone = phone.replace('84', '0');
        }
        existPhus84 = phone.indexOf('+84');
        if (existPhus84 === 0) {
            phone = phone.replace('+84', '0');
        }
        const phoneArr = phone.split('');
        const phoneFormat: Array<String> = new Array();
        phoneArr.forEach((number, index) => {
            phoneFormat.push(number);
            if (index === 3 || index === 6) {
                phoneFormat.push(' ')
                return;
            }
        });
        return phoneFormat.join('');
    }

    static exportInterface(name: string, object: any): string {
        const fields = Object.keys(object);
        let interfaceExport: string = `export interface I${name}{`;
        fields.forEach(item => {
            switch (typeof object[item]) {
                case 'string':
                    interfaceExport = `${interfaceExport}\n${item}?: string;`;
                    break;
                case 'number':
                    interfaceExport = `${interfaceExport}\n${item}?: number;`;
                    break;
                case 'boolean':
                    interfaceExport = `${interfaceExport}\n${item}?: boolean;`;
                    break;
                case 'function':
                    interfaceExport = `${interfaceExport}\n${item}?: Function;`;
                    break;
                case 'object':
                    if (object[item] === null || object[item] === undefined) {
                        interfaceExport = `${interfaceExport}\n${item}?: any;`;
                        break;
                    }

                    if (Array.isArray(object[item])) {
                        interfaceExport = `${interfaceExport}\n${item}?: Array<any>;`;
                        break;
                    }
                    interfaceExport = `${interfaceExport}\n${item}?: object;`;
                    break;
                default:
                    interfaceExport = `${interfaceExport}\n${item}?: any;`;
            }
        });
        interfaceExport = `${interfaceExport}\n}`;
        return interfaceExport;
    }

    static convertCitationVietnameseUnsigned(words: string) {
        if (!words || !words.trim()) {
            return '';
        }

        const wordsSplit = words.split(' ');
        const citationConvert = new Array();
        wordsSplit.forEach(word => {
            citationConvert.push(CommonFunction.convertWordVietnameseUnsigned(word));
        });

        return citationConvert.join(' ');
    }

    static convertWordVietnameseUnsigned(word: string) {
        word = word.toLocaleLowerCase();
        word = word.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        word = word.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        word = word.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        word = word.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        word = word.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        word = word.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        word = word.replace(/đ/g, 'd');
        return word.replace(/(\s)/g, '');
    }
}