import { HttpHeaders } from '@angular/common/http';
import { isDefined } from '@angular/compiler/src/util';
import { Kullanici } from 'src/Models/Kullanici';

export class Helper {
  static getHeader() {
    let ip = localStorage.getItem('ip')!.toString();

    const kullanici = JSON.parse(
      localStorage.getItem('currentUser')!
    ) as Kullanici;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'current-user-id': kullanici.Id.toString(),
        'current-user-name': kullanici.Ad,
        'current-user-type': kullanici.Yetki.toString(),
        'ip-address': ip,
      }),
    };
    return httpOptions;
  }
}
