import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import * as mapboxgl from 'mapbox-gl';
import { NavController } from '@ionic/angular';

declare var google;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {

  startPosition: any;
  originPosition: string;
  destinationPosition: string;
  
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation
  ) {}


  ngOnInit() {
    this.carregaMapa();
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
        instructions: false,
        profileSwitcher: false
      },
      placeholderOrigin: 'Informe sua localização atual',
      placeholderDestination: 'Para onde você quer ir?'
    });
    this.map.addControl(directions, 'top-left');

    this.geolocation.getCurrentPosition()
      .then((response) => {
        this.startPosition = response.coords;
        this.map.setCenter([this.startPosition.longitude, this.startPosition.latitude]);
        directions.setOrigin([this.startPosition.longitude, this.startPosition.latitude]);

       // Add geolocate control to the map.
       this.map.addControl(new mapboxgl.GeolocateControl({
              positionOptions: {
                enableHighAccuracy: true
              },
              trackUserLocation: true
            }));
      })
    
    console.log(this.map)
  }


 
}


