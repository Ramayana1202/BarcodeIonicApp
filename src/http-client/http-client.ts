import { ICommonClient, CommonsClient } from './common-client';

export interface IHttpClient {
    Commons: ICommonClient;
    //Picking: IPickingClient;
}


export class HttpClientRepository implements IHttpClient {
    
    public get Commons() {
        return new CommonsClient();
    }

    //public get Picking() {
    //    return new PickingClient();
    //}
}