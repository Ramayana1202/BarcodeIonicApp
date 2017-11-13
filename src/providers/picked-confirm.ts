import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import { InventoryTranferImpl } from '../models/InventoryTranferImpl';
import { InventoryTranfer_LineImpl } from '../models/InventoryTranfer_LineImpl';
import { StockTransferLinesBinAllocationsImpl, BinActionTypeEnum } from '../models/StockTransferLinesBinAllocationsImpl';
import { BatchNumbersImpl } from '../models/BatchNumbersImpl';
import { SerialNumbersImpl } from '../models/SerialNumbersImpl';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the InventoryTransfersProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PickedConfirm {
  structure: any;
  data: any;
  controller = 'Picking'

  constructor(public http: Http, public api: Api) {

  }

  async LoadBatchLine(docEntry: number, lineNum: number) {
    return await this.api.getAsyncDataSet(this.controller, 'LoadBatchLine', [{ name: 'docEntry', value: docEntry }, { name: 'lineNum', value: lineNum }]);
  }

  getItem(barcode: string) {
    return new Promise(resolve => {
      this.api.get('InventoryTranfer', 'GetItemByBarcode', [{ name: 'barcode', value: barcode }])
        .map(res => res.json())
        .subscribe(data => {
          this.structure = this.api.ApzJsonDeserialize(data.Table)
          this.data = this.api.ApzJsonDeserialize(data.Table1)
          resolve([this.structure, this.data])
            ,
            (err) => {
              console.log(err);
              throw (err);
            }
        });
    });
  }

  GetWhs(binCode: string) {
    return new Promise(resolve => {
      this.api.get('InventoryTranfer', 'GetWhsByBin', [{ name: 'binCode', value: binCode }])
        .map(res => res.json())
        .subscribe(data => {
          resolve(this.api.ApzJsonDeserialize(data))
            ,
            (err) => {
              console.log(err);
              throw (err);
            }
        });
    });
  }

  doTransfer(data: any, binCode: any) {
    return new Promise(resolve => {
      this.createDoc(data, binCode).then((doc) => {
        this.api.post('InventoryTranfer', 'SaveDoc', doc)
          .map(res => res.json())
          .subscribe(data => {
            resolve(data)
              ,
              (err) => {
                console.log(err);
                resolve(err);
              }
          });
      })

    });
  }

  createDoc(data: any, binCode: any) {
    return new Promise((resolve) => {
      var toBinId = -1;
      var toWhs = '';
      //lấy thông tin kho từ bin
      this.GetWhs(binCode).then(whs => {
        if (whs) {
          toWhs = whs[0]['WhsCode'];
          toBinId = whs[0]['AbsEntry'];
        }
        let doc = new InventoryTranferImpl();
        doc.DocEntry = 0;
        doc.DocDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        doc.TaxDate = doc.DocDate;
        doc.DocDueDate = doc.DocDate;
        doc.ToWhsCode = toWhs;
        doc.Lines = new Array<InventoryTranfer_LineImpl>();
        doc.BinAllocations = new Array<StockTransferLinesBinAllocationsImpl>();
        data.forEach(row => {

          let line = new InventoryTranfer_LineImpl();
          line.LineNum = data.indexOf(row);
          line.ItemCode = row['ItemCode'];
          line.FromWhsCod = row['WhsCode'];
          doc.Filler = line.FromWhsCod;
          line.WhsCode = doc.ToWhsCode;
          line.Quantity = row['Quantity'];
          let type = row['ObjType'];
          if (type == '10000044') {
            line.BatchNumbers = new Array<BatchNumbersImpl>();
            let batchNo = row['DistNumber'];
            if (batchNo) {
              let batch = new BatchNumbersImpl();
              batch.BatchNumber = batchNo;
              batch.BaseLineNumber = line.LineNum;
              batch.Quantity = line.Quantity;
              line.BatchNumbers.push(batch);
            }
          }
          else if (type == '10000045') {
            line.SerialNumbers = new Array<SerialNumbersImpl>();
            let seriNo = row['DistNumber'];
            if (seriNo) {
              let serial = new SerialNumbersImpl();
              serial.BatchID = seriNo;
              serial.SystemSerialNumber = row['SysNumber'];
              serial.BaseLineNumber = line.LineNum;
              serial.Quantity = line.Quantity;
              line.SerialNumbers.push(serial);
            }
          }
          doc.Lines.push(line);
          // add bin
          let bin = new StockTransferLinesBinAllocationsImpl();
          bin.BinAbsEntry = row['BinAbs'];
          bin.BaseLineNumber = line.LineNum;
          bin.BinActionType = BinActionTypeEnum.batFromWarehouse;
          bin.Quantity = line.Quantity;
          bin.SerialAndBatchNumbersBaseLine = 0;
          if (bin.BinAbsEntry > 0) {
            doc.BinAllocations.push(bin);
          }
          let binTo = new StockTransferLinesBinAllocationsImpl();
          binTo.BinAbsEntry = toBinId;
          binTo.BaseLineNumber = line.LineNum;
          binTo.BinActionType = BinActionTypeEnum.batToWarehouse;
          binTo.Quantity = line.Quantity;
          binTo.SerialAndBatchNumbersBaseLine = 0;
          if (binTo.BinAbsEntry > 0)
            doc.BinAllocations.push(binTo);
        });
        resolve(doc); // return document transfer
      })
    })
  }

}
