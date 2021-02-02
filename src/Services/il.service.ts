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

  readonly baseURL = 'http://localhost:5001/api/Il/Add'

  Ekle(il:Il) : Observable<Il>
  {
    //alert(JSON.stringify(Object));
   return this.http.post<Il>(this.baseURL,il).pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse){
    Swal.fire({
      title: "Hata",
      text: "İl servisinde bir hata oluştu.",
      icon: 'error',
      confirmButtonText:'Tamam'
    })

    return throwError('İl servisinde hata oluştu');
  }

}
