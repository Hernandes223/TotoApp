import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, LoadingController, ToastController, MenuController } from '@ionic/angular';
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
    public toastController:ToastController,
    public menu : MenuController,
  ) { }
  ngOnInit() {
  }
  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }
  // Função de login
  
async toast(){
  const toast = await this.toastController.create({
    message: 'Usuário ou Senha Incorretos',
    duration: 3000
  });
  toast.present();
}

  login(form: NgForm) {
    try {
      this.authService.login(form.value.email, form.value.password).subscribe(
        data => {
          this.alertService.presentToast("Voçe esta logado");
          console.log(data);
        },
        error => {
          console.log(error);
          this.toast()
        },
        () => {
          this.dismissLogin();
          this.navCtrl.navigateRoot('/home');
        }
      );
      
    } catch (error) {
     
     }
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
