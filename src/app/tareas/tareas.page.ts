import { Component } from '@angular/core';
import { fadeSlideIn } from '../shared/animaciones';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
  standalone: false,
  animations: [fadeSlideIn],
})
export class TareasPage {

  nuevaTarea: string = '';
  listaTareas: string[] = [];

  agregarTarea() {
    if (this.nuevaTarea.trim() !== '') {
      this.listaTareas.push(this.nuevaTarea.trim());
      this.nuevaTarea = '';
    }
  }

  eliminarTarea(index: number) {
    this.listaTareas.splice(index, 1);
  }
}
