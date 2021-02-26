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

  static getHeaderUnAuth(email: string) {
    let ip = localStorage.getItem('ip')!.toString();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'current-user-email': email,
        'ip-address': ip,
      }),
    };
    return httpOptions;
  }

  static tarihFormatla(tarih: Date): string {
    if (tarih == null || tarih == undefined) {
      return '';
    }
    let day: string = tarih.getDate().toString();
    let month = (tarih.getMonth() + 1).toString();
    let year = tarih.getFullYear().toString();
    let hour = tarih.getHours().toString();
    let minute = tarih.getMinutes().toString();

    day = day.length == 1 ? '0' + day : day;
    month = month.length == 1 ? '0' + month : month;
    year = year.length == 1 ? '0' + year : year;
    hour = hour.length == 1 ? '0' + hour : hour;
    minute = minute.length == 1 ? '0' + minute : minute;

    return day + '.' + month + '.' + year + ' / ' + hour + '.' + minute;
  }
}
