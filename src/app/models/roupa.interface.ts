import { Marca } from './marca.interface';
import { Tamanho } from './tamanho.interface';
import { Genero } from './genero.interface';
import { Cor } from './cor.interface';

export interface Roupa {
    id?: number;
    nome: string;    
    imagem: string;
    marcas: Marca[];
    tamanhos: Tamanho[];
    generos: Genero[];
    cores: Cor[];
    preco: number;
    estoque: number;
    reservado: number;
}