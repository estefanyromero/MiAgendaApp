import { Component, OnInit } from '@angular/core';
import { fadeSlideIn } from '../shared/animaciones';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
  standalone: false,
  animations: [fadeSlideIn],
})
export class TareasPage implements OnInit {

  nuevaTarea: string = '';
  nuevaCategoria: string = '';
  listaTareas: { texto: string; fecha: string; categoria: string }[] = [];

  ngOnInit() {
    const tareasGuardadas = localStorage.getItem('misTareas');
    if (tareasGuardadas) {
      this.listaTareas = JSON.parse(tareasGuardadas);
    }
  }

  agregarTarea() {
    if (this.nuevaTarea.trim() && this.nuevaCategoria) {
      this.listaTareas.push({
        texto: this.nuevaTarea.trim(),
        fecha: new Date().toLocaleDateString(),
        categoria: this.nuevaCategoria
      });
      this.nuevaTarea = '';
      this.nuevaCategoria = '';
      this.guardarEnLocalStorage();
    }
  }

  eliminarTarea(index: number) {
    this.listaTareas.splice(index, 1);
    this.guardarEnLocalStorage();
  }

  guardarEnLocalStorage() {
    localStorage.setItem('misTareas', JSON.stringify(this.listaTareas));
  }

  getIconoCategoria(categoria: string): string {
    switch (categoria) {
      case 'estudio': return '📚';
      case 'trabajo': return '💼';
      case 'personal': return '🏠';
      case 'compras': return '🛍️';
      default: return '📝';
    }
  }
}
