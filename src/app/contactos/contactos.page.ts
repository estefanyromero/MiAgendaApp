import { Component } from '@angular/core';
import { fadeSlideIn } from '../shared/animaciones';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
  standalone: false,
  animations: [fadeSlideIn],
})
export class ContactosPage {

  contactos = [
    {
      nombre: 'Belén Romero',
      telefono: '+56 9 1234 5678',
      correo: 'belen@example.com'
    },
    {
      nombre: 'Carlos López',
      telefono: '+56 9 8765 4321',
      correo: 'carlos@example.com'
    },
    {
      nombre: 'Ana Torres',
      telefono: '+56 9 2468 1357',
      correo: 'ana@example.com'
    }
  ];

}
