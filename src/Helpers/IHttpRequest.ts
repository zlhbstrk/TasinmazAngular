import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface IHttpRequests<T> {

  /** 
   * Servisin yolu belirtilecektir.
   **/
  path:string; 

  get(id?: number): Observable<T[]>;
  put(id: number, object: T): Observable<T>;
  delete(id:number):boolean;
  post(object:T):boolean;
  handleError(err: HttpErrorResponse):Observable<never>
}