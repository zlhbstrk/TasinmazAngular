import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Kullanici } from 'src/Models/Kullanici';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class KullaniciService {

  constructor(private http:HttpClient) { }

  readonly baseURL = 'https://localhost:5001/api/Kullanici/'

  Ekle(kullanici:Kullanici) : Observable<Kullanici>
  {
   return this.http.post<Kullanici>(this.baseURL + 'Add',kullanici).pipe(catchError(this.handleError));
  }

  GetirKullanici(skipDeger:number, takeDeger:number) :Observable<Kullanici[]>
  {
    return this.http.get<Kullanici[]>(this.baseURL + "GetAll/" + skipDeger + "/" + takeDeger).pipe(catchError(this.handleError));
  }

  Sil(id:number) 
  {
    return this.http.delete(this.baseURL + "Delete/" + id).pipe(catchError(this.handleError));
  }

  Duzenle(kullanici:Kullanici) : Observable<Kullanici>
  {
    return this.http.put<Kullanici>(this.baseURL + "Update", kullanici).pipe(catchError(this.handleError));
  }

  Getir(id:number) : Observable<Kullanici>
  {
    return this.http.get<Kullanici>(this.baseURL + "GetById/" + id).pipe(catchError(this.handleError));
  }

  Count() : Observable<number>
  {
    return this.http.get<number>(this.baseURL + "GetCount").pipe(catchError(this.handleError));
  }
  
  handleError(err: HttpErrorResponse){
    Swal.fire({
      title: "Hatalı",
      text: "Kullanici servisinde hata oluştu!",
      icon: 'error',
      confirmButtonText:'Tamam'
    })
    return throwError('Kullanici servisinde hata oluştu!');
  }
}