
import { Injectable } from '@angular/core';
import { HttpClientHelper } from './http-helper';

@Injectable()
export class PickingClient {
  _controller = 'Picking';
  constructor(public helper: HttpClientHelper) {
    helper._controller = this._controller;
  }

  public async LoadBatchLine(docEntry: number, lineNum: number) {
    return await this.helper.getAsyncDataSet('LoadBatchLine', [{ name: 'docEntry', value: docEntry }, { name: 'lineNum', value: lineNum }]);
  }

}
