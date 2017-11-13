import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class HttpClientHelper {
  url: string;
  _sessionId: any;
  _controller: string;
  _options: RequestOptions;

  constructor(public http: Http) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('SessionId', this._sessionId);
    this._options = new RequestOptions({
      headers: header,
    })
  }

  get(controller: string, endpoint: string, params?: { name: any, value: any }[], options?: RequestOptions) {
    if (!options) {
      options = this.creatOption();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(params[k].name, params[k].value);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }
    return this.http.get(this.url + '/' + controller + '/' + endpoint, options);
  }

  async getAsync(action: string, params?: { name: any, value: any }[]) {
    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(params[k].name, params[k].value);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      this._options.search = !this._options.search && p || this._options.search;
    }
    return new Promise(resolve => {
      this.http.get(this.url + '/' + this._controller + '/' + action, this._options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
          Error => {
            console.log(Error);
          }
        });
    }).catch(err => {
      console.log(err);
    })
  }

  async getAsyncDataSet(action: string, params?: { name: any, value: any }[]) {
    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(params[k].name, params[k].value);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      this._options.search = !this._options.search && p || this._options.search;
    }
    return new Promise(resolve => {
      this.http.get(this.url + '/' + this._controller + '/' + action, this._options)
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
          let dataSet: [{}];
          if (data.count > 0)
            data.forEach(element => {
              dataSet.push(this.ApzJsonDeserialize(element));
            });
          resolve(dataSet);
          Error => {
            console.log(Error);
          }
        });
    }).catch(err => {
      console.log(err);
    })
  }

  post(controller: string, endpoint: string, body: any, options?: RequestOptions) {
    if (!options) {
      options = this.creatOption();
    }
    return this.http.post(this.url + '/' + controller + '/' + endpoint, body, options);
  }

  put(controller: string, endpoint: string, body: any, options?: RequestOptions) {
    if (!options) {
      options = this.creatOption();
    }
    return this.http.put(this.url + '/' + controller + '/' + endpoint, body, options);
  }

  delete(controller: string, endpoint: string, options?: RequestOptions) {
    if (!options) {
      options = this.creatOption();
    }
    return this.http.delete(this.url + '/' + controller + '/' + endpoint, options);
  }

  creatOption(): RequestOptions {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('SessionId', this._sessionId);
    return new RequestOptions({
      headers: header,
    })
  }

  ApzJsonDeserialize(data: any): any {
    try {
      if (null == data || !data.hasOwnProperty('Apz-Columns'))
        return data;

      var table: any;
      var collumns = data['Apz-Columns'];
      var rows = data['Apz-Rows'];

      for (var i = 0; i < rows.length; i++) {
        var obj = {};
        var row = rows[i];

        for (var j = 0; j < collumns.length; j++) {
          var col = collumns[j];
          obj[col.Name] = row[j];
        }
        if (table != null)
          table.push(obj);
        else
          table = [obj];

      }
      return table;
    } catch (error) {
      throw (error);
    }

  }

}
