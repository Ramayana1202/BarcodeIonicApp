import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { InventoryTransfers, Settings, Common, MsgType } from '../../providers/providers';
import { BinConfirmPage } from '../bin-confirm/bin-confirm';

/**
 * Generated class for the InventoryTransferPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventory-transfer',
  templateUrl: 'inventory-transfer.html',
})
export class InventoryTransferPage {
  @ViewChild('focusInput') barcodeInput;

  barcode: any;
  listBarcode: [{}];
  structrure: any;
  data: any;
  isUseBarcode = false;


  // Our translated text strings
  private errorDataNotFound: string;

  constructor(private transfer: InventoryTransfers,
    private modalCtrl: ModalController,
    private translateService: TranslateService,
    private barcodeScanner: BarcodeScanner,
    private common: Common,
    private setting: Settings) {

    this.translateService.get('DATA_NOT_FOUND').subscribe((value) => {
      this.errorDataNotFound = value;
    });
  }

  ionViewDidLoad() {
    this.setting.load().then(setting => {
      if (setting.barcodeInternal) {
        this.isUseBarcode = true;
      }
      setTimeout(() => {
        this.barcodeInput.setFocus();
      }, 150);
    })
  }

  handler(ev) {
    if (ev.keyCode == 13 && this.barcode != '') {
      if (this.listBarcode != null && this.listBarcode.indexOf(this.barcode) > -1) {
        this.barcode = '';
        return;
      }
      this.transfer.getItem(this.barcode)
        .then(data => {
          this.getData(data);
          let bar = this.barcode;
          if (this.listBarcode != null)
            this.listBarcode.push(bar);
          else
            this.listBarcode = [bar];
        }, (err) => {
          this.createToast(err, MsgType.error);
        });
      this.barcode = '';
      this.barcodeInput.setFocus();
    }
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      if (barcodeData.cancelled)
        return;
      if (this.listBarcode != null && this.listBarcode.indexOf(this.barcode) > -1) {
        this.barcode = '';
        return;
      }
      this.transfer.getItem(barcodeData.text)
        .then(data => {
          this.getData(data);
          let bar = barcodeData.text;
          if (this.listBarcode != null)
            this.listBarcode.push(bar);
          else
            this.listBarcode = [bar];
        }, (err) => {
          this.createToast(err, MsgType.error);
        });
    }).catch(err => {
      this.createToast(err, MsgType.error);
    })
  }

  createToast(mesg: any, type: MsgType) {
    this.common.createToast(mesg, type).then(rs => {
      this.barcodeInput.setFocus();
    });
  }

  getData(data: any) {
    if (data[0] != null && data[0].length > 0)
      this.structrure = data[0];

    if (data[1] != null && data[1].length > 0) {
      if (this.data == null) {
        this.data = data[1];
      } else {
        data[1].forEach(obj => {
          this.data.push(obj);
        });
      }
    } else {
      this.createToast(this.errorDataNotFound, MsgType.error);
    }
  }

  refreshForm() {
    this.structrure = null;
    this.data = null;
    this.listBarcode = null;
    this.barcodeInput.setFocus();
  }

  submit() {
    try {
      //check data empty
      if (this.data == null || this.data.length == 0) {
        this.createToast("Data is empty!", MsgType.error);
        this.barcodeInput.setFocus();
        return;
      }
      let binModal = this.modalCtrl.create(BinConfirmPage, { isUseBarcode: this.isUseBarcode });
      binModal.onDidDismiss(barcode => {
        if (barcode)
          this.confirmBin(barcode);
        setTimeout(() => {
          this.barcodeInput.setFocus();
        }, 150);
      });
      binModal.present();
    } catch (error) {
      this.createToast(error, MsgType.error);
    }
  }

  confirmBin(binCode: any) {
    this.transfer.doTransfer(this.data, binCode)
      .then(rs => {

        if (rs['Message'] == "") {
          this.createToast("Inventory transfer success! " + rs['Content'], MsgType.success);
          this.refreshForm();
        } else {
          this.createToast(rs['Message'], MsgType.error);
          console.log(rs['Message']);
          this.barcodeInput.setFocus();
        }
        (err) => {
          this.createToast(err, MsgType.error);
        }
      })

  }
}