import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { Kullanici } from 'src/Models/Kullanici';
import { KullaniciService } from 'src/Services/kullanici.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  // repos:any;
  // CACHE_KEY = 'httpRepoCache';

  constructor(
    private kullaniciServis: KullaniciService,
    private router: Router,
    // private http: HttpClient
  ) {
    // const path = 'https://localhost:5001/api/Kullanici/';
    // this.repos = http.get<any>(path).pipe(map(data => data.items));
    // this.repos.subscribe((next:any) => {
    //   localStorage[this.CACHE_KEY] = JSON.stringify(next);
    // });
    // this.repos = this.repos.pipe(
    //   startWith(JSON.parse(localStorage[this.CACHE_KEY] || '[]'))
    // )
  }

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
      .subscribe((data) => {
        if (data) {
          localStorage.setItem('currentUser', JSON.stringify(data));
          Swal.fire({
            title: 'Başarılı',
            text: 'Kullanıcı giriş işlemi başarıyla tamamlandı.',
            icon: 'success',
            confirmButtonText: 'Tamam',
          });
          this.router.navigate(['/tasinmazlistele']);
        }
      });
  }
}