import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genero } from '../models/genero.interface';
import { BASE_API } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private URI = BASE_API + 'generos';

  constructor(
    private httpClient : HttpClient
  ) { }

  getGeneros() {
    return this.httpClient.get<Genero[]>(this.URI);
  }

  adicionar(genero: Genero) {
    return this.httpClient.post<Genero>(this.URI, genero);
  }

  atualizar(genero: Genero) {
    return this.httpClient.put<Genero>(`${this.URI}/${genero.id}`, genero);
  }

  excluir(genero: Genero) {
    return this.httpClient.delete(`${this.URI}/${genero.id}`);
  }

  getGenero(id: number) {
    return this.httpClient.get<Genero>(`${this.URI}/${id}`);
  }

  salvar(genero: Genero) {
    if (genero && genero.id) {
      return this.atualizar(genero);
    } else {
      return this.adicionar(genero);
    }
  }
}
