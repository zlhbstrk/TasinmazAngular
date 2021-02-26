import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  constructor(private http: HttpClient) {}

  getIpAddress() {
    return this.http.get('http://api.ipify.org/?format=json').pipe();
  }

  handleError(err: HttpErrorResponse) {
    Swal.fire({
      title: 'Hatalı',
      text: 'IP servisinde hata oluştu!',
      icon: 'error',
      confirmButtonText: 'Tamam',
    });
    return throwError('IP servisinde hata oluştu!');
  }
}
