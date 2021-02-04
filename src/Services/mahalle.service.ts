import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Mahalle } from 'src/Models/Mahalle';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MahalleService {

  constructor(private http:HttpClient) { }
  readonly baseURL = 'https://localhost:5001/api/Mahalle/'

  Ekle(mahalle:Mahalle) : Observable<Mahalle>
  {
    return this.http.post<Mahalle>(this.baseURL + 'Add',mahalle).pipe(catchError(this.handleError));
  }

  GetirMahalle() : Observable<Mahalle[]>
  {
    return this.http.get<Mahalle[]>(this.baseURL + "GetAll").pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse)
  {
    Swal.fire({
      title: "Hatalı",
      text: "Mahalle servisinde hata oluştu!",
      icon: 'error',
      confirmButtonText:'Tamam'
    })
    return throwError('Mahalle servisinde hata oluştu!');
  }
}
