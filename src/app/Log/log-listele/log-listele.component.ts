import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Helper } from 'src/Helpers/helper';
import { Durum } from 'src/Models/Durum';
import { IslemTip } from 'src/Models/IslemTip';
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
  durumlar: Durum[] = [];
  islemTipleri: IslemTip[] = [];
  kayitSayi: number = 10;
  sayfa: number = 1;
  pageCount: number = 1;

  log: Log[] = [];

  form = new FormGroup({
    searchInput: new FormControl(''),
  });

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Brt',
      pagingType: 'full_numbers',
      buttons: ['excel'],
    };

    this.logServis.GetSearchAndFilter(0, this.kayitSayi,"-1").subscribe((data) => {
      data.forEach((e) => {
        e.Tarih = Helper.tarihFormatla(new Date(e.Tarih!));
      });
      this.loglar = data;
      this.dtTrigger.next();
    });

    this.logServis.Count().subscribe((count) => {
      this.pageCount = count;
    });
  }
 
  sayfaGetir(skipDeger: number, takeDeger: number | any, event?: number) {
    this.sayfa = event ? event : 1;
    this.kayitSayi = takeDeger;

    let input:string = this.form.controls['searchInput'].value;
    input = input.length == 0 ? "-1" : input;
    this.logServis.GetSearchAndFilter(skipDeger, takeDeger, input).subscribe((data) => {
      data.forEach((e) => {
        e.Tarih = Helper.tarihFormatla(new Date(e.Tarih!));
      });
      this.loglar = data;
    });
  }

  Search() {
    const input = this.form.controls['searchInput'].value;
    if (input) {

      this.logServis.GetSearchAndFilter(0, this.kayitSayi, input).subscribe((data) => {
        this.loglar = data;

        this.logServis.FilterCount(input).subscribe((data) => {
          this.pageCount = data;
        });
        this.logServis.Count().subscribe((count) => {
          this.pageCount = count;
        });
      });
    }
  }
}
