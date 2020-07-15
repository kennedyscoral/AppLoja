import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { GeneroService } from '../services/genero.service';
import { Genero } from '../models/genero.interface';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.page.html',
  styleUrls: ['./generos.page.scss'],
})
export class GenerosPage implements OnInit {

  generos: Genero[];

  constructor(
    private alertController: AlertController,
    private generoService: GeneroService,
    private loadingController: LoadingController 
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    const loading = await this.loadingController.create({
      message: 'Carregando gênero...'
    });
    loading.present();
    this.generoService.getGeneros().subscribe((data) => {
      this.generos = data;
      loading.dismiss();
    });
  }
}
