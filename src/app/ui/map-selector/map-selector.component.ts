import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Resources } from '../../resource';

@Component({
  selector: 'app-continent-selector',
  templateUrl: './continent-selector.component.html'
})
export class ContinentSelectorComponent implements OnInit {
  isActive: boolean = true;
  continents: Resources.ContinentInfo[] = Resources.ContinentInfoList;
  @Input()  selectedContinent: Resources.ContinentInfo;
  @Output() selectedContinentChange = new EventEmitter<Resources.ContinentInfo>();

  constructor() {
    this.continents = Resources.ContinentInfoList;
    this.selectedContinent = this.continents[0];
  }

  selectContinent( continent: Resources.ContinentInfo ) {
    // needs validation
    this.selectedContinentChange.emit( continent );
  }

  toggleActivation() {
    this.isActive = !this.isActive;
  }

  ngOnInit() {
  }
}
