import { Injectable } from '@angular/core';
import {Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  api: any = "http://localhost/totoApi/public/api";

  constructor(
    public Http:HttpClient,
  ) 
  { }

  postLogin(usuario){
    var headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Method", "POST, GET, OPTION, PUT");
    headers.append("Access-Content-Type", "application/json");

  const requestOptions = new RequestOptions({headers: headers});
   

    let postData = {
      "email" : usuario.email,
      "password" : usuario.senha
    };

    return this.Http.post(this.api+"/login", postData).map((res: { json: () => void; }) => res.json());
  
  }
  
}
