import { Component, OnInit } from '@angular/core';
import { IpService } from 'src/Services/ip.service';
import { KullaniciService } from 'src/Services/kullanici.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLogged:boolean = false;
  constructor(private service: KullaniciService, private ipServis: IpService){
    this.isLogged = this.service.isLoggedIn();
  }

  ngOnInit(): void {
    this.ipServis.getIpAddress().subscribe((data:any)=>{
      localStorage.setItem('ip', data.ip);
    });
  }

  title = 'TasinmazAngular';
}
