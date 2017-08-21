import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { Common, MsgType } from '../../providers/providers';

/**
 * Generated class for the BinConfirmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bin-confirm',
  templateUrl: 'bin-confirm.html',
})
export class BinConfirmPage {
  @ViewChild('binInput') binInput;

  isReadyToSave: boolean;
  isUseBarcode = false;
  barcode: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private barcodeScanner: BarcodeScanner,
    private common: Common) {
    this.isUseBarcode = navParams.get('isUseBarcode');
  }

  ionViewDidLoad() {
    if (this.isUseBarcode)
      this.scanBarcode();
    setTimeout(() => {
      this.binInput.setFocus();
    }, 250);
  }

  scanBarcode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      if (!barcodeData.cancelled)
        this.barcode = barcodeData.text;
      setTimeout(() => {
        this.binInput.setFocus();
      }, 150);
    }, (err) => {
      this.common.createToast(err, MsgType.error).then(() => {
        setTimeout(() => {
          this.binInput.setFocus();
        }, 150);
      });
    })
  }

  changeBarcode() {
    this.isReadyToSave = this.barcode;
  }
  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * back to the presenter.
   */
  done() {
    if (!this.barcode) { return; }
    this.viewCtrl.dismiss(this.barcode);
  }
}
