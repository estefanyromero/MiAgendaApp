import { Component, OnInit, OnDestroy } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  standalone: false,
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, OnDestroy {
  latitud: number = 0;
  longitud: number = 0;
  urlMapa!: SafeResourceUrl;
  watchId: string | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  async ngOnInit() {
    await this.actualizarUbicacion();

    // Seguimiento en tiempo real (opcional)
    this.watchId = await Geolocation.watchPosition({}, (pos, err) => {
      if (pos) {
        this.latitud = pos.coords.latitude;
        this.longitud = pos.coords.longitude;
        this.urlMapa = this.getSafeUrl(this.latitud, this.longitud);
      }
    });
  }

  async ngOnDestroy() {
    if (this.watchId) {
      await Geolocation.clearWatch({ id: this.watchId });
    }
  }

  getSafeUrl(lat: number, lon: number): SafeResourceUrl {
    const rawUrl = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  }

  async actualizarUbicacion() {
    try {
      const position: Position = await Geolocation.getCurrentPosition();
      this.latitud = position.coords.latitude;
      this.longitud = position.coords.longitude;
      this.urlMapa = this.getSafeUrl(this.latitud, this.longitud);
    } catch (error) {
      console.error('No se pudo obtener la ubicación:', error);
    }
  }
}
