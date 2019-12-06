import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { BuscaService } from '../buscaservice/busca.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getToken() {
    throw new Error("Method not implemented.");
  }

  isLoggedIn = false;
  token:any;
  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
    private busca: BuscaService,
    public alertController: AlertController,
  ) { }
  login(email: String, password: String) {
    return this.http.post(this.env.API_URL + '/api/login',
      {email: email, password: password}
    ).pipe(
      tap(token => {
        this.storage.setItem('token', token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }

  logout() {
        const headers = new HttpHeaders();
          return this.http.get(this.env.API_URL + '/api/logout', { headers: headers })
          .pipe(
            tap(data => {
              this.storage.remove("token");
              this.isLoggedIn = false;
              delete this.token;
              return data;
            })
          )
    
  }

  //Alerta para salvar ultimo local
  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     subHeader: 'Salvar local',
  //     message: 'Salvar ultimo local',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }, {
  //         text: 'Sim',
  //         handler: (okay) => {
  //           console.log('Confirm Okay');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

}
