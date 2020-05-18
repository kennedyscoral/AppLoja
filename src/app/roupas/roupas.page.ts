import { Component, OnInit } from '@angular/core';
import { RoupaService } from '../services/roupa.service';
import { Roupa } from '../models/roupa.interface';
import { LoadingController, AlertController } from '@ionic/angular';
import { BusyLoaderService } from '../services/busy-loader.service';

@Component({
  selector: 'app-roupas',
  templateUrl: './roupas.page.html',
  styleUrls: ['./roupas.page.scss'],
})
export class RoupasPage implements OnInit {

  roupas: Roupa[];

  constructor(
    private roupaService: RoupaService,
    private busyLoader: BusyLoaderService,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    const busyLoader = await this.busyLoader.create('Carregando roupas...');
    
    this.roupas = await this.roupaService.getRoupas().toPromise();
    busyLoader.dismiss();
  }

  async confirmacaoExclusao(roupa: Roupa) {
    const alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir a roupa ${roupa.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(roupa)
        },
        {
          text: 'Não'
        }
      ]
    });
    alerta.present();       
  }

  private async excluir(roupa: Roupa) {
    const busyLoader = await this.busyLoader.create('Excluindo ...');
    this.roupaService.excluir(roupa).subscribe(() => {
      this.listar()
      busyLoader.dismiss();
    });
  }

}
