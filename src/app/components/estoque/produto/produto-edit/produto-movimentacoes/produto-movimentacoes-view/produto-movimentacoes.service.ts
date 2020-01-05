import { APP_API } from './../../../../../../app.api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProdutoMovimentacoesService {

 constructor(private http: HttpClient) { }

/**
 * Busca Movimentos pelo Id do produto
 * @param id 
 */
  carregarMovimentos(id: number){
    return this.http.get(`${APP_API}/movimento?produto.id=${id}`)
    
  }
}