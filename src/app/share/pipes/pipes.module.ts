import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombreCompletoPipe } from './nombre-completo.pipe';
import { ControlErrorPipe } from './control-error.pipe';

@NgModule({
  declarations: [NombreCompletoPipe, ControlErrorPipe],
  imports: [CommonModule],
  exports: [NombreCompletoPipe, ControlErrorPipe],
})
export class PipesModule {}
