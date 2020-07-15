import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { CorService } from '../services/cor.service';
import { Cor } from '../models/cor.interface';

@Component({
  selector: 'app-cores',
  templateUrl: './cores.page.html',
  styleUrls: ['./cores.page.scss'],
})
export class CoresPage implements OnInit {

  cores: Cor[];

  constructor(
    private alertController: AlertController,
    private corService: CorService,
    private loadingController: LoadingController 
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    const loading = await this.loadingController.create({
      message: 'Carregando cores...'
    });
    loading.present();
    this.corService.getCores().subscribe((data) => {
      this.cores = data;
      loading.dismiss();
    });
  }
}
