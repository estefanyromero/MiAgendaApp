import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FormExperienciaComponent } from './form-experiencia/form-experiencia.component';

@NgModule({
  declarations: [FormExperienciaComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [FormExperienciaComponent]
})
export class ComponentsModule {}
