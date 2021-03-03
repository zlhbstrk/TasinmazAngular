import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Helper } from 'src/Helpers/helper';
import { Kullanici } from 'src/Models/Kullanici';
import Swal from 'sweetalert2';

@Injectable()
export class KullaniciService {
  constructor(private http: HttpClient, private router: Router) {}

  loggedIn = false;
  readonly baseURL = 'https://localhost:5001/api/Kullanici/';

  Ekle(kullanici: Kullanici): Observable<Kullanici> {
    return this.http
      .post<Kullanici>(this.baseURL + 'Add', kullanici, Helper.getHeader())
      .pipe(catchError(this.handleError));
  }
  
  GetirKullanici(
    skipDeger: number,
    takeDeger: number
  ): Observable<Kullanici[]> {
    return this.http
      .get<Kullanici[]>(this.baseURL + 'GetAll/' + skipDeger + '/' + takeDeger, Helper.getHeader())
      .pipe(catchError(this.handleError));
  }

  Sil(id: number) {
    return this.http
      .delete(this.baseURL + 'Delete/' + id, Helper.getHeader())
      .pipe(catchError(this.handleError));
  }

  SifreDegistir(kullanici: any):Observable<any> {
    return this.http
      .put<any>(this.baseURL + 'PasswordChange/' + kullanici.Id, kullanici, Helper.getHeader())
      .pipe(catchError(this.handleError));
  }

  Duzenle(kullanici: Kullanici): Observable<Kullanici> {
    return this.http
      .put<Kullanici>(this.baseURL + 'Update', kullanici, Helper.getHeader())
      .pipe(catchError(this.handleError));
  }

  Getir(id: number): Observable<Kullanici> {
    return this.http
      .get<Kullanici>(this.baseURL + 'GetById/' + id, Helper.getHeader())
      .pipe(catchError(this.handleError));
  }

  Count(): Observable<number> {
    return this.http
      .get<number>(this.baseURL + 'GetCount')
      .pipe(catchError(this.handleError));
  }

  Login(email: string, sifre: string): Observable<Kullanici> {
    return this.http
      .get<Kullanici>(this.baseURL + 'Login/' + email + '/' + sifre, Helper.getHeaderUnAuth(email))
      .pipe(catchError(this.handleError));
  }

  isAdmin() {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser')!
    ) as Kullanici;
    if (currentUser.Yetki == 1) {
      return true;
    } else {
      return false;
    }
  }

 kulAdi() {
   const currentUser = JSON.parse(localStorage.getItem('currentUser')!) as Kullanici;
   return currentUser.Ad;
 }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
  
    this.loggedIn = false;
    return this.http.get(this.baseURL + 'Logout', Helper.getHeader()).pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    Swal.fire({
      title: 'Hatalı',
      text: 'Kullanıcı servisinde hata oluştu!',
      icon: 'error',
      confirmButtonText: 'Tamam',
    });
    return throwError('Kullanıcı servisinde hata oluştu!');
  }
}