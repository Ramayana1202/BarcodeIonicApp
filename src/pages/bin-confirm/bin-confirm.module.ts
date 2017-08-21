import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BinConfirmPage } from './bin-confirm';

@NgModule({
  declarations: [
    BinConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(BinConfirmPage),
  ],
})
export class BinConfirmPageModule {}
