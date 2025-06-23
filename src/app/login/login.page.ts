import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { slideInLeft } from '../shared/animaciones';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
  animations: [slideInLeft],
})
export class LoginPage {
  usuario: string = '';
  clave: string = '';
  private _storage: Storage | null = null;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private storage: Storage
  ) {
    this.init();
  }

  // Inicializa el storage
  async init() {
    this._storage = await this.storage.create();
  }

  async ingresar() {
    const usuarioValido = /^[a-zA-Z0-9]{3,8}$/.test(this.usuario);
    const claveValida = /^[0-9]{4}$/.test(this.clave);

    if (usuarioValido && claveValida) {
      // Guardar el usuario en storage
      await this._storage?.set('usuario', this.usuario);

      // Redirigir al home
      this.router.navigate(['/home']);
    } else {
      this.mostrarAlerta();
    }
  }

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Error de ingreso',
      message:
        'Debes ingresar un usuario (3-8 letras o números) y una clave numérica de 4 dígitos.',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
}
