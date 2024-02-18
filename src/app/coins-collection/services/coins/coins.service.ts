import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const BASE_URL: string = environment['API_URL'] + "/api/coin";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  constructor(private http: HttpClient) { }


  getCoins(program?: string) {

    if (!program) {
      return this.http.get(BASE_URL, httpOptions);
    }

    const params = new HttpParams().set('program', program);
    
    return this.http.get(BASE_URL, {
      ...httpOptions, params
    });
  }


}
