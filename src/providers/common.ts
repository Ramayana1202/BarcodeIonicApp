import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class Common {

    constructor(public toastCtrl: ToastController) {

    }
    createToast(mesg: any, type: MsgType) {
        if (type == MsgType.success) {
            let toast = this.toastCtrl.create({
                message: mesg,
                duration: 3000,
                position: 'top',
                cssClass: 'toast-success'
            });
            return toast.present();
        } else {
            let toast = this.toastCtrl.create({
                message: mesg,
                duration: 3000,
                position: 'top',
                cssClass: 'toast-error'
            });
            return toast.present();
        }
    }
}

export enum MsgType {
    success = 1,
    error = 0
}