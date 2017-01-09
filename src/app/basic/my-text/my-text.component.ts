import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import * as Leaflet from 'leaflet';
class MyMessageObject {
  name: string;
  text: string;
}

@Component({
  selector: 'app-my-text',
  templateUrl: './my-text.component.html',
  styleUrls: ['./my-text.component.css']
})

export class MyTextComponent implements OnInit {
  af: AngularFire;
  serverMessageObserver: FirebaseListObservable<any>;
  serverMessages: Array<MyMessageObject>;
  map: Leaflet.Map;

  localText: MyMessageObject;

  constructor( af: AngularFire ) {
    this.af = af;
    this.localText = { name: 'anonymous', text: '' };

    this.serverMessageObserver = this.af.database.list('/messages');

    // 変更を監視(一部に変更があっても全部取得しなおされる)
    this.serverMessageObserver.subscribe( snapshots => {
      this.serverMessages = snapshots;
    });
  }

  addMessage() {
    // LocalMessageをサーバに追加する
    this.serverMessageObserver.push( this.localText );
    this.localText.text = '';
  }

  deleteMessage( key: string ) {
    this.serverMessageObserver.remove( key );
  }

  deleteAllMessages() {
    this.serverMessageObserver.remove();
  }

  ngOnInit() {
  }
}
