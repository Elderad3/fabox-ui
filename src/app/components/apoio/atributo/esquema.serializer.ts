import { Esquema } from './esquema.model';
export class EsquemaSerializer {

    resumo(json: any): Esquema {
        const esquema = new Esquema();
        esquema.id = json.id;
        esquema.mascara = json.mascara;
        esquema.tabelas = json.tabelas;
        return esquema;
    }


}