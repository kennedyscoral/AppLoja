import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Roupa } from '../models/roupa.interface';

@Injectable({
  providedIn: 'root'
})
export class RoupaService {

  private URI = 'http://localhost:3000/roupas';
  
  constructor(
    private httpClient:HttpClient
  ) { }
    
  getRoupas() {
    return this.httpClient.get<Roupa[]>(this.URI);
  }

  excluir(roupa: Roupa) {
    return this.httpClient.delete(`${this.URI}/${roupa.id}`);
  }

  private adicionar(roupa: Roupa) {
    return this.httpClient.post(this.URI, roupa);
  }

  private atualizar(roupa: Roupa) {
    return this.httpClient.put(`${this.URI}/${roupa.id}`, roupa);
  }

  salvar(roupa: Roupa) {
    if(roupa.id) {
      return this.atualizar(roupa);
    } else {
      return this.adicionar(roupa);
    }
  }

  getRoupa(id: number) {
    return this.httpClient.get<Roupa>(`${this.URI}/${id}`);
  }
}