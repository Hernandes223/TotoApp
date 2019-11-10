import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { AlertService } from '../services/alert.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.page.html',
  styleUrls: ['./configuracao.page.scss'],
})
export class ConfiguracaoPage implements OnInit {
  modalController: any;
  

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    public loadingController:LoadingController
    ) { }

  ngOnInit() {
  }

  dismissLogout() {
    this.modalController.dismiss();
  }

  logout() {
    this.authService.logout().subscribe(
      data => {
        this.alertService.presentToast("Voce Saiu")
      },
      error => {
        console.log(error);
      },
      () => {
        this.navCtrl.navigateRoot('/login');
      }
    );
  }

  //Carregamento do login/access/ logout-Sair
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Aguarde...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
}
