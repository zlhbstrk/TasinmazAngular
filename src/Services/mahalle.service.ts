import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
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

  GetirMahalle(skipDeger:number, takeDeger:number) : Observable<Mahalle[]>
  {
    return this.http.get<Mahalle[]>(this.baseURL + "GetAll/" + skipDeger + "/" + takeDeger).pipe(catchError(this.handleError));
  }
  
  FullGetirMahalle() : Observable<Mahalle[]>
  {
    return this.http.get<Mahalle[]>(this.baseURL + "FullGetAll").pipe(catchError(this.handleError));
  }
  Sil(id:number) 
  {
    return this.http.delete(this.baseURL + "Delete/"+ id).pipe(catchError(this.handleError));
  }

  Duzenle(mahalle:Mahalle) : Observable<Mahalle>
  {
    return this.http.put<Mahalle>(this.baseURL + "Update",mahalle).pipe(catchError(this.handleError));
  }

  Getir(id:number) : Observable<Mahalle>
  {
    return this.http.get<Mahalle>(this.baseURL + "GetById/" + id).pipe(catchError(this.handleError));
  }

  Count() : Observable<number>
  {
    return this.http.get<number>(this.baseURL + "GetCount").pipe(catchError(this.handleError));
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
