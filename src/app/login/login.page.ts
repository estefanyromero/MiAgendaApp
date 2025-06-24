import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { slideInLeft } from '../shared/animaciones';
import { DatabaseService } from '../services/database.service';

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

  constructor(
    private router: Router,
    private alertController: AlertController,
    private dbService: DatabaseService
  ) { }

  async ingresar() {
    const usuarioValido = /^[a-zA-Z0-9]{3,8}$/.test(this.usuario);
    const claveValida = /^[0-9]{4}$/.test(this.clave);

    if (usuarioValido && claveValida) {
      const user = await this.dbService.obtenerUsuario(this.usuario, this.clave);

      if (user) {
        localStorage.setItem('usuario', this.usuario); // Guarda el usuario
        this.router.navigate(['/home'], {
          queryParams: { usuario: this.usuario }
        });
      } else {
        this.mostrarAlerta('Usuario o clave incorrectos.');
      }
    } else {
      this.mostrarAlerta('Debes ingresar un usuario (3-8 letras o números) y una clave numérica de 4 dígitos.');
    }
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error de ingreso',
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}
