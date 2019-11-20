import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
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
    this.marcaMapa()
  }


  carregaMapa() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 18,
      center: [this.lng, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    console.log(this.map)
  }


  marcaMapa(){
    this.map.on('load', function(e) {
      var features = this.map.queryRenderedFeatures(e.point, {
        layers: [''] // replace this with the name of the layer
      });
    
      if (!features.length) {
        return;
      }
    
      var feature = features[0];
    
      var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
        .addTo(this.map);
    });
  }
}


