import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { fadeSlideIn } from '../shared/animaciones';
import { createAnimation } from '@ionic/angular';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
  animations: [fadeSlideIn],
})
export class PerfilPage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  educacion: string = '';
  fechaNacimiento: string = '';
  animarNombre: boolean = false;
  animarApellido: boolean = false;

  constructor(private alertController: AlertController) {}

animarBoton() {
  const btn = document.querySelector('#btnGuardar');
  if (!btn) return; 

  const animation = createAnimation()
    .addElement(btn)
    .duration(500)
    .iterations(1)
    .keyframes([
      { offset: 0, transform: 'scale(1)', opacity: '1' },
      { offset: 0.5, transform: 'scale(1.1)', opacity: '0.8' },
      { offset: 1, transform: 'scale(1)', opacity: '1' }
    ]);

  animation.play();
}

  ngOnInit() {
    // Recuperar datos si existen en localStorage
    const datosGuardados = localStorage.getItem('perfilDatos');
    if (datosGuardados) {
      const datos = JSON.parse(datosGuardados);
      this.nombre = datos.nombre || '';
      this.apellido = datos.apellido || '';
      this.educacion = datos.educacion || '';
      this.fechaNacimiento = datos.fechaNacimiento || '';
    }
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

async guardarDatos() {
    const datos = {
      nombre: this.nombre,
      apellido: this.apellido,
      educacion: this.educacion,
      fechaNacimiento: this.fechaNacimiento
    };
    localStorage.setItem('perfilDatos', JSON.stringify(datos));

    const alert = await this.alertController.create({
      header: 'Datos Ingresados',
      message: `Nombre: ${this.nombre}<br>Apellido: ${this.apellido}<br>Educación: ${this.educacion}<br>Fecha Nacimiento: ${this.fechaNacimiento}`,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}