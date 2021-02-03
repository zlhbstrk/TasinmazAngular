import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { YetkiTipi } from 'src/Helpers/YetkiTipi';
import { Kullanici } from 'src/Models/Kullanici';
import { KullaniciService } from 'src/Services/kullanici.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kullanici-ekle',
  templateUrl: './kullanici-ekle.component.html',
  styleUrls: ['./kullanici-ekle.component.css']
})
export class KullaniciEkleComponent implements OnInit {

  constructor(private kullaniciServis:KullaniciService) { }

  yetkiTipi:any[] = [
    {yetkiAd: "Sistem Yöneticisi", yetkiKod:YetkiTipi.sistemYoneticisi},
    {yetkiAd: "Kullanıcı", yetkiKod:YetkiTipi.kullanici}
  ];
  model!:Kullanici;

  form = new FormGroup({
    Ad: new FormControl(null),
    Soyad: new FormControl(null),
    Email: new FormControl(null, [Validators.required]),
    Sifre: new FormControl(null, [Validators.required]),
    YetkiTipi: new FormControl(null, [Validators.required])
  });

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.form.valid) {
      this.model = this.form.value;
      this.kullaniciServis.Ekle(this.model).subscribe((data) => {
        if(data) {
          Swal.fire({
            title: 'Başarılı',
            text: 'Kullanıcı başarıyla eklendi.',
            icon: 'success',
            confirmButtonText: 'Tamam',
          });
        }
      });
    }
  }
}
