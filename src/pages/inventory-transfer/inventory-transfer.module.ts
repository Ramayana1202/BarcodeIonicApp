import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryTransferPage } from './inventory-transfer';

@NgModule({
  declarations: [
    InventoryTransferPage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryTransferPage),
  ],
})
export class InventoryTransferPageModule {}
