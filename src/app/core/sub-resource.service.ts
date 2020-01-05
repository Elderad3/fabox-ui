import { APP_API } from './../app.api';
import { GenericId } from './generic-id';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export class SubResourceService<T extends GenericId>{
    constructor(
        private http: HttpClient,
        private endpointPai: string,  
        private endpoint: string,
      
    ) { }

    /**
      * Salva ou atualiza entidade
      * @param item
      */
    salvar(item: T) :Observable<T> {
        if (item.id != null && item.id != undefined) { 
            return this.http.put<T>(`${APP_API}/${this.endpointPai}/${item.idPai}/${this.endpoint}/${item.id}`, item)
        } else {
            item.id == null
            return this.http.post<T>(`${APP_API}/${this.endpointPai}/${item.idPai}/${this.endpoint}`, item)
        }
    }

    /**
     * Lista todos os registros da entidade 
     */
    listar(idPai: number): Observable<T[]> {
        return this.http.get<T[]>(`${APP_API}/${this.endpointPai}/${idPai}/${this.endpoint}`)
    }

    /**
     * busca a entidade pelo identificador
     * @param id 
     */
    buscarPorId(idPai: number, id: number) {
        return this.http.get(`${APP_API}/${this.endpointPai}/${idPai}/${this.endpoint}/${id}`)
    }

    /**
     * Exclui a entidade de acordo com o identificador
     * @param id 
     */
    excluir(idPai: number, id: number) {
        return this.http.delete(`${APP_API}/${this.endpointPai}/${idPai}/${this.endpoint}/${id}`)
    }
}