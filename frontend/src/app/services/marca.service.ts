import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marca } from '../models/marca.interface';
import { BASE_API } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private URI = BASE_API + 'marcas';

  constructor(
    private httpClient : HttpClient
  ) { }

  getMarcas() {
    return this.httpClient.get<Marca[]>(this.URI);
  }

  adicionar(marca: Marca) {
    return this.httpClient.post<Marca>(this.URI, marca);
  }

  atualizar(marca: Marca) {
    return this.httpClient.put<Marca>(`${this.URI}/${marca.id}`, marca);
  }

  excluir(marca: Marca) {
    return this.httpClient.delete(`${this.URI}/${marca.id}`);
  }

  getMarca(id: number) {
    return this.httpClient.get<Marca>(`${this.URI}/${id}`);
  }

  salvar(marca: Marca) {
    if (marca && marca.id) {
      return this.atualizar(marca);
    } else {
      return this.adicionar(marca);
    }
  }
}
