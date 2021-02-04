import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KullaniciEkleComponent } from 'src/app/Kullanici/kullanici-ekle/kullanici-ekle.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  // routes: Routes = [
  //   {
  //     path: 'kullaniciekle',
  //     pathMatch: 'KullaniciEkleComponent'
  //   }
  // ];

  ngOnInit(): void {
  }

}
