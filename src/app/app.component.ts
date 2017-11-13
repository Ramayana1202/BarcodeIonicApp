import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirstRunPage } from '../pages/pages';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { ReportCompletePage } from '../pages/report-complete/report-complete';
import { InventoryTransferPage } from '../pages/inventory-transfer/inventory-transfer';
import { PickedConfirmPage } from '../pages/picked-confirm/picked-confirm';

import { Settings } from '../providers/providers';
import { Login } from '../providers/login';

import { TranslateService } from '@ngx-translate/core'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  isLogin = false;

  pages: any[] = [
    { title: 'Login', component: LoginPage },
    { title: 'Report Complete', component: ReportCompletePage },
    { title: 'Inventory Transfer', component: InventoryTransferPage },
    { title: 'Picked Confirm', component: PickedConfirmPage },
    { title: 'Settings', component: SettingsPage }
  ]

  constructor(private translate: TranslateService,
    private platform: Platform,
    settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public login: Login, ) {

    this.initTranslate();
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (!this.login._login)
      this.nav.setRoot(LoginPage);
    else
      this.nav.setRoot(page.component);
  }

  logOut() {
    this.login.logout().then(res => {
      this.login._loggedOut();
      this.nav.setRoot(FirstRunPage);
    });
  }

}
