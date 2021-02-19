import { Component, OnInit } from '@angular/core';
import { KullaniciService } from 'src/Services/kullanici.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLogged:boolean = false;
  constructor(private service: KullaniciService){
    this.isLogged = this.service.isLoggedIn();
  }

  ngOnInit(): void {
   
  }

  title = 'TasinmazAngular';
}
