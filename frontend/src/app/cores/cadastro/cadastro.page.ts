import { Component, OnInit } from '@angular/core';
import { CorService } from 'src/app/services/cor.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Cor } from 'src/app/models/cor.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  cor: Cor;
  disabled: Boolean;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private corService : CorService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController : LoadingController
  ) { 
    this.cor = { nome: '' };
  }

  async ngOnInit() {
    this.disabled = true;
    const id = this.activatedRoute.snapshot.params['id'];      
    if(id) {
    this.disabled = false;
    const loading = await this.loadingController.create({message: 'Carregando...'});
      loading.present();
      this.corService.getCor(id).subscribe((cor) => {
        this.cor = cor;
        loading.dismiss();
      });
    } 
  }

  async salvar() {
    let loading = await this.loadingController.create({message: 'Salvando...'});
    loading.present();

    this.corService
      .salvar(this.cor)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/cores']);
      });
  }

  async confirmarExclusao(cor: Cor) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir a cor ${cor.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(cor);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(cor: Cor) {
    const busyLoader = await this.loadingController.create({ message: 'Excluindo...' });
    busyLoader.present();
    this.corService.excluir(cor).subscribe(() => {
      busyLoader.dismiss();
      this.navCtrl.navigateBack('/cores');
    });
  }
}