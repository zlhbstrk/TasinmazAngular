import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Il } from 'src/Models/Il';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class IlService {

  constructor(private http:HttpClient) { }

  readonly baseURL = 'https://localhost:5001/api/Il/'

  Ekle(il:Il) : Observable<Il>
  {
   return this.http.post<Il>(this.baseURL + 'Add',il).pipe(catchError(this.handleError));
  }

  GetirIl() :Observable<Il[]>
  {
    return this.http.get<Il[]>(this.baseURL + "GetAll").pipe(catchError(this.handleError));
  }

  Sil(id:number) 
  {
    return this.http.delete(this.baseURL + "Delete/"+ id).pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse){
    Swal.fire({
      title: "Hatalı",
      text: "İl servisinde hata oluştu!",
      icon: 'error',
      confirmButtonText:'Tamam'
    })
    return throwError('İl servisinde hata oluştu!');
  }
}
