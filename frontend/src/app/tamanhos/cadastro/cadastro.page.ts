import { Component, OnInit } from '@angular/core';
import { TamanhoService } from 'src/app/services/tamanho.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Tamanho } from 'src/app/models/tamanho.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  tamanho: Tamanho;
  disabled: Boolean;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private tamanhoService : TamanhoService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController : LoadingController
  ) { 
    this.tamanho = { nome: '' };
  }

  async ngOnInit() {
    this.disabled = true;
    const id = this.activatedRoute.snapshot.params['id'];
    if(id) {
      this.disabled = false;
      const loading = await this.loadingController.create({message: 'Carregando...'});
      loading.present();
      this.tamanhoService.gettamanho(id).subscribe((tamanho) => {
        this.tamanho = tamanho;
        loading.dismiss();
      });
    } 
  }

  async salvar() {
    let loading = await this.loadingController.create({message: 'Salvando...'});
    loading.present();

    this.tamanhoService
      .salvar(this.tamanho)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/tamanhos']);
      });
  }

  async confirmarExclusao(tamanho: Tamanho) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir a tamanho ${tamanho.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(tamanho);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(tamanho: Tamanho) {
    const busyLoader = await this.loadingController.create({ message: 'Excluindo...' });
    busyLoader.present();
    this.tamanhoService.excluir(tamanho).subscribe(() => {
      busyLoader.dismiss();
      this.navCtrl.navigateBack('/tamanhos');
    });
  }
}