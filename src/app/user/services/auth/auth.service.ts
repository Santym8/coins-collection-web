import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';


const BASE_URL: string = environment['API_URL'] + "/api/user";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public login(username: string, password: string) {
    return this.http.post(BASE_URL + "/login", { username, password }, httpOptions);
  }

  public register(username: string, email: string, password: string) {
    return this.http.post(BASE_URL + "/register", { username, email, password }, httpOptions);
  }

}
