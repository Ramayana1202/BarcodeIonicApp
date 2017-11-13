import { Injectable } from '@angular/core';
import { IHttpClient, HttpClientRepository } from './http-client';

@Injectable()
export class HttpClientFactory {

    static GetHttpClient(): IHttpClient {
        return new HttpClientRepository();
    }
    
}