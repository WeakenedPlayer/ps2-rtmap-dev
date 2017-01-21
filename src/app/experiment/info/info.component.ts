import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';

export class GeoObject {
  time: Date;         // time
  creator: string;    // creator
  obj: number;        // objectType
  lat: number;
  lng: number;
}

export class GeoEvent {
  time: Date;
  creator: string;
  tgt: string;        // target GeoObject key
  evt: number;
}

class VehicleIcon {
  id: number;
  name: string;
  img: {
    ally: string;
    enemy: string;
    squad: string;
  }
}


export const list: VehicleIcon[] = [
  { id:  1, name: 'Flash',     img: { ally: 'assets/icon/2560.png', enemy: 'assets/icon/2563.png', squad: 'assets/icon/2566.png' } },
  { id:  2, name: 'Lightning', img: { ally: 'assets/icon/2524.png', enemy: 'assets/icon/2527.png', squad: 'assets/icon/2530.png' } },
  { id:  3, name: 'Sunderer',  img: { ally: 'assets/icon/2578.png', enemy: 'assets/icon/2581.png', squad: 'assets/icon/2584.png' } },
  { id:  4, name: 'Magrider',  img: { ally: 'assets/icon/2533.png', enemy: 'assets/icon/2536.png', squad: 'assets/icon/2539.png' } },
  { id:  5, name: 'Prowler',   img: { ally: 'assets/icon/2551.png', enemy: 'assets/icon/2554.png', squad: 'assets/icon/2557.png' } },
  { id:  6, name: 'Vanguard',  img: { ally: 'assets/icon/2587.png', enemy: 'assets/icon/2590.png', squad: 'assets/icon/2593.png' } },
  { id:  7, name: 'Liberator', img: { ally: 'assets/icon/2515.png', enemy: 'assets/icon/2518.png', squad: 'assets/icon/2521.png' } },
  { id:  8, name: 'Galaxy',    img: { ally: 'assets/icon/2506.png', enemy: 'assets/icon/2509.png', squad: 'assets/icon/2512.png' } },
  { id:  9, name: 'Scythe',    img: { ally: 'assets/icon/2596.png', enemy: 'assets/icon/2599.png', squad: 'assets/icon/2602.png' } },
  { id: 10, name: 'Mosquito',  img: { ally: 'assets/icon/2542.png', enemy: 'assets/icon/2545.png', squad: 'assets/icon/2548.png' } },
  { id: 11, name: 'Reaver',    img: { ally: 'assets/icon/2569.png', enemy: 'assets/icon/2572.png', squad: 'assets/icon/2575.png' } },
];

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit {
  list: VehicleIcon[] = list;

  constructor() { }

  ngOnInit() {
  }
}
