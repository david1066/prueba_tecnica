import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {
  public url: string;
  public identity: any;
  public token: any;
  constructor(private _http: HttpClient) {
    this.url = global.url;
    this.identity = this.getIdentity();
  }
  prueba() {
    return "hosdlfs servicio";
  }

  register(user: any): Observable<any> {
    //convertir el objeto a un json string
    let params = JSON.stringify(user);
    console.log(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //peticion ajax
    return this._http.post(this.url + 'user/register', params, { headers: headers });
  }
  signup(user: any): Observable<any> {
    //comporbar si llega el gettoken


    console.log(user);


    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-type', 'application/json');


    return this._http.post(this.url + 'user/login', params, { headers: headers });


  }

  getIdentity() {
    let identity = JSON.parse(<any>localStorage.getItem('identity'));
    if (identity && identity != null && identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;

    }
    return this.identity;
  }


  update(user: any, id: string): Observable<any> {


    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    console.log(id);


    return this._http.put(this.url + 'user/update/' + id, params, { headers: headers })
  }

  delete(id: string): Observable<any> {


    let headers = new HttpHeaders().set('Content-Type', 'application/json')

    return this._http.delete(this.url + 'user/delete/' + id, { headers: headers })
  }
  getUsers(user: any): Observable<any> {

    let name = user.name;
    let surname = user.surname;
    let document=user.document;
    let idcity=user.idcity;
    if (user.name == null || user.name == undefined || user.name == '') {
      name = '0';
    }
    if (user.surname == null || user.surname == undefined || user.surname == '') {
      surname = '0';
    }
    if (user.document == null || user.document == undefined || user.document == '') {
      document = '0';
    }

    if (user.idcity == null || user.idcity == undefined || user.idcity == '') {
      idcity = '0';
    }

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url + 'user/users/' + name + '/' + surname + '/' + document + '/' + idcity, { headers: headers });
  }

  getUser(id: string): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url + 'user/' + id, { headers: headers });
  }
  search(search: string): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'user/search/' + search, { headers: headers });
  }

}
