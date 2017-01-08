import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

// �T�[�o�ɕۑ�����f�[�^�̌`
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
      // AngularFire��Injection
      this.af = af;

      // ������
      this.localText = { name: 'anonymous', message: '...' };
      this.serverText = { name: '', message: '' };

      // AngularFire��Firebase�̃f�[�^���Ď�(Observe)
      this.serverTextObservable = this.af.database.object('/test');

      // �Ď��Ώۂ̃f�[�^���ω��������̏��u��ݒ�(snapshot=���̏u�Ԃ̃f�[�^�������ɖႤ)
      this.serverTextObservable.subscribe( snapshot => {
        this.serverText = snapshot;
        }
      );
    }

  ngOnInit() {
  }

  onSubmit() {
    // �e�L�X�g�{�b�N�X�̒l(localText)���g���āA�T�[�o��̃f�[�^���X�V����B
    this.serverTextObservable.set( this.localText );
  }
}
