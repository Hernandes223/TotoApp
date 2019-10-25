import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  API_URL = 'http://localhost/totoApi/public/api';

  constructor() { }


}
