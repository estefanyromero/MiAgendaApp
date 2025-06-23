import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { fadeSlideIn } from '../shared/animaciones';
import { Storage } from '@ionic/storage-angular'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
  animations: [fadeSlideIn],
})
export class HomePage implements OnInit {

  nombreUsuario: string = '';
  nombre: string = '';
  apellido: string = '';
  educacion: string = '';
  fechaNacimiento: string = '';
  animarNombre: boolean = false;
  animarApellido: boolean = false;
  private _storage: Storage | null = null;

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private storage: Storage // ⬅️ nuevo
  ) {}

  async ngOnInit() {
    await this.initStorage();

    // Ver si viene desde login
    this.route.queryParams.subscribe(async params => {
      if (params['usuario']) {
        this.nombreUsuario = params['usuario'];
        await this._storage?.set('usuario', this.nombreUsuario); // guarda
      } else {
        const guardado = await this._storage?.get('usuario');
        this.nombreUsuario = guardado ?? '';
      }
    });
  }

  async initStorage() {
    this._storage = await this.storage.create();
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellido = '';
    this.educacion = '';
    this.fechaNacimiento = '';
    this.animarNombre = true;
    this.animarApellido = true;

    setTimeout(() => {
      this.animarNombre = false;
      this.animarApellido = false;
    }, 500);
  }

  async mostrarDatos() {
    const alert = await this.alertController.create({
      header: 'Datos Ingresados',
      message: `Nombre: ${this.nombre}<br>Apellido: ${this.apellido}`,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
