import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, LoadingController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';






@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    public loadingController: LoadingController,
    public toastController:ToastController
  ) { }
  ngOnInit() {
  }
  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }
  // Função de login
  
  login(form: NgForm) {
    this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.alertService.presentToast("Voçe esta logado");
        console.log(data);
      },
      error => {
        console.log(error);
      },
      () => {
        this.dismissLogin();
        this.navCtrl.navigateRoot('/home');
      }
    );
  }
  //Carregamento do login/access
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Aguarde...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Carregamento concluido!');
  }

  //Validação do login
  // async ErroLogin() {
  //   const toast = await this.toastController.create({
  //     header: 'Atenção',
  //     message: 'E-mail ou senha incorreta',
  //     duration: 2000
  //   });
  //   toast.present();
  // } 

}
