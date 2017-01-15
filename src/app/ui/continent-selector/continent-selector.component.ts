import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConstantsService, Continent } from '../../services/constants/constants.service';

@Component({
  selector: 'app-continent-selector',
  templateUrl: './continent-selector.component.html'
})

export class ContinentSelectorComponent implements OnInit {
  isActive: boolean = true;
  continents: Continent[] = ConstantsService.ContinentInfoList;
  @Input()  selectedContinent: Continent;
  @Output() selectedContinentChange = new EventEmitter<Continent>();

  constructor() {
    this.continents = ConstantsService.ContinentInfoList;
    this.selectedContinent = this.continents[0];
  }

  selectContinent( continent: Continent ) {
    // needs validation
    this.selectedContinentChange.emit( continent );
  }

  toggleActivation() {
    this.isActive = !this.isActive;
  }

  ngOnInit() {
  }
}
