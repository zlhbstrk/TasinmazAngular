import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Kullanici } from 'src/Models/Kullanici';
import Swal from 'sweetalert2';

@Injectable()
export class KullaniciService {
  constructor(private http: HttpClient, private router: Router) {}

  loggedIn = false;
  readonly baseURL = 'https://localhost:5001/api/Kullanici/';

  Ekle(kullanici: Kullanici): Observable<Kullanici> {
    return this.http
      .post<Kullanici>(this.baseURL + 'Add', kullanici)
      .pipe(catchError(this.handleError));
  }

  GetirKullanici(
    skipDeger: number,
    takeDeger: number
  ): Observable<Kullanici[]> {
    return this.http
      .get<Kullanici[]>(this.baseURL + 'GetAll/' + skipDeger + '/' + takeDeger)
      .pipe(catchError(this.handleError));
  }

  Sil(id: number) {
    return this.http
      .delete(this.baseURL + 'Delete/' + id)
      .pipe(catchError(this.handleError));
  }

  Duzenle(kullanici: Kullanici): Observable<Kullanici> {
    return this.http
      .put<Kullanici>(this.baseURL + 'Update', kullanici)
      .pipe(catchError(this.handleError));
  }

  Getir(id: number): Observable<Kullanici> {
    return this.http
      .get<Kullanici>(this.baseURL + 'GetById/' + id)
      .pipe(catchError(this.handleError));
  }

  Count(): Observable<number> {
    return this.http
      .get<number>(this.baseURL + 'GetCount')
      .pipe(catchError(this.handleError));
  }

  Login(email: string, sifre: string): Observable<Kullanici> {
    return this.http
      .get<Kullanici>(this.baseURL + 'Login/' + email + '/' + sifre)
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

  // httpHeaders() {
  //   const headers = new HttpHeaders {
  //       headers: loc
  //   };
  // }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.loggedIn = false;
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