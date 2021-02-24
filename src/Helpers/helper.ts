import { HttpHeaders } from '@angular/common/http';
import { isDefined } from '@angular/compiler/src/util';
import { Kullanici } from 'src/Models/Kullanici';

export class Helper {
  getHeader() {
    let ip = 'ip alınamadı!';
    if (isDefined(localStorage.getItem('ip'))) {
      ip = localStorage.getItem('ip')!.toString();
    }
    const k = JSON.parse(localStorage.getItem('currentUser')!) as Kullanici;
    const kAd = k.Ad;
    const kId = k.Id.toString();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Current-User-Name': kAd,
        'Current-User-Id': kId,
        'IP-Address': ip,
      }),
    };
    return httpOptions;
  }
}