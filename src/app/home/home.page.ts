import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { fadeSlideIn } from '../shared/animaciones';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../services/api.service';

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
  usuariosAPI: any[] = [];  // Lista de usuarios desde la API

  private _storage: Storage | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private storage: Storage,
    private apiService: ApiService // Servicio API
  ) {}

  async ngOnInit() {
    await this.initStorage();

    this.route.queryParams.subscribe(async params => {
      if (params['usuario']) {
        this.nombreUsuario = params['usuario'];
        await this._storage?.set('usuario', this.nombreUsuario);
      } else {
        const guardado = await this._storage?.get('usuario');
        this.nombreUsuario = guardado ?? '';
      }
    });

    // Consumir usuarios desde API externa
    this.apiService.getUsuarios().subscribe({
      next: (data) => {
        this.usuariosAPI = data;
      },
      error: (error) => {
        console.error('Error al obtener usuarios desde API:', error);
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

  async cerrarSesion() {
    await this._storage?.remove('usuario');
    localStorage.removeItem('usuario');   
    this.router.navigate(['/login']);
  }
}
