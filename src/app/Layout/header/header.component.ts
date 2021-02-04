import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { KullaniciEkleComponent } from 'src/app/Kullanici/kullanici-ekle/kullanici-ekle.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
  }

}
