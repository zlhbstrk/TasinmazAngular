import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    this.kullaniciServis.logOut().subscribe((data)=>{
      localStorage.removeItem('currentUser');
      localStorage.removeItem('ip');
    });
    
    
    this.router.navigate(['/login']);
  }
}
