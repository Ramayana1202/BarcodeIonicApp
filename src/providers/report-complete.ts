import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReportComplete {
  structure: any;
  data: any;

  constructor(public http: Http, public api: Api) {

  }

  getProduction(barcode: string) {
    return new Promise(resolve => {
      this.api.get('ProductionOder', 'GetProductionByBarcode', [{ name: 'barcode', value: barcode }])
        .map(res => res.json())
        .subscribe(data => {
          this.structure = this.api.ApzJsonDeserialize(data.Table)
          this.data = this.api.ApzJsonDeserialize(data.Table1)
          resolve([this.structure, this.data])
            ,
            (err) => {
              console.log(err);
              throw(err);
            }
        });
    });
  }

  reportComplete(data: any) {
    return new Promise(resolve => {
      this.api.post('ProductionOrderImportTool', 'SaveRC', data)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
            ,
            (err) => {
              console.log(err);
              resolve(err);
            }
        });
    });
  }

}

