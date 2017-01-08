import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

// サーバに保存するデータの形
class MyTextObject {
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
  serverText: MyTextObject;
  localText: MyTextObject;

  constructor( af: AngularFire ) {
      // AngularFireのInjection
      this.af = af;

      // 初期化
      this.localText = { name: 'anonymous', message: '...' };
      this.serverText = { name: '', message: '' };

      // AngularFireでFirebaseのデータを監視(Observe)
      this.serverTextObservable = this.af.database.object('/test');

      // 監視対象のデータが変化した時の処置を設定(snapshot=その瞬間のデータを引数に貰う)
      this.serverTextObservable.subscribe( snapshot => {
        this.serverText = snapshot;
        }
      );
    }

  ngOnInit() {
  }

  onSubmit() {
    // テキストボックスの値(localText)を使って、サーバ上のデータを更新する。
    this.serverTextObservable.set( this.localText );
  }
}
