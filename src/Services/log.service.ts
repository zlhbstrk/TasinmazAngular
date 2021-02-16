import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Log } from 'src/Models/Log';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http:HttpClient) { }

  readonly baseURL = 'https://localhost:5001/api/Log/'

  GetirLog(skipDeger:number, takeDeger:number) :Observable<Log[]>
  {
    return this.http.get<Log[]>(this.baseURL + "GetAll/" + skipDeger + "/" + takeDeger).pipe(catchError(this.handleError));
  }

  Count() : Observable<number>
  {
    return this.http.get<number>(this.baseURL + "GetCount").pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse){
    Swal.fire({
      title: "Hatalı",
      text: "Log servisinde hata oluştu!",
      icon: 'error',
      confirmButtonText:'Tamam'
    })
    return throwError('Log servisinde hata oluştu!');
  }
}