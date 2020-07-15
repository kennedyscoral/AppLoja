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

  private async venderEstoque(roupa: Roupa) {
    if (roupa.estoque == 0){
      const alerta = await this.alertController.create({
        header: 'Aviso',
        message: `A roupa ${roupa.nome} não possui quantidade no local "Estoque".`,
        buttons: [
          {
            text: 'Ok'            
          }
        ]
      });
      alerta.present();
    } else {
      const loading = await this.busyLoader.create('Baixando estoque...');
      roupa.estoque = roupa.estoque - 1;      
      if (roupa.estoque <= roupa.estoque_minimo && roupa.estoque != 0) {
        const alerta = await this.alertController.create({
          header: 'Aviso',
          message: `A roupa ${roupa.nome} está com quantidade abaixo ou igual ao estoque mínimo do local "Estoque".`,
          buttons: [
            {
              text: 'Ok'            
            }
          ]
        });
        alerta.present();
      }
      
      this.roupaService
        .salvar(roupa)
        .subscribe(() => {
          loading.dismiss();
        });

      roupa.qt_venda = roupa.qt_venda + 1;
      if(roupa.qt_venda == roupa.qt_venda_desconto){
        const alerta = await this.alertController.create({
          header: 'Aplicação de desconto',
          message: `A roupa ${roupa.nome} alcançou o número de vendas para aplicação de 10% de desconto, deseja aplicar?`,
          buttons: [
            {
              text: 'Sim',
              handler: () => this.aplicarDesconto(roupa)
            },
            {
              text: 'Não',              
            }
          ]
        });
        alerta.present();    
      }  
    }    
  }
  private async venderReservado(roupa: Roupa) {
    if (roupa.reservado == 0){
      const alerta = await this.alertController.create({
        header: 'Aviso',
        message: `A roupa ${roupa.nome} não possui quantidade no local "Reservado".`,
        buttons: [
          {
            text: 'Ok'            
          }
        ]
      });
      alerta.present();
    } else {
      const loading = await this.busyLoader.create('Baixando estoque...');
      roupa.reservado = roupa.reservado - 1;
      if (roupa.estoque <= roupa.estoque_minimo && roupa.estoque != 0) {
        const alerta = await this.alertController.create({
          header: 'Aviso',
          message: `A roupa ${roupa.nome} está com quantidade abaixo ou igual ao estoque mínimo do local "Estoque".`,
          buttons: [
            {
              text: 'Ok'            
            }
          ]
        });
        alerta.present();
      }      
      this.roupaService
        .salvar(roupa)
        .subscribe(() => {
          loading.dismiss();
        });
      
      roupa.qt_venda = roupa.qt_venda + 1;
      if(roupa.qt_venda == roupa.qt_venda_desconto){
        const alerta = await this.alertController.create({
          header: 'Aplicação de desconto',
          message: `A roupa ${roupa.nome} alcançou o número de vendas para aplicação de 10% de desconto, deseja aplicar?`,
          buttons: [
            {
              text: 'Sim',
              handler: () => this.aplicarDesconto(roupa)
            },
            {
              text: 'Não',              
            }
          ]
        });
        alerta.present();    
      }  
    }
  }

  private async aplicarDesconto(roupa: Roupa){
    roupa.preco = roupa.preco - (roupa.preco * 0.1);
  }

  private async reservar(roupa: Roupa) {    
    if (roupa.estoque == 0 || roupa.estoque < roupa.estoque_minimo){
      const alerta = await this.alertController.create({
        header: 'Aviso',
        message: `Não é possível reservar a roupa ${roupa.nome} porque o local "Estoque" não possui quantidade ou esta abaixo do estoque mínimo.`,
        buttons: [
          {
            text: 'Ok'            
          }
        ]
      });
      alerta.present();
    } else {
    const loading = await this.busyLoader.create('Reservando estoque...');

    roupa.estoque = roupa.estoque - 1;
    roupa.reservado = roupa.reservado + 1;

    this.roupaService
      .salvar(roupa)
      .subscribe(() => {
        loading.dismiss();
      });
    }
  }
  async confirmacaoVenda(roupa: Roupa) {
    const alerta = await this.alertController.create({
      header: 'Confirmação de venda',
      message: `Deseja vender a roupa ${roupa.nome} de qual local?`,
      buttons: [
        {
          text: 'Estoque',
          handler: () => this.venderEstoque(roupa)
        },
        {
          text: 'Reservado',
          handler: () => this.venderReservado(roupa)
        }
      ]
    });
    alerta.present();       
  }

}
