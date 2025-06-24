import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form-experiencia',
  templateUrl: './form-experiencia.component.html',
  standalone: false,
  styleUrls: ['./form-experiencia.component.scss']
})
export class FormExperienciaComponent {
  nombre: string = '';
  descripcion: string = '';

  @Output() experienciaRegistrada = new EventEmitter<any>();

  registrar() {
    if (this.nombre && this.descripcion) {
      const fechaActual = new Date().toISOString().slice(0, 10); // formato YYYY-MM-DD

      this.experienciaRegistrada.emit({
        nombre: this.nombre,
        descripcion: this.descripcion,
        fecha: fechaActual
      });

      this.nombre = '';
      this.descripcion = '';
    }
  }
}
