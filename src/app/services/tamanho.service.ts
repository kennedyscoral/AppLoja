import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tamanho } from '../models/tamanho.interface';

@Injectable({
  providedIn: 'root'
})
export class TamanhoService {

  private URI = 'http://localhost:3000/tamanhos';

  constructor(
    private httpClient : HttpClient
  ) { }

  getTamanhos() {
    return this.httpClient.get<Tamanho[]>(this.URI);
  }

  adicionar(tamanho: Tamanho) {
    return this.httpClient.post<Tamanho>(this.URI, tamanho);
  }

  atualizar(tamanho: Tamanho) {
    return this.httpClient.put<Tamanho>(`${this.URI}/${tamanho.id}`, tamanho);
  }

  excluir(tamanho: Tamanho) {
    return this.httpClient.delete(`${this.URI}/${tamanho.id}`);
  }

  gettamanho(id: number) {
    return this.httpClient.get<Tamanho>(`${this.URI}/${id}`);
  }

  salvar(tamanho: Tamanho) {
    if (tamanho && tamanho.id) {
      return this.atualizar(tamanho);
    } else {
      return this.adicionar(tamanho);
    }
  }
}
