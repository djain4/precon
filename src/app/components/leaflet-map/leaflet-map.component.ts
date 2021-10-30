import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Map, Control, DomUtil, ZoomAnimEvent , Layer, MapOptions, LayerGroup, latLng, tileLayer, DivIcon, marker } from 'leaflet';
import * as L from "leaflet";

declare module 'leaflet' {
  interface Control {
     _addTo(map: Map): Control;
  }
  interface Map {
    _leaflet_id: number;
    _container: HTMLElement;
  }
}
@Component({
  selector: 'precon-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit, OnDestroy {
  // @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  @Input() options: MapOptions = {};
  map: any;
  private zoom: number = 9;
  private markers: Layer[] = [];
  stations: any;
  iconUrl = "https://decisionfarm.ca/assets/images/marker-icon-2x.png";

  markersLayer = new LayerGroup();
  sMarkersLayer: any;
  zoomLevel = 9;

  private loadingOptions={
    position: 'topleft',
  };

  constructor() { 
    // this.map = null;
  }

  ngOnInit() {
    this.options = {
      zoom: 8,
      center: latLng(49.8567, -100.9651),
      layers: [
        tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    };
    this.iconUrl = "https://decisionfarm.ca/assets/images/marker-icon-2x.png";
    this.stations = [
      {
        id: "CAMBOT0548",
        name: "Kenton (MAFRI)",
        lat: "50.01870",
        lng: "-100.59260",
        installed: 1,
        active: 1,
        province: "MB",
        type: "WIN"
      },
      {
        id: "CAMBSWELKH",
        name: "Elkhorn (WIN)",
        lat: "49.92680",
        lng: "-101.20290",
        installed: 1,
        active: 1,
        province: "MB",
        type: "WIN"
      },
      {
        id: "CAMBSWPRSN",
        name: "Pierson (WIN)",
        lat: "49.17600",
        lng: "-101.27430",
        installed: 1,
        active: 1,
        province: "MB",
        type: "WIN"
      },
      {
        id: "CAMBSWVRDN",
        name: "Virden (WIN)",
        lat: "49.85670",
        lng: "-100.96510",
        installed: 1,
        active: 1,
        province: "MB",
        type: "WIN"
      },
      {
        id: "CASKSCI002",
        name: "Welwyn (WIN)",
        lat: "50.28534",
        lng: "-101.55290",
        installed: 1,
        active: 1,
        province: "SK",
        type: "WIN"
      },
      {
        id: "CASKSCI008",
        name: "Storthoaks (WIN)",
        lat: "49.45841",
        lng: "-101.64184",
        installed: 1,
        active: 1,
        province: "SK",
        type: "SK"
      },
      {
        id: "CASKSCI027",
        name: "Fairlight (WIN)",
        lat: "49.84212",
        lng: "-101.74210",
        installed: 1,
        active: 1,
        province: "SK",
        type: "WIN"
      },
      {
        id: "CAMBECCWEI",
        name: "MELITA (EC)",
        lat: "49.28333",
        lng: "-100.98333",
        installed: "NULL",
        active: "NULL",
        province: "MB",
        type: "EC"
      }
    ]
  }

  ngOnDestroy() {
    // this.map.clearAllEventListeners;
    // this.map.remove();
  };

  // onMapReady(map: Map) {
  //   this.map = map;
  //   this.map$.emit(map);
  //   this.zoom = map.getZoom();
  //   this.zoom$.emit(this.zoom);
  // }

  onMapZoomEnd(e: ZoomAnimEvent) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }

  createStations() {
    this.sMarkersLayer = new LayerGroup();

    for (const s of this.stations) {
      let icon;
      icon = new DivIcon({
        html: `<img src='${this.iconUrl}'/> <span>${s.name}</span>`
      });
      const marker = L.marker([s.lat, s.lng], { icon, title: s.name}).addTo(this.map).on('click', this.onClick, this);

      this.sMarkersLayer.addLayer(marker);
    }
    this.markersLayer.addLayer(this.sMarkersLayer);
  }

  onClick(data: any){
    console.log(data);
    alert(`Get ready to explore project @::` +  data.target.options.title)
    // const sidebar = this.sidebar.sidebar;
    // sidebar.removePanel('text');
    // let title=data.target.options.title;
    // let panelHtml = `<h1>${title}</h1><p>Some text for ${title}</p>`
    // this.panelContent.pane=panelHtml;
    // sidebar.addPanel(this.panelContent);
    // sidebar.open('text');
  }

  onMapReady(map: Map) {
    setTimeout(() => {
      map.invalidateSize();
      this.map = map;
      map.addLayer(this.markersLayer);
      this.createStations();
    }, 200);
  }

}
