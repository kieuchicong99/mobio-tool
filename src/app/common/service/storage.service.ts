import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {
    getLocal(key: string) {
        const dataStorage: any = JSON.parse(localStorage.getItem(key));
        console.log(dataStorage)
        if (!dataStorage || !dataStorage.data) {
            return undefined;
        }
        return dataStorage.data;
    }

    getSession(key: string) {
        const dataStorage: any = JSON.parse(sessionStorage.getItem(key));
        if (!dataStorage || !dataStorage.data) {
            return undefined;
        }
        return dataStorage.data;
    }

    setLocal(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify({ data: value }));
    }
    setSession(key: string, value: any) {
        sessionStorage.setItem(key, JSON.stringify({ data: value }));
    }
}