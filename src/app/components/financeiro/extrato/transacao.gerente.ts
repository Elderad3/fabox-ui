import { HttpClient } from '@angular/common/http';
import { APP_API } from './../../../app.api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TransacaoGerente {

    constructor(private http: HttpClient) { }

    /**
      * Cria ou salva a entidade
      * @param item
      */
     salvar(item: any): Observable<any> {
            return this.http.post<any>(`${APP_API}/transacao`, item )
                // .pipe(
                //     map(data => this.serializer.fromJson(data) as T)
                // )
        }






    /**
     * Transforma valor NaN(Not a Number) em Zero
     * @param valor 
     */
    transformaNaNEmZero(valor) {
        return isNaN(valor) ? 0 : valor;
    }
}