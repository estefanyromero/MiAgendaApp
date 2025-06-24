import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  standalone: false,
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  usuario: string = '';
  clave: string = '';

  constructor(
    private dbService: DatabaseService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async registrar() {
    const usuarioValido = /^[a-zA-Z0-9]{3,8}$/.test(this.usuario);
    const claveValida = /^[0-9]{4}$/.test(this.clave);

    if (!usuarioValido || !claveValida) {
      this.mostrarAlerta(
        'Usuario y clave no válidos. El usuario debe tener entre 3 y 8 caracteres alfanuméricos, y la clave 4 números.',
        false,
        'danger'
      );
      return;
    }

    const usuarioExistente = await this.dbService.obtenerUsuarioPorNombre(this.usuario);

    if (usuarioExistente) {
      this.mostrarAlerta('El usuario ya está registrado. Intenta con otro nombre.', false, 'danger');
    } else {
      await this.dbService.agregarUsuario(this.usuario, this.clave);
      this.usuario = '';
      this.clave = '';
      this.mostrarAlerta('Registro exitoso. Ahora puedes iniciar sesión.', true, 'success');
    }
  }

  async mostrarAlerta(
    mensaje: string,
    irAlLogin: boolean = false,
    color: 'success' | 'danger' = 'danger'
  ) {
    const alert = await this.alertController.create({
      header: color === 'success' ? '¡Registro exitoso!' : 'Registro fallido',
      message: mensaje,
      cssClass: `alert-${color}`,
      buttons: ['Aceptar'],
    });
    await alert.present();

    if (irAlLogin) {
      this.router.navigate(['/login']);
    }
  }
}
