import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Helper } from 'src/Helpers/helper';
import { Tasinmaz } from 'src/Models/Tasinmaz';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TasinmazService {

  constructor(private http:HttpClient) { }

  readonly baseURL = 'https://localhost:5001/api/Tasinmaz/'

  Ekle(tasinmaz:Tasinmaz) : Observable<Tasinmaz>
  {
   return this.http.post<Tasinmaz>(this.baseURL + 'Add', tasinmaz, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  GetirTasinmaz(skipDeger:number, takeDeger:number) :Observable<Tasinmaz[]>
  {
    return this.http.get<Tasinmaz[]>(this.baseURL + "GetAll/" + skipDeger + "/" + takeDeger, Helper.getHeader()).pipe(catchError(this.handleError));
  }
  
  Filtre(filtre:string) :Observable<Tasinmaz[]>
  {
    return this.http.get<Tasinmaz[]>(this.baseURL + "GetAllFilter/" + filtre, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Sil(id:number)
  {
    return this.http.delete(this.baseURL + "Delete/"+ id, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Duzenle(tasinmaz:Tasinmaz) : Observable<Tasinmaz>
  {
    return this.http.put<Tasinmaz>(this.baseURL + "Update", tasinmaz, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Getir(id:number) : Observable<Tasinmaz>
  {
    return this.http.get<Tasinmaz>(this.baseURL + "GetById/" + id, Helper.getHeader()).pipe(catchError(this.handleError));
  }

  Count() : Observable<number>
  {
    return this.http.get<number>(this.baseURL + "GetCount").pipe(catchError(this.handleError));
  }

  FilterCount(filter: string): Observable<number> {
    return this.http
      .get<number>(this.baseURL + 'FilterGetCount/' + filter)
      .pipe(catchError(this.handleError));
  }

  GetSearchAndFilter(skipDeger: number, takeDeger: number, filtre: string): Observable<Tasinmaz[]> {
    return this.http
      .get<Tasinmaz[]>(this.baseURL + 'GetSearchAndFilter/'  + skipDeger + '/' + takeDeger + '/' + filtre)
      .pipe(catchError(this.handleError));
  }
  
  handleError(err: HttpErrorResponse){
    Swal.fire({
      title: "Hatalı",
      text: "Taşınmaz servisinde hata oluştu!",
      icon: 'error',
      confirmButtonText:'Tamam'
    })
    return throwError('Taşınmaz servisinde hata oluştu!');
  }
}
