import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Kullanici } from 'src/Models/Kullanici';
import { KullaniciService } from 'src/Services/kullanici.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor( private kullaniciServis: KullaniciService, private router: Router) {}

  model: Kullanici = new Kullanici();
  ngOnInit(): void {
  }

  form = new FormGroup({
    Email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.maxLength(50)]),
    Sifre: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  });

  login() {
    this.kullaniciServis.Login(this.form.controls["Email"].value, this.form.controls['Sifre'].value).subscribe((data)=>{
      if(data){
        localStorage.setItem("isLogged", "true");
        Swal.fire({
          title: 'Başarılı',
          text: 'Kullanıcı giriş işlemi başarıyla tamamlandı.',
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