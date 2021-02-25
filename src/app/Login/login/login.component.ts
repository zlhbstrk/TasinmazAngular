import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Kullanici } from 'src/Models/Kullanici';
import { IpService } from 'src/Services/ip.service';
import { KullaniciService } from 'src/Services/kullanici.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(
    private kullaniciServis: KullaniciService,
    private router: Router,
    private ipServis: IpService
  ){}

  model!: Kullanici;
  form!: FormGroup;

  ngOnInit(): void {
    this.girisForm();
  }

  girisForm() {
    this.form = new FormGroup({
      Email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        Validators.maxLength(50),
      ]),
      Sifre: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  login() {
    this.kullaniciServis
      .Login(
        this.form.controls['Email'].value,
        this.form.controls['Sifre'].value
      )
      .subscribe((data:any) => {
        if (data.Result) {
          this.ipServis.getIpAddress().toPromise().then((data:any)=>{
            localStorage.setItem('ip', data.ip);
          });
          localStorage.setItem('currentUser', JSON.stringify(data.Result));
          Swal.fire({
            title: 'Başarılı',
            text: 'Kullanıcı giriş işlemi başarıyla tamamlandı.',
            icon: 'success',
            confirmButtonText: 'Tamam',
          });
          this.router.navigate(['/welcome']);
        }
        else{
          Swal.fire({
            title: 'Başarısız!',
            text: 'Kullanıcı adı veya parola hatalı!',
            icon: 'error',
            confirmButtonText: 'Tamam',
          });
        }
      });
  }
}