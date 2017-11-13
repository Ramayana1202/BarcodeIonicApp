import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickedConfirmPage } from './picked-confirm';

@NgModule({
  declarations: [
    PickedConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(PickedConfirmPage),
  ],
})
export class PickedConfirmPageModule {}
