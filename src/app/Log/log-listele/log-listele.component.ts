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
  kullanicilar: Kullanici[] = [];
  dtTrigger: Subject<Log> = new Subject<Log>();

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Bfrtip',
      pagingType: 'full_numbers',
      pageLength: 10,
      buttons: [
        'excel'
      ]
    };

    this.logServis.GetirLog().subscribe((data) => {
      this.loglar = data;
      this.dtTrigger.next();
    });
    this.kullaniciServis.GetirKullanici().subscribe((data) => {
      this.kullanicilar = data;
    });
  }
}
