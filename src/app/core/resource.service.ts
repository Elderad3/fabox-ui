import { APP_API } from './../app.api';
import { Serializer } from './serializer';
import { GenericId } from './generic-id';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export class ResourceService<T extends GenericId>{
    constructor(
        private http: HttpClient,
        private endpoint: string,
        private serializer: Serializer,
        private parentPropert?: string,
       
    ) { }

    /**
      * Cria ou salva a entidade
      * @param item
      */
    salvar(item: T): Observable<T> {
        if (item.id != null && item.id != undefined) {
            return this.http.put<T>(`${APP_API}/${this.endpoint}/${item.id}`, item)
                // .pipe(
                //     map(data => this.serializer.fromJson(data) as T)
                // )
        } else {
            return this.http.post<T>(`${APP_API}/${this.endpoint}`, item )
                // .pipe(
                //     map(data => this.serializer.fromJson(data) as T)
                // )
        }
    }
    /**
     * Lista todos os registros da entidade 
     */
    listar(): Observable<T[]> {
        return this.http.get<T[]>(`${APP_API}/${this.endpoint}`)
            .pipe(
                map((data: any) => this.resumo(data))
            )
    }

    /**
     * busca a entidade pelo identificador
     * @param id 
     */
    buscarPorId(id: number) {
        return this.http.get(`${APP_API}/${this.endpoint}/${id}`)
            // .pipe(
            //     map((data: any) => this.serializer.fromJson(data) as T)
            // )
    }

    /**
     * Exclui a entidade de acordo com o identificador
     * @param id 
     */
    excluir(id: number) {
        return this.http.delete(`${APP_API}/${this.endpoint}/${id}`)

    }

    /**
     * busca entidades child por parent id
     * @param id 
     */
    buscarPropiedadesFilhasPorIdPai(id: number){
        return this.http.get(`${APP_API}/${this.endpoint}?${this.parentPropert}=${id}`)
      }
    /**
   * Lista os registros da entidade com parâmetro de pesquisa
   * @param search
   */
  listarEntidadesPorParametro(search: string) {
    return this.http.get(`${APP_API}/${this.endpoint}?q=${search}`)
  }

      /**
     * converte list data
     * @param data 
     */
    private resumo(data: any): T[] {
        return data.map(item => this.serializer.resumo(item))
    }

    /**
     * converte data
     * @param data 
     */
    // private convertData(data: any): T[] {
    //     return data.map(item => this.serializer.fromJson(item))
    // }

      /**
     * converte list data
     * @param data 
     */
    // private convertListData(data: any): T[] {
    //     return data.map(item => this.serializer.listJson(item))
    // }
}