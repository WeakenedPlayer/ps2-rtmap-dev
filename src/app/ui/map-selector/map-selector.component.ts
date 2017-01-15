import { Component, OnInit, Output } from '@angular/core';
import { Resources } from '../../resource';

@Component({
  selector: 'map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.css']
})
export class MapSelectorComponent implements OnInit {
  @Output() selectedContinent: Resources.ContinentInfo;
  isActive: boolean = true;
  continents: Resources.ContinentInfo[] = Resources.ContinentInfoList;

  constructor() {
    this.continents = Resources.ContinentInfoList;
    this.selectedContinent = this.continents[0];
  }

  selectContinent( continent: Resources.ContinentInfo ) {
    // needs validation
    this.selectedContinent = continent;
  }

  toggleActivation() {
    this.isActive = !this.isActive;
  }

  ngOnInit() {
  }
}
