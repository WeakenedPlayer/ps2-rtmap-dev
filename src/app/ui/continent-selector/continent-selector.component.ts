import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConstantsService, ContinentInfo } from '../../services/constants/constants.service';

@Component({
  selector: 'app-continent-selector',
  templateUrl: './continent-selector.component.html'
})
  
export class ContinentSelectorComponent implements OnInit {
  isActive: boolean = true;
  continents: ContinentInfo[] = ConstantsService.ContinentInfoList;
  @Input()  selectedContinent: ContinentInfo;
  @Output() selectedContinentChange = new EventEmitter<ContinentInfo>();

  constructor() {
    this.continents = ConstantsService.ContinentInfoList;
    this.selectedContinent = this.continents[0];
  }

  selectContinent( continent: ContinentInfo ) {
    // needs validation
    this.selectedContinentChange.emit( continent );
  }

  toggleActivation() {
    this.isActive = !this.isActive;
  }

  ngOnInit() {
  }
}
