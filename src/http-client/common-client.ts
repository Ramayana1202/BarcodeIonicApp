
export interface ICommonClient {
    getAllEmployee(): any;
}

import { Injectable } from '@angular/core';

@Injectable()
export class CommonsClient implements ICommonClient {
    
    public  getAllEmployee() {
        console.log('get all employee');
    }

}
