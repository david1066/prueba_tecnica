import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { global } from './global';

@Injectable()
export class CityService {
  public url: string;
  public identity:any;

  constructor(private _http: HttpClient) {
    this.url = global.url;

    
    
  }
 

 
  getCities():Observable<any>{
   
    let headers = new HttpHeaders().set('Content-Type','application/json');
     
    return this._http.get(this.url+'city/getcities', {headers:headers});
  }
  
  
}
