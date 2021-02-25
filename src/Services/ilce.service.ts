import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Helper } from 'src/Helpers/helper';
import { Ilce } from 'src/Models/Ilce';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class IlceService {

  constructor(private http:HttpClient) { }
  readonly baseURL = 'https://localhost:5001/api/Ilce/'

  Ekle(ilce:Ilce) : Observable<Ilce>
  {
   return this.http.post<Ilce>(this.baseURL + 'Add', ilce, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  GetirIlce(skipDeger:number, takeDeger:number) : Observable<Ilce[]>
  {
    return this.http.get<Ilce[]>(this.baseURL + "GetAll/" + skipDeger + "/" + takeDeger, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  FullGetirIlce() : Observable<Ilce[]>
  {
    return this.http.get<Ilce[]>(this.baseURL + "FullGetAll", Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Sil(id:number) 
  {
    return this.http.delete(this.baseURL + "Delete/" + id, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Duzenle(ilce:Ilce) : Observable<Ilce>
  {
    return this.http.put<Ilce>(this.baseURL + "Update", ilce, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Getir(id:number) : Observable<Ilce>
  {
    return this.http.get<Ilce>(this.baseURL + "GetById/" + id, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Count() : Observable<number>
  {
    return this.http.get<number>(this.baseURL + "GetCount").pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse)
  {
    Swal.fire({
      title: "Hatalı",
      text: "İlçe servisinde hata oluştu!",
      icon: 'error',
      confirmButtonText:'Tamam'
    })
    return throwError('İlçe servisinde hata oluştu!');
  }
}
