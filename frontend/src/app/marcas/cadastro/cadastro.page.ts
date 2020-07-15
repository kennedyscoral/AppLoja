import { Component, OnInit } from '@angular/core';
import { MarcaService } from 'src/app/services/marca.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute} from '@angular/router';
import { Marca } from 'src/app/models/marca.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  marca: Marca;  
  disabled: Boolean;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private marcaService : MarcaService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController : LoadingController    
  ) { 
    this.marca = { nome: '' };        
  }

  async ngOnInit() {
    this.disabled = true;
    const id = this.activatedRoute.snapshot.params['id'];
    if(id) {
      this.disabled = false;
      const loading = await this.loadingController.create({message: 'Carregando...'});
      loading.present();      
      this.marcaService.getMarca(id).subscribe((marca) => {
        this.marca = marca;
        loading.dismiss();
      });
    } 
  }

  async salvar() {
    let loading = await this.loadingController.create({message: 'Salvando...'});
    loading.present();

    this.marcaService
      .salvar(this.marca)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/marcas']);
      });
  }
  
  async confirmarExclusao(marca: Marca) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir a marca ${marca.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(marca);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(marca: Marca) {
    const busyLoader = await this.loadingController.create({ message: 'Excluindo...' });
    busyLoader.present();    
    this.marcaService.excluir(marca).subscribe(() => {
      busyLoader.dismiss();
      this.navCtrl.navigateBack('/marcas');
    });
  }
}