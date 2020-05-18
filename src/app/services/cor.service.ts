import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cor } from '../models/cor.interface';

@Injectable({
  providedIn: 'root'
})
export class CorService {

  private URI = 'http://localhost:3000/cores';

  constructor(
    private httpClient : HttpClient
  ) { }

  getCores() {
    return this.httpClient.get<Cor[]>(this.URI);
  }

  adicionar(cor: Cor) {
    return this.httpClient.post<Cor>(this.URI, cor);
  }

  atualizar(cor: Cor) {
    return this.httpClient.put<Cor>(`${this.URI}/${cor.id}`, cor);
  }

  excluir(cor: Cor) {
    return this.httpClient.delete(`${this.URI}/${cor.id}`);
  }

  getCor(id: number) {
    return this.httpClient.get<Cor>(`${this.URI}/${id}`);
  }

  salvar(cor: Cor) {
    if (cor && cor.id) {
      return this.atualizar(cor);
    } else {
      return this.adicionar(cor);
    }
  }
}
