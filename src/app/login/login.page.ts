import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  usuario: string = '';
  clave: string = '';
  constructor(private router: Router) { }

  ingresar() {
    const usuarioValido = /^[a-zA-Z0-9]{3,8}$/.test(this.usuario);
    const claveValida = /^[0-9]{4}$/.test(this.clave);
    if (usuarioValido && claveValida) {
      this.router.navigate(['/home'], {
        queryParams: { usuario: this.usuario }
      });
    } else {
      alert("Debes ingresar un usuario (3-8 letras o números) y una clave numérica de 4 dígitos.");
    }
  }
}
