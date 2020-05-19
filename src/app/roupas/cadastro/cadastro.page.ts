import { Component, OnInit } from '@angular/core';
import { MarcaService } from 'src/app/services/marca.service';
import { Marca } from 'src/app/models/marca.interface';
import { TamanhoService } from 'src/app/services/tamanho.service';
import { Tamanho } from 'src/app/models/tamanho.interface';
import { GeneroService } from 'src/app/services/genero.service';
import { Genero } from 'src/app/models/genero.interface';
import { CorService } from 'src/app/services/cor.service';
import { Cor } from 'src/app/models/cor.interface';
import { NavController } from '@ionic/angular';
import { BusyLoaderService } from 'src/app/services/busy-loader.service';
import { Roupa } from 'src/app/models/roupa.interface';
import { RoupaService } from 'src/app/services/roupa.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  roupa: Roupa;
  marcas: Marca[];
  tamanhos: Tamanho[];
  generos: Genero[];
  cores: Cor[];  

  constructor(
    private marcaService: MarcaService,
    private tamanhoService: TamanhoService,
    private generoService: GeneroService,
    private corService: CorService,
    private roupaService: RoupaService,
    private busyLoader: BusyLoaderService,
    private navController: NavController,
    private activatedRoute: ActivatedRoute
  ) { 
    this.roupa = {
      nome: '',
      marcas: [],
      tamanhos: [],
      generos: [],
      cores: [],
      imagem: '',
      preco: 0.00,
      estoque: 0,
      reservado: 0
    };
  }

  ngOnInit() {
    this.listarMarcas();
    this.listarTamanhos();
    this.listarGeneros();
    this.listarCores();
  }

  async listarMarcas() {
    const busyLoader = await this.busyLoader.create('Carregando marcas...');
    
    this.marcaService.getMarcas().subscribe((marcas) => {
      this.marcas = marcas;
      this.carregarRoupa();
      busyLoader.dismiss();
    });
  }
  
  async listarGeneros() {
    const busyLoader = await this.busyLoader.create('Carregando gêneros...');
    
    this.generoService.getGeneros().subscribe((generos) => {
      this.generos = generos;
      this.carregarRoupa();
      busyLoader.dismiss();
    });
  }
  
  async listarTamanhos() {
    const busyLoader = await this.busyLoader.create('Carregando tamanhos...');
    
    this.tamanhoService.getTamanhos().subscribe((tamanhos) => {
      this.tamanhos = tamanhos;
      this.carregarRoupa();
      busyLoader.dismiss();
    });
  }

  async listarCores() {
    const busyLoader = await this.busyLoader.create('Carregando Cores...');
    
    this.corService.getCores().subscribe((cores) => {
      this.cores = cores;
      this.carregarRoupa();
      busyLoader.dismiss();
    });
  }

  carregarRoupa() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.roupaService.getRoupa(id).subscribe(roupa => this.roupa = roupa);
    }
  }

  compareWithMarca(marca1: Marca, marca2: Marca) {
    return marca1 && marca2 ? marca1.id === marca2.id : marca1 === marca2;
  };

  compareWithTamanho(tamanho1: Tamanho, tamanho2: Tamanho) {
    return tamanho1 && tamanho2 ? tamanho1.id === tamanho2.id : tamanho1 === tamanho2;
  };

  compareWithGenero(genero1: Genero, genero2: Genero) {
    return genero1 && genero2 ? genero1.id === genero2.id : genero1 === genero2;
  };

  compareWithCores(cor1: Cor, cor2: Cor) {
    return cor1 && cor2 ? cor1.id === cor2.id : cor1 === cor2;
  };

  async salvar(roupa: Roupa) {
    const loading = await this.busyLoader.create('Salvando roupa...');

    this.roupaService
      .salvar(roupa)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/roupas']);
      });
  }
}