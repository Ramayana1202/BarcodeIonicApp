import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { MainPage } from '../../pages/pages';
import { InventoryTransferPage } from '../../pages/inventory-transfer/inventory-transfer';
import { PickedConfirmPage } from '../../pages/picked-confirm/picked-confirm';
import { SettingsPage } from '../../pages/settings/settings';

import { Login, Common, MsgType, Settings } from '../../providers/providers';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {
    Doimain: string,
    UserName: string,
    Password: string,
    DbName: string,
    ClientVersion: string,
    BuildVersion: string
  } =
  {
    Doimain: '',
    UserName: '',
    Password: '',
    DbName: '',
    ClientVersion: '',
    BuildVersion: ''
  };
  listCompany: any;
  isLogin = false;
  disable = false;

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public login: Login,
    public translateService: TranslateService,
    public common: Common,
    public setting: Settings) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }
  ionViewDidEnter() {
    this.getDefautLogin();
  }

  ionViewDidLoad() {
    if (this.login._login != null)
      this.isLogin = true;
  }

  domainChange() {
    this.login.loadCompany(this.account.Doimain)
      .subscribe(data => {
        this.listCompany = data;
      }, (err) => {
        this.createToast(err, MsgType.error);
      });
  }

  // Attempt to login in through Login service
  doLogin() {
    this.disable = true;
    this.login.login(this.account).subscribe((resp) => {
      console.log(resp.json().Message)
      var httpResult = resp.json();
      if (httpResult.Message == '') {
        switch (this.setting.settings.defaultPage) {
          case 'ReportCompletePage':
            this.navCtrl.setRoot(MainPage);
            break;
          case 'PickedConfirmPage':
            this.navCtrl.setRoot(PickedConfirmPage);
            break;
          default:
            this.navCtrl.setRoot(InventoryTransferPage);
            break;
        }

      } else {
        this.createToast(httpResult.Message, MsgType.error);
        this.disable = false;
      }
    }, (err) => {
      // Unable to log in
      this.createToast(err, MsgType.error);
      this.disable = false;
    });

  }

  loadCompany() {
    this.login.loadCompany(this.account.Doimain)
      .subscribe(data => {
        this.listCompany = data;
      }, (err) => {
        this.createToast(err, MsgType.error);
      });
  }

  loadCompany2() {
    this.login.loadCompany2(this.account.Doimain)
      .then(data => {
        this.listCompany = data;
      }, (err) => {
        this.createToast(err, MsgType.error);
      });
  }

  openSetting() {
    this.navCtrl.push(SettingsPage);
  }

  getDefautLogin() {
    this.login.initApi().then(setting => {
      this.account.Doimain = setting.domain;
      this.account.DbName = setting.company;
      this.account.UserName = setting.userName;
      this.loadCompany();
    },
      (err) => {
        this.createToast(err, MsgType.error);
      });
  }

  createToast(mesg: any, type: MsgType) {
    this.common.createToast(mesg, type);
  }

}
