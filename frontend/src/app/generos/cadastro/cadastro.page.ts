import { Component, OnInit } from '@angular/core';
import { GeneroService } from 'src/app/services/genero.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Genero } from 'src/app/models/genero.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  genero: Genero;
  disabled: Boolean;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private generoService : GeneroService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController : LoadingController
  ) { 
    this.genero = { nome: '' };
  }

  async ngOnInit() {
    this.disabled = true;
    const id = this.activatedRoute.snapshot.params['id'];
    if(id) {
      this.disabled = false;
      const loading = await this.loadingController.create({message: 'Carregando...'});
      loading.present();
      this.generoService.getGenero(id).subscribe((genero) => {
        this.genero = genero;
        loading.dismiss();
      });
    } 
  }

  async salvar() {
    let loading = await this.loadingController.create({message: 'Salvando...'});
    loading.present();

    this.generoService
      .salvar(this.genero)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/generos']);
      });
  }

  async confirmarExclusao(genero: Genero) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o genero ${genero.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(genero);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(genero: Genero) {
    const busyLoader = await this.loadingController.create({ message: 'Excluindo...' });
    busyLoader.present();
    this.generoService.excluir(genero).subscribe(() => {
      busyLoader.dismiss();
      this.navCtrl.navigateBack('/generos');
    });
  }
}