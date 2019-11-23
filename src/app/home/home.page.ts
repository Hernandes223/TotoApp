import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = -10.26340452;
  lng = -48.32551003;

  constructor() {

    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoiaGVybmFuZGVzMTE3IiwiYSI6ImNrMnRidHN2MjE5cmQzbW1icWhoNWNqcGsifQ.koRdpoTZ5Cl4Iy694CeRJA';
    
  }
  ngOnInit() {
    this.carregaMapa();
  }


  carregaMapa() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 18,
      center: [this.lng, this.lat]
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
    console.log(this.map)
  }


 
}


