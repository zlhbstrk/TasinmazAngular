import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Kullanici } from 'src/Models/Kullanici';
import { Log } from 'src/Models/Log';
import { KullaniciService } from 'src/Services/kullanici.service';
import { LogService } from 'src/Services/log.service';

@Component({
  selector: 'app-log-listele',
  templateUrl: './log-listele.component.html',
  styleUrls: ['./log-listele.component.css']
})
export class LogListeleComponent implements OnInit {

  constructor(private logServis: LogService, private kullaniciServis: KullaniciService) { }

  dtOptions = {};
  loglar: Log[] = [];
  countDizi:number[] = [];
  kayitSayi:number = 10;
  dtTrigger: Subject<Log> = new Subject<Log>();

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Bfrti',
      pagingType: 'full_numbers',
      buttons: [
        'excel'
      ]
    };

    this.logServis.GetirLog(0, this.kayitSayi).subscribe((data) => {
      this.loglar = data;
      this.dtTrigger.next();
    });

    this.logServis.Count().subscribe((count) => {
      this.countDiziDoldur(count);
    })
  }

  countDiziDoldur(count:number){
    const buttonCount = Math.ceil(count/this.kayitSayi);
    for(let i=0;i<buttonCount;i++){
      this.countDizi.push(i);
    }
  }

  sayfaGetir(skipDeger:number, takeDeger:number){
    this.logServis.GetirLog(skipDeger, takeDeger).subscribe((data) => {
      this.loglar = data
    });
  }
}
