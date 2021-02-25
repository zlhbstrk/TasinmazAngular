import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Helper } from 'src/Helpers/helper';
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
   return this.http.post<Il>(this.baseURL + 'Add', il, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  GetirIl(skipDeger:number, takeDeger:number) :Observable<Il[]>
  {
    return this.http.get<Il[]>(this.baseURL + "GetAll/" + skipDeger + "/" + takeDeger, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  FullGetirIl() :Observable<Il[]>
  {
    return this.http.get<Il[]>(this.baseURL + "FullGetAll", Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Sil(id:number) 
  {
    return this.http.delete(this.baseURL + "Delete/" + id, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Duzenle(il:Il) : Observable<Il>
  {
    return this.http.put<Il>(this.baseURL + "Update", il, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Getir(id:number) : Observable<Il>
  {
    return this.http.get<Il>(this.baseURL + "GetById/" + id, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Count() : Observable<number>
  {
    return this.http.get<number>(this.baseURL + "GetCount").pipe(catchError(this.handleError));
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