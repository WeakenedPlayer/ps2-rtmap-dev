import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

class MyTextObject {
  $key?: string;
  name: string;
  message: string;
}

@Component({
  selector: 'app-my-text',
  templateUrl: './my-text.component.html',
  styleUrls: ['./my-text.component.css']
})

export class MyTextComponent implements OnInit {
  af: AngularFire;
  serverTextObservable: FirebaseObjectObservable<MyTextObject>;
  localText: MyTextObject;

  constructor( af: AngularFire ) {
    this.af = af;
    this.localText = { name: '', message: '' };
    this.serverTextObservable = this.af.database.object('/test');

    this.serverTextObservable.subscribe( snapshot => {
      this.localText = snapshot;
    });
  }
  ngOnInit() {
  }
}
