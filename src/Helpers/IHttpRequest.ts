import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface IHttpRequests<T> {
  path: string;

  Getir(id?: number): Observable<T>;
  GetirSayfa(skipDeger: number, takeDeger: number): Observable<T[]>;
  Sil(id: number): boolean;
  Ekle(object: T): Observable<T>;
  Duzenle(object: T): Observable<T>;
  Count(): Observable<number>;
  handleError(err: HttpErrorResponse): Observable<never>;
}
