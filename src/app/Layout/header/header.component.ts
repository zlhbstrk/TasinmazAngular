import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { KullaniciEkleComponent } from 'src/app/Kullanici/kullanici-ekle/kullanici-ekle.component';
import { KullaniciService } from 'src/Services/kullanici.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private kullaniciServis:KullaniciService, private router: Router) { }
  isLogged= false;
  ngOnInit(): void {
    this.isLogged = this.kullaniciServis.isLoggedIn();
  }

  logOut(){
    this.kullaniciServis.logOut();
    
    this.router.navigate(['/login']);
  }
}
