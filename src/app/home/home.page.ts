import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import * as mapboxgl from 'mapbox-gl';
import { NavController } from '@ionic/angular';
import { BuscaService } from '../buscaservice/busca.service';

declare var google;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {

  startPosition: any;
  originPosition: string;
  destinationPosition: any;

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  public respons: any;
  resposta: any;
  receberValor: any;
  latitude1: any;
  longitude1: any;
  longRet: number;
  latRet: number;


  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    public busca: BuscaService,
  ) {
    this.receberValor = localStorage.getItem('item')
  }


  ngOnInit() {
    this.carregaMapa();
    this.longRet = parseFloat(localStorage.getItem('longitudeRetorno'))
    this.latRet = parseFloat(localStorage.getItem('latitudeRetorno'))
  
  }


  carregaMapa() {
    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoiaGVybmFuZGVzMTE3IiwiYSI6ImNrMnRidHN2MjE5cmQzbW1icWhoNWNqcGsifQ.koRdpoTZ5Cl4Iy694CeRJA';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 18,
    });

    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving-traffic',
      congestion: true,
      controls: {
        instructions: true,
        profileSwitcher: false,
      },
      placeholderOrigin: 'Informe sua localização atual',
      placeholderDestination: 'Para onde você quer ir?'
    });
    this.map.addControl(directions, 'top-left');

    //Seta as posições
    this.geolocation.getCurrentPosition()
      .then((response) => {
        // const longRet = parseFloat(localStorage.getItem('longitudeRetorno'))
        // const latRet = parseFloat(localStorage.getItem('latitudeRetorno'))
        this.startPosition = response.coords;
        this.map.setCenter([this.startPosition.longitude, this.startPosition.latitude]);
        directions.setOrigin([this.startPosition.longitude, this.startPosition.latitude]);
        this.map.setCenter([this.longRet, this.latRet]);
        directions.setDestination([this.longRet, this.latRet]);
     

        // Add controle de geolocalização no mapa.
        this.map.addControl(new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        }));


        this.busca.local().then((resp) => {
          if (resp) {
            this.latitude1 = localStorage.setItem('latitudeRetorno', (resp.data.latitude))
            this.longitude1 = localStorage.setItem('longitudeRetorno', (resp.data.longitude))
            console.log('dados recebidos', resp)
          }

        }).catch((error) => {
          console.log('Error ao receber a localizacao', error);
        });


      })


    console.log(this.map)


  }



}




