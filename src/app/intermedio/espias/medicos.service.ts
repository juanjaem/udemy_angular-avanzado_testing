import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'RxJs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class MedicosService {

  constructor( public http: HttpClient ) { }


  getMedicos(): Observable<any> {
    return this.http.get('...').pipe(
      map( (resp: any) => resp.medicos )
    );
  }

  agregarMedico( medico: any ): Observable<any> {
    return this.http.post('...', medico).pipe(
      map( (resp: any) => resp.medico )
    );
  }

  borrarMedico( id: string ): Observable<any> {
    return this.http.delete('...').pipe(
      map( (resp: any) => resp.medico )
    );
  }

}
