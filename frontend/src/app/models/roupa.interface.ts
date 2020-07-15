import { Marca } from './marca.interface';
import { Tamanho } from './tamanho.interface';
import { Genero } from './genero.interface';
import { Cor } from './cor.interface';

export interface Roupa {
    id?: string;
    nome: string;    
    imagem: string;
    marca: Marca[];
    tamanhos: Tamanho[];
    genero: Genero[];
    cores: Cor[];
    preco: number;
    estoque: number;
    reservado: number;
    estoque_minimo: number;
    qt_venda_desconto: number;
    qt_venda: number;
}