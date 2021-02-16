import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Log } from 'src/Models/Log';
import { LogService } from 'src/Services/log.service';

@Component({
  selector: 'app-log-listele',
  templateUrl: './log-listele.component.html',
  styleUrls: ['./log-listele.component.css'],
})
export class LogListeleComponent implements OnInit {
  constructor(private logServis: LogService) {}

  dtOptions = {};
  dtTrigger: Subject<Log> = new Subject<Log>();

  loglar: Log[] = [];
  kayitSayi: number = 10;
  sayfa: number = 1;
  pageCount: number = 1;

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Bfrt',
      pagingType: 'full_numbers',
      buttons: ['excel'],
    };

    this.logServis.GetirLog(0, this.kayitSayi).subscribe((data) => {
      data.forEach((e) => {
        e.Tarih = this.tarihFormatla(new Date(e.Tarih!));
      });
      // data.map(e => {
      //   const day = new Date(e.Tarih).getDate();
      //   const month = new Date(e.Tarih).getMonth() +1;
      //   const year = new Date(e.Tarih).getFullYear();
      //   const hour = new Date(e.Tarih).getHours();
      //   const minute = new Date(e.Tarih).getMinutes();
      //   const tarih = day + "." + month + "." + year + " / " + hour + "." + minute;
      //   e.Tarih = tarih;
      // })
      this.loglar = data;
      this.dtTrigger.next();
    });

    this.logServis.Count().subscribe((count) => {
      this.pageCount = count;
    });
  }

  tarihFormatla(tarih: Date): string {
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
  sayfaGetir(skipDeger: number, takeDeger: number | any, event?: number) {
    this.sayfa = event ? event : 1;
    this.kayitSayi = takeDeger;

    this.logServis.GetirLog(skipDeger, takeDeger).subscribe((data) => {
      data.forEach((e) => {
        e.Tarih = this.tarihFormatla(new Date(e.Tarih!));
      });
      this.loglar = data;
    });
  }
}