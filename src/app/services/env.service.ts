import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  
  API_URL = 'https://frozen-ocean-11440.herokuapp.com/api';

  constructor() { }


}
