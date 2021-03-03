import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Kullanici } from 'src/Models/Kullanici';
import { KullaniciService } from 'src/Services/kullanici.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sifre-duzenle',
  templateUrl: './sifre-duzenle.component.html',
  styleUrls: ['./sifre-duzenle.component.css'],
})
export class SifreDuzenleComponent implements OnInit {
  constructor(
    private kullaniciServis: KullaniciService,
    private activatedRoute: ActivatedRoute
  ) {}

  model!: Kullanici;
  id!: number;
  isPassEqual!: boolean;

  form = new FormGroup({
    MevcutSifre: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$!%*?&.+/-])[A-Za-z0-9@#$!%*?&.+/-]{8,20}$'
      ),
      Validators.minLength(8),
    ]),
    YeniSifre: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$!%*?&.+/-])[A-Za-z0-9@#$!%*?&.+/-]{8,20}$'
      ),
      Validators.minLength(8),
    ]),
    YeniSifreTekrar: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$!%*?&.+/-])[A-Za-z0-9@#$!%*?&.+/-]{8,20}$'
      ),
      Validators.minLength(8),
    ]),
  });

  onSubmit() {
    if (this.form.valid) {
     
      const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
        if (!this.isPassEqual) {
          this.model = this.form.value;
          this.model.Id = currentUser.Id;
          this.kullaniciServis.SifreDegistir(this.model).subscribe((data) => {
            alert(JSON.stringify(data))
            if (data) {
              Swal.fire({
                title: 'Başarılı',
                text: 'Şifre düzenle işlemi başarıyla tamamlandı.',
                icon: 'success',
                confirmButtonText: 'Tamam',
              });
              this.temizle();
            } else {
              Swal.fire({
                title: 'Başarısız!',
                text: 'İMevcut şifre hatalı!',
                icon: 'error',
                confirmButtonText: 'Tamam',
              });
            }
          });
        } else {
          Swal.fire({
            title: 'Parolalar aynı değil!',
            text: '',
            icon: 'warning',
            confirmButtonText: 'Tamam',
          });
        }
    }
  }

  temizle() {
    this.form.reset();
  }

  ngOnInit(): void {
    this.isPassEqual = true;
  }

  passwordChange() {
    const password1 = this.form.controls['YeniSifre'].value;
    const password2 = this.form.controls['YeniSifreTekrar'].value;

    if (password1 == password2) {
      this.isPassEqual = false;
    } else {
      this.isPassEqual = true;
    }
  }
}
