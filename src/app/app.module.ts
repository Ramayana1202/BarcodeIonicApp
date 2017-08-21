import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { ReportCompletePage } from '../pages/report-complete/report-complete';
import { InventoryTransferPage } from '../pages/inventory-transfer/inventory-transfer';
import { BinConfirmPage } from '../pages/bin-confirm/bin-confirm';

import { Api } from '../providers/api';
import { Settings } from '../providers/settings';
import { Login } from '../providers/login';
import { ReportComplete } from '../providers/report-complete';
import { Common } from '../providers/common';
import { InventoryTransfers } from '../providers/inventory-transfers';

import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    apiAdress: 'http://172.16.195.60:8082/api',
    domain: 'apzon',
    company: 'IRS_DEV',
    userName: 'manager',
    barcodeInternal: true,
    defaultPage: 'ReportCompletePage'
  });
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SettingsPage,
    ReportCompletePage,
    InventoryTransferPage,
    BinConfirmPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SettingsPage,
    ReportCompletePage,
    InventoryTransferPage,
    BinConfirmPage
  ],
  providers: [
    Api,
    Login,
    ReportComplete,
    InventoryTransfers,
    Common,
    Camera,
    BarcodeScanner,
    SplashScreen,
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },

  ]
})
export class AppModule { }
