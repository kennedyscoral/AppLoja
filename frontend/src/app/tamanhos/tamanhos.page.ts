import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { TamanhoService } from '../services/tamanho.service';
import { Tamanho } from '../models/tamanho.interface';

@Component({
  selector: 'app-tamanhos',
  templateUrl: './tamanhos.page.html',
  styleUrls: ['./tamanhos.page.scss'],
})
export class TamanhosPage implements OnInit {

  tamanhos: Tamanho[];

  constructor(
    private alertController: AlertController,
    private tamanhoService: TamanhoService,
    private loadingController: LoadingController 
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    const loading = await this.loadingController.create({
      message: 'Carregando tamanhos...'
    });
    loading.present();
    this.tamanhoService.getTamanhos().subscribe((data) => {
      this.tamanhos = data;
      loading.dismiss();
    });
  }
}
