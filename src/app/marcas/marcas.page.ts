import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MarcaService } from '../services/marca.service';
import { Marca } from '../models/marca.interface';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.page.html',
  styleUrls: ['./marcas.page.scss'],
})
export class MarcasPage implements OnInit {

  marcas: Marca[];

  constructor(
    private marcaService: MarcaService,
    private loadingController: LoadingController 
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    const loading = await this.loadingController.create({
      message: 'Carregando marcas...'
    });
    loading.present();
    this.marcaService.getMarcas().subscribe((data) => {
      this.marcas = data;
      loading.dismiss();
    });
  }
}
