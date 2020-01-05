import { GenericId } from './generic-id';

export interface Serializer {
   // fromJson(json: any): GenericId;
   // toJson(resource: GenericId): any;
    resumo(json: any): GenericId;
  }