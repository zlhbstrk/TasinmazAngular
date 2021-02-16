import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { YetkiTipi } from 'src/Helpers/YetkiTipi';
import { Kullanici } from 'src/Models/Kullanici';
import { KullaniciService } from 'src/Services/kullanici.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kullanici-duzenle',
  templateUrl: './kullanici-duzenle.component.html',
  styleUrls: ['./kullanici-duzenle.component.css']
})
export class KullaniciDuzenleComponent implements OnInit {

  constructor(private kullaniciServis: KullaniciService, private activatedRoute: ActivatedRoute, private router: Router) { }

  yetkiTipi:any[] = [
    {yetkiAd: "Sistem Yöneticisi", yetkiKod:YetkiTipi.sistemYoneticisi},
    {yetkiAd: "Kullanıcı", yetkiKod:YetkiTipi.kullanici}
  ];
  model!:Kullanici;
  id!:number; 
  form = new FormGroup({
    Ad: new FormControl(null, [Validators.maxLength(30)]),
    Soyad: new FormControl(null, [Validators.maxLength(30)]),
    Email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.maxLength(50)]),
    Sifre: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    Yetki: new FormControl(null, [Validators.required])
  });

  onSubmit() {
    if (this.form.valid) {
      this.model = this.form.value;
      this.model.Id = parseInt(this.id.toString())

      this.kullaniciServis.Duzenle(this.model).subscribe((data) => {
        if (data) {
          Swal.fire({
            title: 'Başarılı',
            text: 'Kullanıcı düzenle işlemi başarıyla tamamlandı.',
            icon: 'success',
            confirmButtonText: 'Tamam',
          }).then(()=>{
            this.form.reset();
          });
          this.router.navigate(['/kullanicilistele']);
        }
      });
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((e)=>{
      this.id = e.id;
    });
    this.kullaniciServis.Getir(this.id).subscribe((data)=>{
      this.form.controls['Ad'].setValue(data.Ad)
      this.form.controls['Soyad'].setValue(data.Soyad)
      this.form.controls['Email'].setValue(data.Email)
      this.form.controls['Sifre'].setValue(data.Sifre)
      this.form.controls['Yetki'].setValue(data.Yetki)
    });
  }
}