import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import { Settings } from './settings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Login {
  public listCompany: any;
  _login: any;

  constructor(public http: Http, public api: Api, public setting: Settings) {
  }

  initApi() {
    return this.setting.load().then(option => {
      this.api.url = option.apiAdress;
      return Promise.resolve(option);
    })
  }

  loadCompany(domain: string) {
    return this.api.get('Commons', 'GetDbList', [{ name: 'domain', value: domain }])
      .map(res => res.json())
  }

  loadCompany2(domain: string) {
    if (this.listCompany) {
      return Promise.resolve(this.listCompany);
    }

    return new Promise(resolve => {
      this.api.get('Commons', 'GetDbList', [{ name: 'domain', value: domain }])
        .map(res => res.json())
        .subscribe(data => {
          this.listCompany = data;
          resolve(this.listCompany);
          console.log(this.listCompany),
            Error => {
              console.log('Something went wrong!');
            }
        });
    });
  }

  saveLoginInfor(loginInfo: any) {
    this.setting.settings.domain = loginInfo.Doimain;
    this.setting.settings.company = loginInfo.DbName;
    this.setting.settings.userName = loginInfo.UserName;
    this.setting.save();
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(loginInfo: any) {
    let seq = this.api.post('LoginIRS', 'PDALogin', loginInfo).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        // If the API returned a successful response, mark the user as logged in
        if (res.Message == '') {
          this._loggedIn(loginInfo);
          this.saveLoginInfor(loginInfo);
          this.api._sessionId = res.Content;
        } else {
          console.error('ERROR', res.Message);
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    return new Promise(resolve => {
      this.api.get('LoginIRS', 'LogOut', [{ name: 'userName', value: this._login.UserName }])
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        });
    })
  }

  _loggedOut() {
    this._login = null;
    this.api._sessionId = '';
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(loginInfo) {
    this._login = loginInfo;
  }
}
