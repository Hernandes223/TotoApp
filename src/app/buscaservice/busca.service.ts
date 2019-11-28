import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuscaService {

  constructor(
    private http: HttpClient,
  ) { }

  local(): Promise<any> {
    return this.http.get(`${environment.api}/local/localizacao/visualizacao`).toPromise();
  }
}
