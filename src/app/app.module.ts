import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http' ; 
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';











@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),RouterModule, AppRoutingModule, HttpClientModule ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    NativeGeocoder
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
