import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const BASE_URL: string = environment['API_URL'] + "/api/coins-collector";

const httpBaseOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  })
};


@Injectable({
  providedIn: 'root'
})
export class CoinsCollectorService {

  constructor(private http: HttpClient) { }


  getCoinsCollector(token: string, program?: string) {

    const httpOptions = {
      ...httpBaseOptions,
      headers: httpBaseOptions.headers.set('Authorization', `Bearer ${token}`)
    }

    if (!program) {
      return this.http.get(BASE_URL, httpOptions);
    }

    const params = new HttpParams().set('program', program);
    return this.http.get(BASE_URL, {
      ...httpOptions,
      params: params
    });
  }


  addDeleteCoinCollector(token: string, idCoin: string) {
    const httpOptions = {
      ...httpBaseOptions,
      headers: httpBaseOptions.headers.set('Authorization', `Bearer ${token}`)
    }

    return this.http.put(BASE_URL + "/add-delete", { idCoin: idCoin }, httpOptions);
  }
}
