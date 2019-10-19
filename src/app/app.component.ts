import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public Ctrl:NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  //Rotas do menu toggle
  openHome(){
    this.Ctrl.navigateForward('/home')
  }

  openHelp(){
    this.Ctrl.navigateForward('/help')
  }

  openRelat(){
    this.Ctrl.navigateForward('/relatorio')
  }

  openConfig(){
    this.Ctrl.navigateForward('/configuracao')
  }
}
